'use server';

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

function getTransport() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        throw new Error('SMTP configuration is missing (SMTP_HOST/SMTP_USER/SMTP_PASS)');
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

export async function sendVendorEmailOtp(email: string, excludeVendorId?: string) {
    const cookieStore = await cookies();

    if (!email || !email.includes('@')) {
        return { error: 'Please enter a valid email address.' };
    }

    // Block OTP if email is already registered as a vendor
    try {
        let query = supabase
            .from('vendors')
            .select('id')
            .eq('email', email);

        if (excludeVendorId) {
            query = query.neq('id', excludeVendorId);
        }

        const { data: existing } = await query.limit(1);

        if (existing && existing.length > 0) {
            return { error: 'This email is already registered. Please use a different email.' };
        }
    } catch (err) {
        console.error('Failed to check existing vendor email before OTP:', err);
        // Continue to avoid hard blocking OTP on transient DB errors
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    try {
        const transporter = getTransport();
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: 'ScanMart Vendor Email Verification OTP',
            text: `Your ScanMart vendor verification code is: ${otp}\n\nThis code is valid for 10 minutes.`,
            html: `<p>Your ScanMart vendor verification code is:</p><p style="font-size:24px;font-weight:bold;">${otp}</p><p>This code is valid for 10 minutes.</p>`,
        });

        cookieStore.set('vendor_email_otp', JSON.stringify({ email, otp, expiresAt }), {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 10 * 60,
        });

        // Clear any previous verified flag
        cookieStore.set('vendor_email_verified', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });

        return { success: true };
    } catch (err: any) {
        console.error('Failed to send OTP email:', err);
        return { error: 'Failed to send verification email. Please try again.' };
    }
}

export async function verifyVendorEmailOtp(email: string, otp: string) {
    const cookieStore = await cookies();
    const raw = cookieStore.get('vendor_email_otp')?.value;

    if (!raw) {
        return { error: 'OTP has expired or was not requested.' };
    }

    try {
        const parsed = JSON.parse(raw) as { email: string; otp: string; expiresAt: number };
        if (parsed.email !== email) {
            return { error: 'Email does not match the OTP request.' };
        }
        if (Date.now() > parsed.expiresAt) {
            return { error: 'OTP has expired. Please request a new one.' };
        }
        if (parsed.otp !== otp) {
            return { error: 'Incorrect OTP. Please try again.' };
        }

        cookieStore.set('vendor_email_verified', JSON.stringify({ email, verifiedAt: Date.now() }), {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60, // 1 hour
        });

        // Clear otp cookie after successful verification
        cookieStore.set('vendor_email_otp', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });

        return { success: true };
    } catch {
        return { error: 'OTP verification failed. Please request a new code.' };
    }
}

export async function registerVendor(formData: any) {
    try {
        // 0. Ensure email has been OTP-verified
        const cookieStore = await cookies();
        const verifiedRaw = cookieStore.get('vendor_email_verified')?.value;
        const verified = verifiedRaw ? JSON.parse(verifiedRaw) as { email: string; verifiedAt: number } : null;

        if (!verified || verified.email !== formData.email) {
            return { errors: { emailOtp: 'Please verify your email with OTP before applying.' } };
        }

        // 1. Basic validation
        // 2. Check for existing duplicates
        const { data: existingVendor, error: checkError } = await supabase
            .from('vendors')
            .select('username, email, phone_number')
            .or(`username.eq.${formData.username},email.eq.${formData.email},phone_number.eq.${formData.phone_number}`);

        if (existingVendor && existingVendor.length > 0) {
            const errors: Record<string, string> = {};
            existingVendor.forEach(v => {
                if (v.username === formData.username) errors.username = 'Username is already taken';
                if (v.email === formData.email) errors.email = 'Email is already registered';
                if (v.phone_number === formData.phone_number) errors.phone_number = 'Phone number is already in use';
            });
            return { errors };
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(formData.password, salt);

        // 4. Insert into Supabase
        const { error } = await supabase
            .from('vendors')
            .insert([{
                username: formData.username,
                store_name: formData.store_name,
                email: formData.email,
                password_hash: password_hash,
                phone_number: formData.phone_number,
                gst_number: formData.gst_number || null,
                store_address: formData.store_address,
                state: formData.state,
                district: formData.district,
                pincode: formData.pincode,
                is_approved: false, // Default
                status: 'Pending'
            }]);

        if (error) return { error: error.message };

        return { success: true };
    } catch (err) {
        return { error: 'Internal server error' };
    }
}

export async function checkVendorStatus(email: string, password?: string) {
    const { data, error } = await supabase
        .from('vendors')
        .select('id, username, store_name, is_approved, status, password_hash')
        .eq('email', email)
        .single();

    if (error || !data) return { error: 'Vendor not found' };

    // If password is provided, verify it
    if (password) {
        const isValid = await bcrypt.compare(password, data.password_hash);
        if (!isValid) return { error: 'Invalid password' };
    }

    if (data.status === 'Blocked') {
        return { error: 'Your account has been blocked by an administrator.' };
    }

    if (!data.is_approved) {
        return { error: 'Your application is still pending admin approval.' };
    }

    return {
        data: {
            id: data.id,
            username: data.username,
            store_name: data.store_name,
            email: email,
            is_approved: data.is_approved,
            status: data.status
        }
    };
}

export async function sendVendorPasswordResetOtp(email: string) {
    const cookieStore = await cookies();

    if (!email || !email.includes('@')) {
        return { error: 'Please enter a valid email address.' };
    }

    // Only allow reset for existing vendors
    const { data: vendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('email', email)
        .limit(1);

    if (!vendor || vendor.length === 0) {
        return { error: 'No vendor account found with this email.' };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    try {
        const transporter = getTransport();
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: email,
            subject: 'ScanMart Vendor Password Reset OTP',
            text: `Your ScanMart password reset code is: ${otp}\n\nThis code is valid for 10 minutes.`,
            html: `<p>Your ScanMart password reset code is:</p><p style="font-size:24px;font-weight:bold;">${otp}</p><p>This code is valid for 10 minutes.</p>`,
        });

        cookieStore.set('vendor_reset_otp', JSON.stringify({ email, otp, expiresAt }), {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 10 * 60,
        });

        // Clear any previous reset-allowed flag
        cookieStore.set('vendor_reset_allowed', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });

        return { success: true };
    } catch (err) {
        console.error('Failed to send password reset OTP:', err);
        return { error: 'Failed to send OTP. Please try again.' };
    }
}

export async function verifyVendorPasswordResetOtp(email: string, otp: string) {
    const cookieStore = await cookies();
    const raw = cookieStore.get('vendor_reset_otp')?.value;

    if (!raw) {
        return { error: 'OTP has expired or was not requested.' };
    }

    try {
        const parsed = JSON.parse(raw) as { email: string; otp: string; expiresAt: number };
        if (parsed.email !== email) {
            return { error: 'Email does not match the OTP request.' };
        }
        if (Date.now() > parsed.expiresAt) {
            return { error: 'OTP has expired. Please request a new one.' };
        }
        if (parsed.otp !== otp) {
            return { error: 'Incorrect OTP. Please try again.' };
        }

        cookieStore.set('vendor_reset_allowed', JSON.stringify({ email, verifiedAt: Date.now() }), {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 15 * 60, // 15 minutes to reset password
        });

        // Clear otp cookie after successful verification
        cookieStore.set('vendor_reset_otp', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });

        return { success: true };
    } catch {
        return { error: 'OTP verification failed. Please request a new code.' };
    }
}

export async function resetVendorPassword(email: string, newPassword: string) {
    const cookieStore = await cookies();
    const raw = cookieStore.get('vendor_reset_allowed')?.value;

    if (!raw) {
        return { error: 'Password reset session has expired. Please verify OTP again.' };
    }

    let payload: { email: string; verifiedAt: number };
    try {
        payload = JSON.parse(raw);
    } catch {
        return { error: 'Invalid reset session. Please restart the reset process.' };
    }

    if (payload.email !== email) {
        return { error: 'Email does not match the verified reset session.' };
    }

    if (!newPassword || newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters long.' };
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        const { error } = await supabase
            .from('vendors')
            .update({ password_hash })
            .eq('email', email);

        if (error) {
            console.error('Failed to update vendor password:', error);
            return { error: 'Failed to update password. Please try again.' };
        }

        // Clear reset session after success
        cookieStore.set('vendor_reset_allowed', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });

        return { success: true };
    } catch (err) {
        console.error('Error resetting vendor password:', err);
        return { error: 'Internal server error while updating password.' };
    }
}

export async function getVendorInfo() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('vendor_session')?.value;
        if (!session) return { error: 'No session found' };

        const sessionData = JSON.parse(session);
        const { data, error } = await supabase
            .from('vendors')
            .select('*')
            .eq('id', sessionData.id)
            .single();

        if (error || !data) return { error: 'Vendor not found' };

        // Don't return password hash
        const { password_hash, ...vendorData } = data;
        return { data: vendorData };
    } catch (err) {
        return { error: 'Session error' };
    }
}

export async function updateVendor(vendorId: string, updateData: any) {
    try {
        const cookieStore = await cookies();

        // 0. If email is being changed, ensure it was verified via OTP
        if (updateData.email) {
            const { data: currentVendor } = await supabase
                .from('vendors')
                .select('email')
                .eq('id', vendorId)
                .single();

            const currentEmail = currentVendor?.email as string | undefined;

            if (!currentEmail || updateData.email !== currentEmail) {
                const verifiedRaw = cookieStore.get('vendor_email_verified')?.value;
                const verified = verifiedRaw ? JSON.parse(verifiedRaw) as { email: string; verifiedAt: number } : null;

                if (!verified || verified.email !== updateData.email) {
                    return { errors: { email: 'Please verify your new email with OTP before saving.' } };
                }
            }
        }

        // 1. Check for duplicates (excluding current vendor)
        if (updateData.username || updateData.email || updateData.phone_number) {
            let filter = [];
            if (updateData.username) filter.push(`username.eq.${updateData.username}`);
            if (updateData.email) filter.push(`email.eq.${updateData.email}`);
            if (updateData.phone_number) filter.push(`phone_number.eq.${updateData.phone_number}`);

            const { data: existing, error: checkError } = await supabase
                .from('vendors')
                .select('id, username, email, phone_number')
                .or(filter.join(','))
                .neq('id', vendorId);

            if (existing && existing.length > 0) {
                const errors: Record<string, string> = {};
                existing.forEach(v => {
                    if (v.username === updateData.username) errors.username = 'Username already taken';
                    if (v.email === updateData.email) errors.email = 'Email already in use';
                    if (v.phone_number === updateData.phone_number) errors.phone_number = 'Phone number already in use';
                });
                return { errors };
            }
        }

        const { error } = await supabase
            .from('vendors')
            .update(updateData)
            .eq('id', vendorId);

        if (error) throw error;

        // If username was updated, we MUST refresh the session cookie
        // because the product APIs rely on the username in the session.
        if (updateData.username) {
            const { data: freshVendor, error: fetchError } = await supabase
                .from('vendors')
                .select('id, username, store_name, email, is_approved, status')
                .eq('id', vendorId)
                .single();

            if (!fetchError && freshVendor) {
                const { setVendorSession } = await import('./auth');
                await setVendorSession(freshVendor);
            }
        }

        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function getVendorNotifications() {
    try {
        const info = await getVendorInfo();
        if (info.error || !info.data) return { error: 'Not authenticated' };

        const { data, error } = await supabase
            .from('vendor_notifications')
            .select('*')
            .or(`vendor_id.eq.${info.data.id},vendor_id.is.null`)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function markNotificationAsRead(id: string) {
    try {
        const { error } = await supabase
            .from('vendor_notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

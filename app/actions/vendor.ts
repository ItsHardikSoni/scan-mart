'use server';

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function registerVendor(formData: any) {
    try {
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

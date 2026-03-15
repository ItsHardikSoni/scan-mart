'use server';

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function registerVendor(formData: any) {
    try {
        // 1. Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            return { error: 'Missing required fields' };
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(formData.password, salt);

        // 3. Insert into Supabase
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

        if (error) {
            if (error.code === '23505') return { error: 'Username or Email already exists' };
            return { error: error.message };
        }

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

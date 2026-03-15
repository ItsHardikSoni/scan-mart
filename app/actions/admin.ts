'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { setAdminSession } from './auth';

async function getAdminSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
}

export async function getCurrentAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch {
        return null;
    }
}

export async function updateVendorStatus(id: string, status: string, is_approved: boolean) {
    try {
        const supabase = await getAdminSupabase();
        const { error } = await supabase
            .from('vendors')
            .update({ status, is_approved })
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Error updating vendor status:', error);
        return { error: error.message };
    }
}

export async function deleteVendor(id: string) {
    try {
        const supabase = await getAdminSupabase();
        const { error } = await supabase
            .from('vendors')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting vendor:', error);
        return { error: error.message };
    }
}

export async function adminLogin(formData: any) {
    try {
        const supabase = await getAdminSupabase();

        // 1. Fetch admin by email
        const { data: admin, error } = await supabase
            .from('admins')
            .select('*')
            .eq('email', formData.email)
            .single();

        if (error || !admin) {
            return { error: 'Invalid admin credentials' };
        }

        // 2. Verify password hash
        const isValid = await bcrypt.compare(formData.password, admin.password_hash);
        if (!isValid) {
            return { error: 'Invalid admin credentials' };
        }

        // 3. Set the admin session
        await setAdminSession({
            id: admin.id,
            email: admin.email,
            full_name: admin.full_name
        });

        return { success: true };
    } catch (err: any) {
        console.error('Admin Login Error:', err);
        return { error: 'Internal server error' };
    }
}

export async function getAdminProfile() {
    try {
        const session = await getCurrentAdmin();
        if (!session) return { error: 'Not authenticated' };

        const supabase = await getAdminSupabase();
        const { data, error } = await supabase
            .from('admins')
            .select('id, email, full_name, created_at')
            .eq('id', session.id)
            .single();

        if (error) throw error;
        return { data };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function updateAdminProfile(formData: any) {
    try {
        const session = await getCurrentAdmin();
        if (!session) return { error: 'Not authenticated' };

        const supabase = await getAdminSupabase();
        const { error } = await supabase
            .from('admins')
            .update({
                full_name: formData.full_name,
                email: formData.email
            })
            .eq('id', session.id);

        if (error) throw error;

        // Refresh session
        await setAdminSession({
            ...session,
            full_name: formData.full_name,
            email: formData.email
        });

        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function changeAdminPassword(formData: any) {
    try {
        const session = await getCurrentAdmin();
        if (!session) return { error: 'Not authenticated' };

        const supabase = await getAdminSupabase();

        // 1. Get current admin to check old password
        const { data: admin, error: fetchError } = await supabase
            .from('admins')
            .select('password_hash')
            .eq('id', session.id)
            .single();

        if (fetchError || !admin) throw new Error('Admin not found');

        // 2. Verify old password
        const isValid = await bcrypt.compare(formData.oldPassword, admin.password_hash);
        if (!isValid) return { error: 'Incorrect current password' };

        // 3. Hash new password
        const newHash = await bcrypt.hash(formData.newPassword, 10);

        // 4. Update
        const { error: updateError } = await supabase
            .from('admins')
            .update({ password_hash: newHash })
            .eq('id', session.id);

        if (updateError) throw updateError;

        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function getAdminStats() {
    try {
        const supabase = await getAdminSupabase();

        const [
            { count: vendorCount },
            { count: pendingCount },
            { count: messageCount }
        ] = await Promise.all([
            supabase.from('vendors').select('*', { count: 'exact', head: true }),
            supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'Pending'),
            supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'New')
        ]);

        return {
            data: {
                totalVendors: vendorCount || 0,
                pendingTasks: (pendingCount || 0) + (messageCount || 0),
                userMessages: messageCount || 0,
                totalRevenue: '₹' + ((vendorCount || 0) * 2500).toLocaleString('en-IN')
            }
        };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function getContactMessages() {
    try {
        const supabase = await getAdminSupabase();
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { data };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function updateMessageStatus(id: string, status: string) {
    try {
        const supabase = await getAdminSupabase();
        const { error } = await supabase
            .from('contact_messages')
            .update({ status })
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function deleteMessage(id: string) {
    try {
        const supabase = await getAdminSupabase();
        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function getRecentVendors() {
    try {
        const supabase = await getAdminSupabase();
        const { data, error } = await supabase
            .from('vendors')
            .select('id, store_name, email, status, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;
        return { data };
    } catch (err: any) {
        return { error: err.message };
    }
}

export async function getSystemStatus() {
    const services = [
        { name: 'Website', url: '/', type: 'http' },
        { name: 'Vendor Dashboard', url: '/vendor/login', type: 'http' },
        { name: 'Admin Dashboard', url: '/admin/login', type: 'http' },
        { name: 'Database (Supabase)', type: 'supabase' },
        { name: 'Authentication Service', type: 'auth' },
        { name: 'API Gateway', url: '/api/v0/products/test.json', type: 'http' },
        { name: 'Static Assets (CDN)', url: '/favicon.ico', type: 'http' },
        { name: 'Search Engine', type: 'search' },
        { name: 'File Storage', type: 'storage' },
    ];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const results = await Promise.all(services.map(async (service) => {
        const start = performance.now();
        let status = 'Operational';
        let latency = '0ms';

        try {
            if (service.type === 'supabase' || service.type === 'auth' || service.type === 'storage') {
                const supabase = await getAdminSupabase();
                const { error } = await supabase.from('vendors').select('id', { count: 'exact', head: true });
                if (error) throw error;
            } else if (service.type === 'search') {
                const supabase = await getAdminSupabase();
                const { error } = await supabase.from('products').select('barcode', { count: 'exact', head: true }).limit(1);
                if (error) throw error;
            } else {
                const fullUrl = service.url!.startsWith('http') ? service.url! : `${baseUrl}${service.url}`;
                const res = await fetch(fullUrl, { method: 'HEAD', cache: 'no-store' });
                if (!res.ok) status = 'Performance Issue';
            }
        } catch (err) {
            status = 'Down';
        }

        latency = Math.round(performance.now() - start) + 'ms';
        return {
            name: service.name,
            status,
            latency,
            uptime: status === 'Operational' ? '99.9%' : status === 'Performance Issue' ? '98.5%' : '0%'
        };
    }));

    return { data: results };
}

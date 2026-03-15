'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

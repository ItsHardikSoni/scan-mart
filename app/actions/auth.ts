'use server';

import { cookies } from 'next/headers';

export async function setAdminSession(adminData: any) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', JSON.stringify(adminData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });
    return true;
}

export async function clearAdminSession() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    return true;
}

export async function setVendorSession(vendorData: any) {
    const cookieStore = await cookies();
    cookieStore.set('vendor_session', JSON.stringify(vendorData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });
    return true;
}

export async function clearVendorSession() {
    const cookieStore = await cookies();
    cookieStore.delete('vendor_session');
    return true;
}

'use server';

import { cookies } from 'next/headers';

export async function setAdminSession() {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
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

export async function setVendorSession() {
    const cookieStore = await cookies();
    cookieStore.set('vendor_session', 'true', {
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

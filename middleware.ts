import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for mock session cookies
    const isAdminAuthenticated = request.cookies.has('admin_session');
    const isVendorAuthenticated = request.cookies.has('vendor_session');

    // Case 1: If authenticated, prevent access to login pages (Redirect to Dashboards)
    if (pathname === '/admin/login' && isAdminAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (pathname === '/vendor/login' && isVendorAuthenticated) {
        return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
    }

    // Case 2: If NOT authenticated, prevent access to dashboards (Redirect to Logins)
    if (pathname.startsWith('/admin/dashboard') && !isAdminAuthenticated) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (pathname.startsWith('/vendor/dashboard') && !isVendorAuthenticated) {
        return NextResponse.redirect(new URL('/vendor/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

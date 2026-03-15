import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to check for Admin or Vendor session
async function getSession() {
    const cookieStore = await cookies();

    // 1. Try to get Vendor session first to avoid "Admin overflow" for vendors
    const vendorSession = cookieStore.get('vendor_session')?.value;
    if (vendorSession) {
        try {
            const data = JSON.parse(vendorSession);
            if (data && data.username) {
                return {
                    role: 'vendor',
                    id: data.id,
                    username: data.username
                };
            }
        } catch (e) {
            console.error('Failed to parse vendor session:', e);
        }
    }

    // 2. Check Admin
    if (cookieStore.has('admin_session')) {
        return { role: 'admin', id: 'admin_user' };
    }

    return null;
}

// GET /api/v0/products - List all products for the vendor
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Admins see everything from global products? Or maybe just list all? 
    // Usually vendors want to see their own inventory.
    if (session.role === 'vendor') {
        const vendorUsername = (session as any).username;
        console.log('Fetching inventory for vendor:', vendorUsername);

        if (!vendorUsername) {
            console.warn('Listing request rejected: No username in vendor session');
            return NextResponse.json([]); // Return empty list if no username
        }

        const { data, error } = await supabase
            .from('vendor_inventory')
            .select(`
                price,
                stock,
                status,
                barcode,
                products (
                    product_name,
                    brand,
                    quantity,
                    category
                )
            `)
            .eq('vendor_id', vendorUsername);

        if (error) {
            console.error('Inventory Fetch Error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (!data || data.length === 0) {
            console.log('No inventory found for vendor:', vendorUsername);
            return NextResponse.json([]);
        }

        // Flatten for the UI
        const flattened = data.map(item => ({
            barcode: item.barcode,
            price: item.price,
            stock: item.stock,
            status: item.status,
            product_name: (item.products as any)?.product_name || 'Unknown Product',
            brand: (item.products as any)?.brand || 'Unknown Brand',
            quantity: (item.products as any)?.quantity || 'N/A',
            category: (item.products as any)?.category || 'N/A',
        }));

        return NextResponse.json(flattened);
    }

    // Admins see global product list
    if (session.role === 'admin') {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
}

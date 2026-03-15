import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to check for Admin or Vendor session
async function getSession() {
    const cookieStore = await cookies();
    if (cookieStore.has('admin_session')) return { role: 'admin', id: 'admin_user' };
    if (cookieStore.has('vendor_session')) return { role: 'vendor', id: 'vendor_user' }; // Mock ID
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
            .eq('vendor_id', session.id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        // Flatten for the UI
        const flattened = data.map(item => ({
            barcode: item.barcode,
            price: item.price,
            stock: item.stock,
            status: item.status,
            product_name: (item.products as any).product_name,
            brand: (item.products as any).brand,
            quantity: (item.products as any).quantity,
            category: (item.products as any).category,
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

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

// GET /api/v0/products/{barcode}.json
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;
    const session = await getSession();

    // 1. If it's a vendor, check their local inventory first
    if (session && session.role === 'vendor') {
        const { data, error } = await supabase
            .from('vendor_inventory')
            .select(`
                price,
                stock,
                status,
                products (
                    barcode,
                    product_name,
                    brand,
                    quantity,
                    category
                )
            `)
            .eq('barcode', barcode)
            .eq('vendor_id', session.id)
            .single();

        if (!error && data) {
            // Flatten the response for the UI
            return NextResponse.json({
                barcode: (data.products as any).barcode,
                product_name: (data.products as any).product_name,
                brand: (data.products as any).brand,
                quantity: (data.products as any).quantity,
                category: (data.products as any).category,
                price: data.price,
                stock: data.stock,
                status: data.status,
                source: 'local'
            });
        }
    }

    // 2. Global fallback or for non-vendors
    const { data, error } = await supabase
        .from('products')
        .select('barcode, product_name, brand, quantity, category')
        .eq('barcode', barcode)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ ...data, source: 'global' });
}

// POST/PUT /api/v0/products/{barcode}.json
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;
    const body = await request.json();

    // Step A: Update Global Metadata
    const { error: metaError } = await supabase
        .from('products')
        .upsert({
            barcode,
            product_name: body.product_name,
            brand: body.brand,
            quantity: body.quantity,
            category: body.category,
            updated_at: new Date().toISOString()
        });

    if (metaError) {
        return NextResponse.json({ error: metaError.message }, { status: 400 });
    }

    // Step B: Update Vendor Inventory (if vendor)
    if (session.role === 'vendor' || (session.role === 'admin' && body.price)) {
        const { error: invError } = await supabase
            .from('vendor_inventory')
            .upsert({
                vendor_id: session.id,
                barcode,
                price: body.price,
                stock: body.stock,
                status: body.status || 'Active',
                updated_at: new Date().toISOString()
            }, { onConflict: 'vendor_id,barcode' });

        if (invError) {
            return NextResponse.json({ error: invError.message }, { status: 400 });
        }
    }

    return NextResponse.json({ message: 'Success', barcode });
}

// DELETE /api/v0/products/{barcode}.json
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;

    // Vendors only delete from their own inventory
    if (session.role === 'vendor') {
        const { error } = await supabase
            .from('vendor_inventory')
            .delete()
            .eq('barcode', barcode)
            .eq('vendor_id', session.id);

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ message: 'Local inventory deleted' });
    }

    // Admins delete globally
    if (session.role === 'admin') {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('barcode', barcode);

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ message: 'Product deleted globally' });
    }

    return NextResponse.json({ error: 'Action not allowed' }, { status: 403 });
}

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
            .eq('vendor_id', (session as any).username)
            .single();

        if (!error && data) {
            // Flatten the response for the UI - Return ONLY specific metadata fields
            return NextResponse.json({
                barcode: (data.products as any).barcode,
                product_name: (data.products as any).product_name,
                brand: (data.products as any).brand,
                quantity: (data.products as any).quantity,
                category: (data.products as any).category
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

    return NextResponse.json(data);
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
    let inventorySynced = false;
    if (session.role === 'vendor' || (session.role === 'admin' && body.price)) {
        const vendorUsername = (session as any).username;

        if (!vendorUsername && session.role === 'vendor') {
            console.error('CRITICAL: Vendor username missing in session:', session);
            return NextResponse.json({
                error: 'Session data corrupted. Please log out and log back in to refresh your vendor profile.'
            }, { status: 401 });
        }

        // Use 'admin' as fallback identifier if user is admin
        const identifier = vendorUsername || 'admin_user';

        console.log(`DEBUG: Attempting upsert for [${identifier}] on barcode [${barcode}]`);

        const { data: invData, error: invError } = await supabase
            .from('vendor_inventory')
            .upsert({
                vendor_id: identifier,
                barcode,
                price: body.price,
                stock: body.stock,
                status: body.status || 'Active',
                updated_at: new Date().toISOString()
            }, { onConflict: 'vendor_id,barcode' })
            .select();

        if (invError) {
            console.error('DATABASE ERROR (vendor_inventory):', invError);
            return NextResponse.json({
                error: `Inventory storage failed: ${invError.message}. Details: ${invError.details || 'None'}. Hint: ${invError.hint || 'None'}`
            }, { status: 400 });
        }

        console.log('DEBUG: Inventory upsert successful:', invData);
        inventorySynced = true;
    } else {
        console.log('DEBUG: Skipping Step B. Role:', session.role, 'Price:', body.price);
    }

    return NextResponse.json({
        message: 'Success',
        barcode,
        inventorySynced
    });
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
            .eq('vendor_id', (session as any).username);

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

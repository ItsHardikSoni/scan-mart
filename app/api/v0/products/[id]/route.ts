import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to check for Admin or Vendor session
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.has('admin_session') || cookieStore.has('vendor_session');
}

// GET /api/v0/products/{barcode}.json
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // Support .json suffix by stripping it if present
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;

    const { data, error } = await supabase
        .from('products')
        .select('barcode, product_name, brand, quantity')
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
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;
    const body = await request.json();

    const { data, error } = await supabase
        .from('products')
        .upsert({
            barcode,
            product_name: body.product_name,
            brand: body.brand,
            quantity: body.quantity,
            category: body.category,
            updated_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
}

// DELETE /api/v0/products/{barcode}.json
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const barcode = id.endsWith('.json') ? id.slice(0, -5) : id;

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('barcode', barcode);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Product deleted' });
}

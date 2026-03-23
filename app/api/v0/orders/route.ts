import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Helper to check for vendor session
async function getSession() {
    const cookieStore = await cookies();

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

    return null;
}

// GET /api/v0/orders - List all orders for the vendor
export async function GET(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role === 'vendor') {
        const vendorUsername = (session as any).username;

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('vendor_id', vendorUsername)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Order Fetch Error:', error);
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json(data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST /api/v0/orders - Create a new order
export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'vendor') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const {
            customer_name,
            customer_phone,
            items,
            total,
            payment_method
        } = body;

        // Validation
        if (!customer_name || !customer_phone || !items || !total || !payment_method) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!['online', 'cash', 'card'].includes(payment_method)) {
            return NextResponse.json(
                { error: 'Invalid payment method' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        const { data, error } = await supabase
            .from('orders')
            .insert({
                order_id: orderId,
                vendor_id: (session as any).username,
                customer_name,
                customer_phone,
                items,
                total: parseFloat(total),
                payment_method,
                status: 'Completed'
            })
            .select();

        if (error) {
            console.error('Order Creation Error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data?.[0], { status: 201 });
    } catch (err) {
        console.error('Error creating order:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

'use server';

import { supabase } from '@/lib/supabase';

export async function submitContactMessage(formData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    category?: string;
    priority?: string;
}) {
    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || 'No Subject',
                    message: formData.message,
                    category: formData.category || 'General Inquiry',
                    priority: formData.priority || 'Medium',
                    status: 'New'
                }
            ]);

        if (error) throw error;

        return { success: true };
    } catch (err: any) {
        console.error('Contact Submission Error:', err);
        return { error: err.message || 'Failed to send message' };
    }
}

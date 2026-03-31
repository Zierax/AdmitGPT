import { NextResponse } from 'next/server';
import { insertMessage } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const { name, email, message, links, score, classification } = body;

        // Validation
        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const result = insertMessage({
            name,
            email,
            message,
            links,
            score,
            classification
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

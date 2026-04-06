import { NextResponse } from 'next/server';
import { insertMessage } from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message, links, score, classification } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const db = (process.env as any).DB;
        const result = await insertMessage(db, {
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

import { NextResponse } from 'next/server';
import { getMessages, updateMessageStatus, deleteMessage } from '@/lib/db';

export const runtime = 'edge';

function isAuthenticated(req: Request) {
    const passcode = req.headers.get('x-admin-passcode');
    const expectedPasscode = process.env.NEXT_PUBLIC_PASSCODE_OF_OUTLINERS;
    
    if (!expectedPasscode || passcode !== expectedPasscode) {
        return false;
    }
    return true;
}

export async function GET(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = (process.env as any).DB;
        const messages = await getMessages(db);
        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();
        if (!id || !status) {
            return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
        }

        const db = (process.env as any).DB;
        await updateMessageStatus(db, id, status);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const db = (process.env as any).DB;
        await deleteMessage(db, Number(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

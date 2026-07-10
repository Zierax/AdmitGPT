// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — D1 (Cloudflare SQLite-at-edge) data layer
// Typed wrappers over the D1 runtime API used by the admin messaging routes.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type MessageStatus = 'unread' | 'read' | 'spam';

export interface MessageRecord {
    id: number;
    name: string;
    email: string;
    message: string;
    links: string;
    score: number;
    classification: string;
    status: MessageStatus;
    timestamp: string;
}

export type NewMessage = {
    name?: string;
    email?: string;
    message?: string;
    links?: string;
    score?: number;
    classification?: string;
    status?: MessageStatus;
};

// Minimal D1 type surface (avoids adding @cloudflare/workers-types as a dep).
export interface D1Result<T = unknown> {
    results: T[];
    success: boolean;
    error?: string;
    meta: {
        last_row_id: number | bigint;
        changes: number;
        duration: number;
        served_by: string;
        rows_read: number;
        rows_written: number;
    };
}

export interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    run(): Promise<D1Result>;
    all<T = unknown>(): Promise<D1Result<T>>;
    first<T = unknown>(column?: string): Promise<T | null>;
}

export interface D1Database {
    prepare(query: string): D1PreparedStatement;
}

export async function insertMessage(
    db: D1Database,
    data: NewMessage
): Promise<{ success: true; id: number }> {
    const result = await db
        .prepare(
            `INSERT INTO messages (name, email, message, links, score, classification)
             VALUES (?, ?, ?, ?, ?, ?)`
        )
        .bind(
            data.name || 'Anonymous',
            data.email || 'N/A',
            data.message || '',
            data.links || '',
            data.score ?? 0,
            data.classification || 'STANDARD'
        )
        .run();

    if (!result.success) {
        throw new Error(result.error || 'Failed to insert message');
    }

    return { success: true, id: Number(result.meta.last_row_id) };
}

export async function getMessages(db: D1Database): Promise<MessageRecord[]> {
    const { results } = await db
        .prepare('SELECT * FROM messages ORDER BY timestamp DESC')
        .all<MessageRecord>();
    return results;
}

export async function updateMessageStatus(
    db: D1Database,
    id: number,
    status: MessageStatus
): Promise<{ success: true }> {
    const result = await db
        .prepare('UPDATE messages SET status = ? WHERE id = ?')
        .bind(status, id)
        .run();

    if (!result.success) {
        throw new Error(result.error || 'Failed to update message');
    }

    return { success: true };
}

export async function deleteMessage(
    db: D1Database,
    id: number
): Promise<{ success: true }> {
    const result = await db
        .prepare('DELETE FROM messages WHERE id = ?')
        .bind(id)
        .run();

    if (!result.success) {
        throw new Error(result.error || 'Failed to delete message');
    }

    return { success: true };
}

export interface MessageRecord {
    id: number;
    name: string;
    email: string;
    message: string;
    links: string;
    score: number;
    classification: string;
    status: 'unread' | 'read' | 'spam';
    timestamp: string;
}

export async function insertMessage(db: D1Database, data: any) {
    return await db.prepare(`
        INSERT INTO messages (name, email, message, links, score, classification)
        VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
        data.name || 'Anonymous',
        data.email || 'N/A',
        data.message || '',
        data.links || '',
        data.score || 0,
        data.classification || 'STANDARD'
    ).run();
}

export async function getMessages(db: D1Database) {
    const { results } = await db.prepare('SELECT * FROM messages ORDER BY timestamp DESC').all();
    return results as unknown as MessageRecord[];
}

export async function updateMessageStatus(db: D1Database, id: number, status: string) {
    return await db.prepare('UPDATE messages SET status = ? WHERE id = ?').bind(status, id).run();
}

export async function deleteMessage(db: D1Database, id: number) {
    return await db.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
}

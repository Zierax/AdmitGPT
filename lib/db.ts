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

export async function insertMessage(db: any, data: any) {
    const result = await db.prepare(`
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
    
    return { success: true, id: result.meta.last_row_id };
}

export async function getMessages(db: any) {
    const { results } = await db.prepare('SELECT * FROM messages ORDER BY timestamp DESC').all();
    return results as MessageRecord[];
}

export async function updateMessageStatus(db: any, id: number, status: string) {
    await db.prepare('UPDATE messages SET status = ? WHERE id = ?').bind(status, id).run();
    return { success: true };
}

export async function deleteMessage(db: any, id: number) {
    await db.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
    return { success: true };
}

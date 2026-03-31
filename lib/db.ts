import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Initialize the database connection.
// In production (e.g. Vercel), this would NOT persist data across deployments since it's local.
// But as requested, this is designed to be a local private database.

const dbPath = path.join(process.cwd(), 'messages.db');

// Ensure the directory exists if it's placed somewhere else in the future
// fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// Initialize the table
db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        message TEXT,
        links TEXT,
        score REAL,
        classification TEXT,
        status TEXT DEFAULT 'unread', -- 'unread', 'read', 'spam'
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

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

export function insertMessage(data: Omit<MessageRecord, 'id' | 'timestamp' | 'status'>) {
    const stmt = db.prepare(`
        INSERT INTO messages (name, email, message, links, score, classification)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
        data.name || 'Anonymous',
        data.email || 'N/A',
        data.message || '',
        data.links || '',
        data.score || 0,
        data.classification || 'STANDARD'
    );
    
    return { success: true, id: result.lastInsertRowid };
}

export function getMessages() {
    const stmt = db.prepare('SELECT * FROM messages ORDER BY timestamp DESC');
    return stmt.all() as MessageRecord[];
}

export function updateMessageStatus(id: number, status: 'unread' | 'read' | 'spam') {
    const stmt = db.prepare('UPDATE messages SET status = ? WHERE id = ?');
    stmt.run(status, id);
    return { success: true };
}

export function deleteMessage(id: number) {
    const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
    stmt.run(id);
    return { success: true };
}

export default db;

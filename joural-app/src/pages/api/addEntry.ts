// pages/api/addEntry.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let { userId, notebookId, title, content } = req.body;

    // Convert userId and notebookId to integers
    userId = parseInt(userId, 10);
    notebookId = parseInt(notebookId, 10);

    if (!userId || !title || !notebookId || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = `INSERT INTO entry (user_id, notebook_id, title, content, created_at) VALUES (?, ?, ?, ?, datetime('now'))`;

    db.run(sql, [userId, notebookId, title, content], function (err) {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ message: 'Error adding entry', error: err.message });
      }
      res.status(201).json({ message: 'Entry added successfully', entryId: this.lastID });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, title, description } = req.body;

    // Validate the input
    if (!userId || !title) {
      res.status(400).json({ message: 'UserId and Title are required' });
      return;
    }

    // Insert the new notebook into the database
    const sql = `INSERT INTO notebook (user_id, title, description) VALUES (?, ?, ?)`;
    db.run(sql, [userId, title, description], function(err) {
      if (err) {
        res.status(500).json({ message: 'Error creating new notebook' });
        return;
      }

      // Successful notebook creation
      res.status(201).json({ message: 'Notebook created successfully', notebookId: this.lastID });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

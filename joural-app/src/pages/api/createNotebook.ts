import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      let userId: number;
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
        if (typeof decoded === 'string' || !decoded.userId) {
          throw new Error('Invalid token');
        }
        userId = decoded.userId;
      } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }
      
    const { title, description } = req.body;

    // Validate the input
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
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

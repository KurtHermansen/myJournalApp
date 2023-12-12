import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get user ID from the query parameters
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    db.all("SELECT * FROM notebook WHERE user_id = ?", [userId], (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Error fetching notebooks' });
        return;
      }
      res.json(rows);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

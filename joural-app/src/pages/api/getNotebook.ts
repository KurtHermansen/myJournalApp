import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let userId: number;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;
      userId = decoded.userId;
      console.log("Decoded User ID:", userId);

    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
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

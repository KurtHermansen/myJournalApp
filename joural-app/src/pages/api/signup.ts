// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database/dbConnect';
import jwt from 'jsonwebtoken';

// User interface
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  // Add any other user properties here
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Validate the input
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Insert the new user into the database
    const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, password], function(err) {
      if (err) {
        res.status(500).json({ message: 'Error registering new user' });
        return;
      }

      // Make sure JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      // Create a token
      const token = jwt.sign(
        { userId: this.lastID, username: username }, // 'this.lastID' should contain the ID of the newly inserted user
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log('JWT Secret:', process.env.JWT_SECRET);


      // Successful registration
      res.status(201).json({ message: 'User registered successfully', token });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

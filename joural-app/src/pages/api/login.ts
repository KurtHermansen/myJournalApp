// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../database/dbConnect";
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
	if (req.method === "POST") {
		const { email, password } = req.body;

		// Validate the input
		if (!email || !password) {
			res.status(400).json({
				message: "Email and password are required",
			});
			return;
		}

		// Check if the user exists and the password is correct
		const sql = `SELECT * FROM user WHERE email = ?`;
		db.get(sql, [email], (err, user: User | undefined) => {
			if (err) {
				res.status(500).json({ message: "Error logging in" });
				return;
			}

			if (!user) {
				res.status(401).json({ message: "User not found" });
				return;
			}

			// Compare the provided password with the stored one
			if (password !== user.password) {
				res.status(401).json({ message: "Invalid credentials" });
				return;
			}
			if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
              }
              
              const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
              );

              

			// Successful login
            res.status(201).json({ message: 'User registered successfully', token });
		});
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

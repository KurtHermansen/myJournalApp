import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../database/dbConnect";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { username, email, password } = req.body;

		// Validate the input
		if (!username || !email || !password) {
			res.status(400).json({
				message: "Email and password are required",
			});
			return;
		}

		// Insert the new user into the database
		const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
		db.run(sql, [username, email, password], function (err) {
			if (err) {
				res.status(500).json({ message: "Error registering new user" });
				return;
			} else {
				// Successful registration, return username and userId in the response
				const userId = this.lastID;
				res.status(201).json({
					message: "User registered successfully",
					userId,
					username,
				});
			}
		});
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

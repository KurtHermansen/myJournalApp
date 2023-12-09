// dbConnect.db
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('./src/database', 'journal-app.db');

// Function to initialize the database
const initializeDatabase = (db: sqlite3.Database) => {
    // Create Users table
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err: Error | null) => {
        if (err) {
            console.error("Error creating user table:", err.message);
        } else {
            console.log("User table is ready");
        }
    });

    // Create Notebook table with a foreign key reference to User
    db.run(`CREATE TABLE IF NOT EXISTS notebook (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES user(id)
    )`, (err: Error | null) => {
        if (err) {
            console.error("Error creating notebook table:", err.message);
        } else {
            console.log("Notebook table is ready");
        }
    });

    // Create Entry table with foreign key references to User and Notebook
    db.run(`CREATE TABLE IF NOT EXISTS entry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        notebook_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (notebook_id) REFERENCES notebook(id)
    )`, (err: Error | null) => {
        if (err) {
            console.error("Error creating entry table:", err.message);
        } else {
            console.log("Entry table is ready");
        }
    });
};

// Create a new database instance and connect to it
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Error connecting to the SQLite database:", err.message);
    } else {
        console.log("Connected to the SQLite database at:", dbPath);

        // Enable foreign key constraints
        db.run(`PRAGMA foreign_keys = ON`, err => {
            if (err) {
                console.error("Error enabling foreign key constraints:", err.message);
            }
        });

        // Initialize the database with the required tables
        initializeDatabase(db);
    }
});

export default db;

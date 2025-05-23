const Database = require('better-sqlite3');
const db = new Database('game.db');

// Create accounts table
db.prepare(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`).run();

// Create scores table
db.prepare(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  );
`).run();

module.exports = db;

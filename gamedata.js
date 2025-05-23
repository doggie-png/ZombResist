const db = require('./db');

// Register a new user
function registerUser(username, password) {
  try {
    db.prepare('INSERT INTO accounts (username, password) VALUES (?, ?)').run(username, password);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Login user (plain-text password check)
function loginUser(username, password) {
  const stmt = db.prepare('SELECT * FROM accounts WHERE username = ? AND password = ?');
  const user = stmt.get(username, password);
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
}


// Save score for a user
function saveScore(userId, score) {
  const date = new Date().toISOString();
  db.prepare('INSERT INTO scores (account_id, score, date) VALUES (?, ?, ?)').run(userId, score, date);
}

// Get scores for a user
function getScores(userId) {
  return db.prepare('SELECT score, date FROM scores WHERE account_id = ? ORDER BY date DESC').all(userId);
}

module.exports = {
  registerUser,
  loginUser,
  saveScore,
  getScores,
};

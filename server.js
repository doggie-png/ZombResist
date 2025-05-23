const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const gameData = require('./gamedata');

const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.static('client'));

// REST endpoint for registration
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const result = gameData.registerUser(username, password);
  res.json(result);
});

// REST endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const result = gameData.loginUser(username, password);

  if (result.success) {
    res.json({ success: true, userId: result.user.id, name: result.user.username });
  } else {
    res.json({ success: false, message: result.message });
  }
});

// Socket.IO for game score sync
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('submitScore', ({ userId, score }) => {
    gameData.saveScore(userId, score);
  });

  socket.on('getScores', (userId) => {
    const scores = gameData.getScores(userId);
    socket.emit('scoresList', scores);
  });
});

server.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});

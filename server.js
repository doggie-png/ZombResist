const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const gameData = require('./gamedata');

const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.static('client'));

const players = {};
const enemies = {}; // clave: id, valor: { x, y, z, health, isAttacking }
let enemyIdCounter = 0;

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

function spawnEnemies(count) {
  for (let i = 0; i < count; i++) {
    let x, z, distancia;
    do {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 300 + 100;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
      distancia = Math.sqrt(x * x + z * z);
    } while (distancia < 100);

    const id = `enemy_${enemyIdCounter}`;
    enemies[id] = {
      id,
      x,
      y: 0,
      z,
      rotationY: 0,
      health: 100,
      isAttacking: false
    };
  }

  io.emit('enemySpawn', enemies);
}


// Socket.IO for game score sync
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  if (enemyIdCounter == 0) {
  spawnEnemies(1); // usa misma lógica que tu setDificultad()
}


  // // Initialize this player's position
  // players[socket.id] = { x: 0, y: 0 };

  // // When a player moves
  // socket.on('playerMove', (data) => {
  //   players[socket.id] = { x: data.x, y: data.y };
  //   socket.broadcast.emit('playerMoved', { id: socket.id, x: data.x, y: data.y });
  // });

  // // When a player disconnects
  // socket.on('disconnect', () => {
  //   console.log('User disconnected:', socket.id);
  //   delete players[socket.id];
  //   socket.broadcast.emit('playerDisconnected', socket.id);
  // });

  // // Score saving
  // socket.on('submitScore', ({ userId, score }) => {
  //   gameData.saveScore(userId, score);
  // });

  // // Score fetching
  // socket.on('getScores', (userId) => {
  //   const scores = gameData.getScores(userId);
  //   socket.emit('scoresList', scores);
  // });

  const players = {};
  
  // Enviar estado de enemigos al nuevo jugador
socket.emit('enemySpawn', enemies);

// Daño desde el cliente
socket.on('damageEnemy', ({ id, damage }) => {
  if (enemies[id]) {
    enemies[id].health -= damage;
    if (enemies[id].health <= 0) {
      delete enemies[id];
    }
    io.emit('enemyState', enemies); // actualizar a todos
  }
});


socket.on('updatePosition', (data) => {
  players[socket.id] = data;
  socket.broadcast.emit('playersUpdate', players);
});

socket.on('playerShoot', (data) => {
  socket.broadcast.emit('playerShoot', data);
});

socket.on('gameOver', (result) => {
  io.emit('gameOver', result); // a todos
});

socket.on('disconnect', () => {
  delete players[socket.id];
  socket.broadcast.emit('playerDisconnected', socket.id);
});

});

setInterval(() => {
  const playerList = Object.values(players);
  if (playerList.length === 0) return;

  for (const id in enemies) {
    const e = enemies[id];
    if (e.health <= 0) continue;

    // Buscar jugador más cercano
    let closest = null;
    let closestDist = Infinity;

    playerList.forEach(p => {
      const dx = p.x - e.x;
      const dz = p.z - e.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < closestDist) {
        closest = p;
        closestDist = dist;
      }
    });

    if (!closest) continue;

    // Mover hacia el jugador
    const dirX = closest.x - e.x;
    const dirZ = closest.z - e.z;
    const length = Math.sqrt(dirX * dirX + dirZ * dirZ);
    const normX = dirX / length;
    const normZ = dirZ / length;

    const speed = 20; // velocidad por segundo
    const delta = 0.05; // tiempo simulado (50ms)

    e.x += normX * speed * delta;
    e.z += normZ * speed * delta;

    // Calcular rotación Y
    e.rotationY = Math.atan2(normX, normZ);

    // Simulación de ataque (cercanía)
    e.isAttacking = closestDist < 60;
  }

  // Enviar actualizaciones a los clientes
  io.emit('enemyState', enemies);

}, 50);


server.listen(3000, () => {
  console.log('Running on http://localhost:3000');
});

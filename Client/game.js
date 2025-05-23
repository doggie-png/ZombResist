const socket = io();

// Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Store cubes by socket ID
const players = {};

// Create this client’s cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const myCube = new THREE.Mesh(geometry, material);
scene.add(myCube);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Move cube and send position to server
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') myCube.position.x += 0.1;
  if (e.key === 'ArrowLeft') myCube.position.x -= 0.1;

  socket.emit('playerMove', {
    x: myCube.position.x,
    y: myCube.position.y
  });
});

// Add or update another player
socket.on('playerMoved', (data) => {
  const id = data.id;

  // Don't draw yourself
  if (id === socket.id) return;

  if (!players[id]) {
    // Create a cube for the new player
    const otherGeometry = new THREE.BoxGeometry();
    const otherMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const otherCube = new THREE.Mesh(otherGeometry, otherMaterial);
    scene.add(otherCube);
    players[id] = otherCube;
  }

  // Update the other player's position
  players[id].position.x = data.x;
  players[id].position.y = data.y;
});

// Remove player when they disconnect
socket.on('playerDisconnected', (id) => {
  if (players[id]) {
    scene.remove(players[id]);
    delete players[id];
  }
});

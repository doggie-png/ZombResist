const socket = io();

// Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Send player move on key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') cube.position.x += 0.1;
  if (e.key === 'ArrowLeft') cube.position.x -= 0.1;
  socket.emit('playerMove', { x: cube.position.x, y: cube.position.y });
});

// Receive other player movement
socket.on('playerMoved', (data) => {
  console.log('Another player moved:', data);
  // Here you would create or update another player’s cube
});

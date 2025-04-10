import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";
import { PointerLockControls } from '/three.js-master/examples/jsm/controls/PointerLockControls.js';
function CreateSkyBox(){
  const loaderSkyBox = new THREE.CubeTextureLoader();
  const textureSkyBox = loaderSkyBox.load([
        './Level1/SkyBox/penguins (11)/dust_ft.jpg', // Derecha
        './Level1/SkyBox/penguins (11)/dust_bk.jpg', // Izquierda
        './Level1/SkyBox/penguins (11)/dust_up.jpg', // Arriba
        './Level1/SkyBox/penguins (11)/dust_dn.jpg', // Abajo
        './Level1/SkyBox/penguins (11)/dust_rt.jpg', // Frente
        './Level1/SkyBox/penguins (11)/dust_lf.jpg'  // Atrás
      ]);
  scene.background = textureSkyBox;
}

function CreateFloor(){
  const floorGeometry = new THREE.PlaneGeometry(15000, 15000); // Piso grande
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 1, metalness: 0 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = - Math.PI / 2; // Rotar para que quede plano en el suelo
  scene.add(floor);
}

function cargaModelos(){
  //warehpuse
  const loader = new GLTFLoader();
  loader.load('./Level1/Modelos/Warehouse.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(8,8,8);
    scene.add(model); 
    model.position.set(180,0,0);
  }, undefined, (error) => {
    console.error(error);
  });

  //avionC
  const loaderAvionC = new GLTFLoader();
  loaderAvionC.load('./Level1/ModelosGLB/avionC/ww_plane.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(18,18,18);
    scene.add(model); 
    model.position.set(-80,30,280);
    model.rotation.z = Math.PI / 1;
  }, undefined, (error) => {
    console.error(error);
  });

  const loader2 = new GLTFLoader();

  //avionA
  loader2.load('./Level1/ModelosGLB/avionA.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(18,18,18);
    scene.add(model); 
    model.position.set(-130,0,-250);
  }, undefined, (error) => {
    console.error(error); 
  });

  //carga con obj
  //caja de madera
  // Cargar la textura
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('./Level1/Modelos/caja/cajaMadera.png'); 
  // Cargar el objeto .obj
  const loaderobj = new OBJLoader();
  loaderobj.load('./Level1/Modelos/caja/caja.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(0.25,0.25,0.25);
    scene.add(object);
    object.position.set(0, 1, 10);
  });

  //barricada de concreto
  const textureLoader32 = new THREE.TextureLoader();
  const textureBarricada = textureLoader.load('./Level1/Modelos/concrete-barricade/concrete-barricade.png'); 
  // Cargar el objeto .obj
  const loaderobj2 = new OBJLoader();
  loaderobj.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(2,2,2);
    scene.add(object);
    object.position.set(0, 0, 55);
  });

  //caja militar
  const textureLoader3 = new THREE.TextureLoader();
  const textureMilitarBox = textureLoader.load('./Level1/Modelos/Militar-box/militarBox.png'); 
  // Cargar el objeto .obj
  const loaderobj3 = new OBJLoader();
  loaderobj.load('./Level1/Modelos/Militar-box/militarBox.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureMilitarBox;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(5.5,5.5,5.5);
    scene.add(object);
    object.position.set(0, 0, -35);
  });

  //hangar
  const textHangar = new THREE.TextureLoader();
  const textureHan = textureLoader.load('./Level2/Models/garaje/d_garage_33.jpg'); 
  // Cargar el objeto .obj
  const loaderobj4 = new OBJLoader();
  loaderobj4.load('./Level2/Models/garaje/hangar.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureHan;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(10,10,10);
    scene.add(object);
    object.position.set(0, 0, -1005);
  });
}
let mixer;
const animationsMap = new Map();
let currentAction;
const clock = new THREE.Clock();
function Player(){
  //personaje
  const loaderPersonaje = new GLTFLoader();
  loaderPersonaje.load('./personajes/Soldier.glb', (gltf) => {
    soldier = gltf.scene;
    mixer = new THREE.AnimationMixer(soldier);
    soldier.scale.set(20,20,20);
          
    scene.add(soldier); 
    soldier.position.set(0,1,0);
    soldier.rotation.y = Math.PI;
    camera.position.set(0,85,84);

//    const gltfAnimations = gltf.animations;
    // Filtrar y agregar animaciones al mapa
    //gltfAnimations.filter(a => a.name !== 'TPose').forEach((a) => {
      
      //animationsMap.set(a.name, mixer.clipAction(a));
    //});
    //console.log('Animaciones cargadas:', gltf.animations.map(a => a.name));
    gltf.animations.forEach((clip) => {
      animationsMap.set(clip.name, mixer.clipAction(clip));
    });
  
    playAnimation('Idle'); // animación inicial

  }, undefined, (error) => {
    console.error(error);

  });
  
}


function playAnimation(name) {
  const newAction = animationsMap.get(name);
  if (!newAction || newAction === currentAction) return;

  if (currentAction) {
    currentAction.fadeOut(0.2); // suaviza la transición
  }

  newAction.reset().fadeIn(0.2).play();
  currentAction = newAction;
}

// SCENE
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000); //55, window.innerWidth / window.innerHeight, 45, 30000
//camera.position.set(10,5,40);     

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);

// Luces
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Luz ambiental suave
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional (como el sol)
directionalLight.position.set(10, 10, 10).normalize(); // Posición de la luz
scene.add(directionalLight);

CreateSkyBox();
CreateFloor();
cargaModelos();

//controls camera
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let isRunning = false;
//let speed = 1;
const baseSpeed = 1;
const runMultiplier = 3;
const currentSpeed = isRunning ? baseSpeed * runMultiplier : baseSpeed;
let velocity = new THREE.Vector3();
let controls = new PointerLockControls(camera, document.body);
//const orbitControl = new OrbitControls(camera, renderer.domElement);

document.body.addEventListener('click', () => {
  controls.lock(); // Bloquear el ratón cuando se haga clic en la pantalla
});

//orbitControl.enableDamping = true;
////orbitControl.minDistance = 5;
////orbitControl.maxDistance = 15;
//orbitControl.dampingFactor = 0.25;
  //orbitControl.screenSpacePanning = false;
//orbitControl.enablePan = false;
////orbitControl.maxPolarAngle = Math.PI / 2 - 0.5;
//orbitControl.update();

//controls person move
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ShiftLeft':
    case 'ShiftRight':
      isRunning = true;
      break;
    case 'KeyW':
      moveForward = true;
      break;
    case 'KeyS':
      moveBackward = true;
      break;
    case 'KeyA':
      moveLeft = true;
      break;
    case 'KeyD':
      moveRight = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'ShiftLeft':
    case 'ShiftRight':
      isRunning = false;
      break;
    case 'KeyW':
      moveForward = false;
      break;
    case 'KeyS':
      moveBackward = false;
      break;
    case 'KeyA':
      moveLeft = false;
      break;
    case 'KeyD':
      moveRight = false;
      break;
  }
});
let soldier;
Player();

function animate() {
  controls.update();
  //orbitControl.update();
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  const isMoving = moveForward || moveBackward || moveLeft || moveRight;

  if (isMoving) {
    if(isRunning){
      playAnimation('Run');  
    }else{
      playAnimation('Walk');
    }
    
  } else {
    playAnimation('Idle');

  }

  const direction = new THREE.Vector3();  // Esta es la dirección de movimiento del soldado
  camera.getWorldDirection(direction);
  direction.y = 0;
  direction.normalize();
  const rightDirection = new THREE.Vector3();
  rightDirection.crossVectors(direction, camera.up);  // Dirección lateral
  rightDirection.normalize();
  if (moveForward) soldier.position.addScaledVector(direction, currentSpeed);
  if (moveBackward) soldier.position.addScaledVector(direction, -currentSpeed);
  if (moveLeft) soldier.position.addScaledVector(rightDirection, -currentSpeed);
  if (moveRight) soldier.position.addScaledVector(rightDirection, currentSpeed);

  

  if(soldier){
    soldier.position.y = 1;

    const lookDirection = new THREE.Vector3();
    camera.getWorldDirection(lookDirection);
    lookDirection.y = 0;
    lookDirection.normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookDirection);
    const flip = new THREE.Quaternion();
    flip.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
    quaternion.multiply(flip);
    soldier.quaternion.copy(quaternion);

    camera.position.x = soldier.position.x;
    camera.position.y = soldier.position.y + 35; // +3 Mantener la cámara a la altura del soldado
    camera.position.z = soldier.position.z -40; // +5
  }

  

  renderer.render(scene, camera);
}


animate();

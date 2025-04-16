import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";

//colisiones (todo desordenado ya se xd xd)



// variables globales

const loaderCajaMilitar = new OBJLoader();
let militarbox;
let camion;
let barricada;

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
  
  //./Level1/ModelosGLB/wooden_watchtower.glb escala 8 nivel de fabrica abandonada
  

  //helicoptero
  const abandoned_house = new GLTFLoader();
  abandoned_house.load('./Level2/ModelsGLB/helicopter.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(5,5,5);
    scene.add(model); 
    model.position.set(-700,-20,0);
    //model.rotation.z = Math.PI / 1;
  }, undefined, (error) => {
    console.error(error);
  });

  const loader2 = new GLTFLoader();
  //helicoptero2
  loader2.load('./Level2/ModelsGLB/helicopter2.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10,10,10);
    scene.add(model); 
    model.position.set(-1400,-35,0);
  }, undefined, (error) => {
    console.error(error); 
  });

  const loader3 = new GLTFLoader();
  //helicoptero3
  loader3.load('./Level2/ModelsGLB/helicopter3.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model); 
    model.position.set(-2100,0,0);
  }, undefined, (error) => {
    console.error(error); 
  });

  // edificio
  const loaderBuilding = new GLTFLoader();
  const loaderBuilding2 = new GLTFLoader();
  const loaderBuilding3 = new GLTFLoader();
  const loaderTorre = new GLTFLoader();
  const loaderBuilding5 = new GLTFLoader();

  loaderBuilding.load('./Level2/ModelsGLB/abandoned_house.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(27,27,27);
    scene.add(model); 
    model.position.set(-2400,0,0);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //torre de vigilancia
  loaderTorre.load('./Level2/ModelsGLB/wooden_watchtower.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model); 
    model.position.set(1250,10,-1250);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  loaderTorre.load('./Level2/ModelsGLB/wooden_watchtower.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model); 
    model.position.set(1250,10,1250);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  loaderTorre.load('./Level2/ModelsGLB/wooden_watchtower.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model); 
    model.position.set(-1250,10,1250);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  loaderTorre.load('./Level2/ModelsGLB/wooden_watchtower.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model); 
    model.position.set(-1250,10,-1250);
    
  }, undefined, (error) => {
    console.error(error); 
  });


  loaderBuilding3.load('./Level2/ModelsGLB/6x6_cargo_truck.glb', (gltf) => {
    camion = gltf.scene;
    camion.scale.set(6,6,6);
    scene.add(camion); 
    camion.position.set(500,0,0);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  loaderBuilding5.load('./Level2/ModelsGLB/military_cargo_truck.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(80,80,80);
    scene.add(model); 
    model.position.set(600,40,0);
    
  }, undefined, (error) => {
    console.error(error); 
  });
  
  loaderBuilding2.load('./Level2/ModelsGLB/m48a5_patton.glb', (gltf) => {
    const model2 = gltf.scene;
    model2.scale.set(10,10,10);
    scene.add(model2); 
    model2.position.set(-700,0,1500);

  }, undefined, (error) => {
    console.error(error); 
  });



  // camion
  const loaderRuinedTruck = new GLTFLoader();
  loaderRuinedTruck.load('./Level1/ModelosGLB/truck_01.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(15,15,15);
    scene.add(model); 
    model.position.set(-650,0,1200);
    model.rotation.y = Math.PI / 2;
  }, undefined, (error) => {
    console.error(error); 
  });

  //camion 2
  const loaderRuinedTruck2 = new GLTFLoader();
  loaderRuinedTruck2.load('./Level1/ModelosGLB/truck_01.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(15,15,15);
    scene.add(model); 
    model.position.set(650,0,-1200);
    model.rotation.y = Math.PI / 2;
  }, undefined, (error) => {
    console.error(error); 
  });

  //ambulancia
  const loaderAmbulance = new GLTFLoader();
  loaderAmbulance.load('./Level3/ModelosGLB/ambulance.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(18,18,18);
    scene.add(model); 
    model.position.set(600,0,300);
  }, undefined, (error) => {
    console.error(error); 
  });

  //carga con obj
  
  // Cargar la textura
  const textureLoader = new THREE.TextureLoader();
  //barricada de concreto
  
  const textureBarricada = textureLoader.load('./Level1/Modelos/concrete-barricade/concrete-barricade.png'); 
  // Cargar el objeto .obj
  const loaderobj2 = new OBJLoader();
  loaderobj2.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,2.5,9);
    scene.add(object);
    object.position.set(2000, 0, 700);
  });

  const loaderobj4 = new OBJLoader();
  loaderobj4.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(600, 0, 700);
  });

  const loaderobj5 = new OBJLoader();
  loaderobj5.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(600, 0, 900);
  });

  
  loaderobj5.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(600, 0, 1100);
  });

  
  loaderobj2.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(-3050, 0, 450);
  });

  
  loaderobj4.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(-3050, 0, 650);
  });

  
  loaderobj5.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(-3050, 0, 850);
  });

  
  loaderobj5.load('./Level1/Modelos/concrete-barricade/concrete-barricade.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureBarricada;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(3,3,9);
    scene.add(object);
    object.position.set(-3050, 0, 1050);
  });

  //caja militar
  const textureMilitarBox = textureLoader.load('./Level1/Modelos/Militar-box/militarBox.png'); 
  // Cargar el objeto .obj
  
  loaderCajaMilitar.load('./Level1/Modelos/Militar-box/militarBox.obj', function(militarbox) {
    
    militarbox.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = textureMilitarBox;
            child.material.needsUpdate = true;
        }
    });
    militarbox.scale.set(5.5,5.5,5.5);
    scene.add(militarbox);
    militarbox.position.set(0, 0, -35);
  });

  //Garaje
  const texturehangar = textureLoader.load('./Level2/Models/garaje/d_garage_33.jpg'); 
  const loaderobjHangar = new OBJLoader();
  loaderobjHangar.load('./Level2/Models/garaje/hangar.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = texturehangar;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(13.5,13.5,13.5);
    scene.add(object);
    object.position.set(1000, 0, 0);
  });
  
  const loaderobjHangar2 = new OBJLoader();
  loaderobjHangar2.load('./Level2/Models/garaje/hangar.obj', function(object) {
    
    object.traverse(function(child) {
        if (child.isMesh) {
            child.material.map = texturehangar;
            child.material.needsUpdate = true;
        }
    });
    object.scale.set(13.5,13.5,13.5);
    scene.add(object);
    object.position.set(-1000, 0, 0);
  });
}

let mixer;
const animationsMap = new Map();
let currentAction;
const clock = new THREE.Clock();

function Player(){
  //personaje
  const loaderPersonaje = new GLTFLoader();
  loaderPersonaje.load('./personajes/sold.glb', (gltf) => {
    soldier = gltf.scene;
    mixer = new THREE.AnimationMixer(soldier);
    soldier.scale.set(20,20,20);
    
    scene.add(soldier); 
    soldier.position.set(0,1,0);
    //soldier.rotation.z = Math.PI;
    //camera.position.set(0,85,84);
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
camera.position.set(0,33,-30);     

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);

// Luces
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Luz ambiental suave
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Luz direccional (como el sol)
directionalLight.position.set(100, 100, 100).normalize(); // Posición de la luz
scene.add(directionalLight);

CreateSkyBox();
CreateFloor();
cargaModelos();

//controls camera
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let isRunning = false;
//let speed = 1;
const baseSpeed = 1;
const runMultiplier = 2;
const currentSpeed = isRunning ? baseSpeed * runMultiplier : baseSpeed;

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
let isMouseDown = false;


let rotation = { x: 0, y: 0 };

// Entrar en modo pointer lock al hacer clic
document.body.addEventListener('click', () => {
  document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
  const isLocked = document.pointerLockElement === document.body;
  console.log('Pointer locked:', isLocked);
});

// Rotación de cámara con movimiento del mouse (sin necesidad de click sostenido)
document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement !== document.body) return;

  const sensitivity = 0.002; 
  rotation.y -= event.movementX * sensitivity;
  rotation.x -= event.movementY * sensitivity;

  // Limitar vertical
  rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));

  const quat = new THREE.Quaternion();
  quat.setFromEuler(new THREE.Euler(rotation.x, rotation.y, 0, 'YXZ'));
  camera.quaternion.copy(quat);
});



function animate() {
  //controls.update();
  //orbitControl.update();
  //colisiones
  
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

  
  // calcular vista
  const lookDir = new THREE.Vector3();
  camera.getWorldDirection(lookDir);
  lookDir.y = 0;
  lookDir.normalize();

  const targetQuat = new THREE.Quaternion();
  targetQuat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookDir);

  
  if(soldier){
    
    soldier.position.y = 1;
    soldier.quaternion.slerp(targetQuat, 0.2);

    const cameraOffset = new THREE.Vector3(0, 35, -55); //posicion de la camara
    cameraOffset.applyQuaternion(soldier.quaternion);
    camera.position.copy(soldier.position).add(cameraOffset);
    //camera.lookAt(soldier.position);
    
    
  }

 

  

  renderer.render(scene, camera);
}


animate();
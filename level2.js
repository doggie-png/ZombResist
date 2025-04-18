import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";

// variables globales

const loaderCajaMilitar = new OBJLoader();
let camion;

function CreateSkyBox(){
  const loaderSkyBox = new THREE.CubeTextureLoader();
  const textureSkyBox = loaderSkyBox.load([
        './Level1/SkyBox/penguins (20)/majik_ft.jpg', // Derecha
        './Level1/SkyBox/penguins (20)/majik_bk.jpg', // Izquierda
        './Level1/SkyBox/penguins (20)/majik_up.jpg', // Arriba
        './Level1/SkyBox/penguins (20)/majik_dn.jpg', // Abajo
        './Level1/SkyBox/penguins (20)/majik_rt.jpg', // Frente
        './Level1/SkyBox/penguins (20)/majik_lf.jpg'  // Atrás
      ]);
  scene.background = textureSkyBox;
}

function CreateFloor(){
   // Cargar la textura desde un archivo JPG
   const textureLoader = new THREE.TextureLoader();
   const floorTexture = textureLoader.load('./Level1/SkyBox/penguins (20)/majik_dn.jpg'); // Reemplaza con tu ruta
 
   // Opcional: Configurar cómo se repite la textura (tiling)
   floorTexture.wrapS = THREE.RepeatWrapping;
   floorTexture.wrapT = THREE.RepeatWrapping;
   floorTexture.repeat.set(25, 25); // Ajusta estos valores a tu gusto
 
   // Crear el material con la textura
   const floorMaterial = new THREE.MeshStandardMaterial({
     map: floorTexture,
     roughness: 1,
     metalness: 0
   });
 
   // Crear geometría y mesh
   const floorGeometry = new THREE.PlaneGeometry(5000, 5000);
   const floor = new THREE.Mesh(floorGeometry, floorMaterial);
   floor.rotation.x = -Math.PI / 2;
   floor.receiveShadow = true; // Si estás usando luces y sombras
   scene.add(floor);
}

function cargaModelos(){
  
  //./Level1/ModelosGLB/wooden_watchtower.glb escala 8 nivel de fabrica abandonada
  

  //cerca
  const loaderAB = new GLTFLoader();
  loaderAB.load('./Level2/ModelsGLB/chain_link_fence.glb', (gltf) => {
    const baseModel = gltf.scene;
    baseModel.scale.set(15, 17, 20);
    baseModel.rotation.y = Math.PI / 2;

    let originalMesh = null;
    baseModel.traverse(child => {
    if (child.isMesh && !originalMesh) {
      originalMesh = child;
    }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;

    // Posiciones donde querés instanciar el modelo
    const positions = [
    { x: 1200, y: 0, z: -1300 },
    { x: 1100, y: 0, z: -1300 },
    { x: 1000, y: 0, z: -1300 },
    { x: 900, y: 0, z: -1300 },
    { x: 800, y: 0, z: -1300 },
    { x: 700, y: 0, z: -1300 },
    { x: 600, y: 0, z: -1300 },
    { x: 500, y: 0, z: -1300 },
    { x: 400, y: 0, z: -1300 },
    { x: 300, y: 0, z: -1300 },
    { x: 200, y: 0, z: -1300 },
    { x: 100, y: 0, z: -1300 },
    { x: 0, y: 0, z: -1300 },
    { x: -1300, y: 0, z: -1300 },
    { x: -1200, y: 0, z: -1300 },
    { x: -1100, y: 0, z: -1300 },
    { x: -1000, y: 0, z: -1300 },
    { x: -900, y: 0, z: -1300 },
    { x: -800, y: 0, z: -1300 },
    { x: -700, y: 0, z: -1300 },
    { x: -600, y: 0, z: -1300 },
    { x: -500, y: 0, z: -1300 },
    { x: -400, y: 0, z: -1300 },
    { x: -300, y: 0, z: -1300 },
    { x: -200, y: 0, z: -1300 },
    { x: -100, y: 0, z: -1300 },
    // lado contrario
    { x: 1200, y: 0, z: 1300 },
    { x: 1100, y: 0, z: 1300 },
    { x: 1000, y: 0, z: 1300 },
    { x: 900, y: 0, z: 1300 },
    { x: 800, y: 0, z: 1300 },
    { x: 700, y: 0, z: 1300 },
    { x: 600, y: 0, z: 1300 },
    { x: 500, y: 0, z: 1300 },
    { x: 400, y: 0, z: 1300 },
    { x: 300, y: 0, z: 1300 },
    { x: 200, y: 0, z: 1300 },
    { x: 100, y: 0, z: 1300 },
    { x: 0, y: 0, z: 1300 },
    { x: -1300, y: 0, z: 1300 },
    { x: -1200, y: 0, z: 1300 },
    { x: -1100, y: 0, z: 1300 },
    { x: -1000, y: 0, z: 1300 },
    { x: -900, y: 0, z: 1300 },
    { x: -800, y: 0, z: 1300 },
    { x: -700, y: 0, z: 1300 },
    { x: -600, y: 0, z: 1300 },
    { x: -500, y: 0, z: 1300 },
    { x: -400, y: 0, z: 1300 },
    { x: -300, y: 0, z: 1300 },
    { x: -200, y: 0, z: 1300 },
    { x: -100, y: 0, z: 1300 }
    
    ];

    positions.forEach((pos) => {
    const clonedModel = baseModel.clone(true); // ¡Importante usar true para clonar todo!
    if (sharedMaterial) {
      clonedModel.traverse(child => {
        if (child.isMesh) {
          child.material = sharedMaterial;
        }
      });
    }
    clonedModel.position.set(pos.x, pos.y, pos.z);
    scene.add(clonedModel);
    });

  }, undefined, (error) => {
    console.error('Error al cargar modelo:', error);
  });

  //cerca lado CD
  const loaderCD = new GLTFLoader();
  loaderCD.load('./Level2/ModelsGLB/chain_link_fence.glb', (gltf) => {
    const baseModel = gltf.scene;
    baseModel.scale.set(15, 17, 20);
    //baseModel.rotation.y = Math.PI / 2;
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: 1300, y: 0, z: -1300 },
    { x: 1300, y: 0, z: -1200 },
    { x: 1300, y: 0, z: -1100 },
    { x: 1300, y: 0, z: -1000 },
    { x: 1300, y: 0, z: -900 },
    { x: 1300, y: 0, z: -800 },
    { x: 1300, y: 0, z: -700 },
    { x: 1300, y: 0, z: -600 },
    { x: 1300, y: 0, z: -500 },
    { x: 1300, y: 0, z: -400 },
    { x: 1300, y: 0, z: -300 },
    { x: 1300, y: 0, z: -200 },
    { x: 1300, y: 0, z: -100 },
    { x: 1300, y: 0, z: 0 },
    { x: 1300, y: 0, z: 1200 },
    { x: 1300, y: 0, z: 1100 },
    { x: 1300, y: 0, z: 1000 },
    { x: 1300, y: 0, z: 900 },
    { x: 1300, y: 0, z: 800 },
    { x: 1300, y: 0, z: 700 },
    { x: 1300, y: 0, z: 600 },
    { x: 1300, y: 0, z: 500 },
    { x: 1300, y: 0, z: 400 },
    { x: 1300, y: 0, z: 300 },
    { x: 1300, y: 0, z: 200 },
    { x: 1300, y: 0, z: 100 },
    //lado contrario
    { x: -1300, y: 0, z: -1300 },
    { x: -1300, y: 0, z: -1200 },
    { x: -1300, y: 0, z: -1100 },
    { x: -1300, y: 0, z: -1000 },
    { x: -1300, y: 0, z: -900 },
    { x: -1300, y: 0, z: -800 },
    { x: -1300, y: 0, z: -700 },
    { x: -1300, y: 0, z: -600 },
    { x: -1300, y: 0, z: -500 },
    { x: -1300, y: 0, z: -400 },
    { x: -1300, y: 0, z: -300 },
    { x: -1300, y: 0, z: -200 },
    { x: -1300, y: 0, z: -100 },
    { x: -1300, y: 0, z: 0 },
    { x: -1300, y: 0, z: 1200 },
    { x: -1300, y: 0, z: 1100 },
    { x: -1300, y: 0, z: 1000 },
    { x: -1300, y: 0, z: 900 },
    { x: -1300, y: 0, z: 800 },
    { x: -1300, y: 0, z: 700 },
    { x: -1300, y: 0, z: 600 },
    { x: -1300, y: 0, z: 500 },
    { x: -1300, y: 0, z: 400 },
    { x: -1300, y: 0, z: 300 },
    { x: -1300, y: 0, z: 200 },
    { x: -1300, y: 0, z: 100 }
    
    
    ];

    positions.forEach((pos) => {
    const clonedModel = baseModel.clone(true); // ¡Importante usar true para clonar todo!
    if (sharedMaterial) {
      clonedModel.traverse(child => {
        if (child.isMesh) {
          child.material = sharedMaterial;
        }
      });
    }
    clonedModel.position.set(pos.x, pos.y, pos.z);
    scene.add(clonedModel);
    });

  }, undefined, (error) => {
    console.error('Error al cargar modelo:', error);
  });
  

  //helicoptero
  const abandoned_house = new GLTFLoader();
  abandoned_house.load('./Level2/ModelsGLB/helicopter.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(5,5,5);
    scene.add(model); 
    model.position.set(150,-20,1000);
    model.rotation.y = Math.PI / 2;
  }, undefined, (error) => {
    console.error(error);
  });

  const loader2 = new GLTFLoader();
  //helicoptero2
  loader2.load('./Level2/ModelsGLB/helicopter2.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10,10,10);
    scene.add(model); 
    model.position.set(-350,-35,-1000);
    model.rotation.y = Math.PI / 2;
  }, undefined, (error) => {
    console.error(error); 
  });


  // edificio
  //const loaderBuilding = new GLTFLoader();
  const loaderBuilding2 = new GLTFLoader();
  const loaderBuilding3 = new GLTFLoader();
  const loaderTorre = new GLTFLoader();
  const loaderBuilding5 = new GLTFLoader();

  //torre de vigilancia
  loaderTorre.load('./Level2/ModelsGLB/wooden_watchtower.glb', (gltf) => {
    const baseModel = gltf.scene;
    baseModel.scale.set(1, 1, 1);
    //baseModel.rotation.y = Math.PI / 2;
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: 1250, y: 10, z: -1250 },
    { x: 1250, y: 0, z: 1250 },
    { x: -1250, y: 0, z: 1250 },
    { x: -1250, y: 0, z: -1250 }
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); // ¡Importante usar true para clonar todo!
      if (sharedMaterial) {
        clonedModel.traverse(child => {
          if (child.isMesh) {
            child.material = sharedMaterial;
          }
        });
      }
      clonedModel.position.set(pos.x, pos.y, pos.z);
      scene.add(clonedModel);
      });
    //model.position.set(1250,10,-1250);
    
  }, undefined, (error) => {
    console.error('Error al cargar modelo:', error); 
  });

  //6x6 truck
  loaderBuilding3.load('./Level2/ModelsGLB/6x6_cargo_truck.glb', (gltf) => {
    camion = gltf.scene;
    camion.scale.set(6,6,6);
    scene.add(camion); 
    camion.position.set(300,0,0);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //cargo truck
  loaderBuilding5.load('./Level2/ModelsGLB/military_cargo_truck.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(80,80,80);
    scene.add(model); 
    model.position.set(-300,40,0);
    
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
  //caja militar
  const textureMilitarBox = textureLoader.load('./Level1/Modelos/Militar-box/militarBox.png'); 
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
import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "/three.js-master/examples/jsm/loaders/FBXLoader.js";

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

    { x: 800, y: 0, z: -900 },
    { x: 700, y: 0, z: -900 },
    { x: 600, y: 0, z: -900 },
    { x: 500, y: 0, z: -900 },
    { x: 400, y: 0, z: -900 },
    { x: 300, y: 0, z: -900 },
    { x: 200, y: 0, z: -900 },
    { x: 100, y: 0, z: -900 },
    { x: 0, y: 0, z: -900 },

    { x: -900, y: 0, z: -900 },
    { x: -800, y: 0, z: -900 },
    { x: -700, y: 0, z: -900 },
    { x: -600, y: 0, z: -900 },
    { x: -500, y: 0, z: -900 },
    { x: -400, y: 0, z: -900 },
    { x: -300, y: 0, z: -900 },
    { x: -200, y: 0, z: -900 },
    { x: -100, y: 0, z: -900 },
    // lado contrario
    
    { x: 800, y: 0, z: 900 },
    { x: 700, y: 0, z: 900 },
    { x: 600, y: 0, z: 900 },
    { x: 500, y: 0, z: 900 },
    { x: 400, y: 0, z: 900 },
    { x: 300, y: 0, z: 900 },
    { x: 200, y: 0, z: 900 },
    { x: 100, y: 0, z: 900 },
    { x: 0, y: 0, z: 900 },
    { x: -900, y: 0, z: 900 },
    { x: -800, y: 0, z: 900 },
    { x: -700, y: 0, z: 900 },
    { x: -600, y: 0, z: 900 },
    { x: -500, y: 0, z: 900 },
    { x: -400, y: 0, z: 900 },
    { x: -300, y: 0, z: 900 },
    { x: -200, y: 0, z: 900 },
    { x: -100, y: 0, z: 900 }
    
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
    { x: 900, y: 0, z: -900 },
    { x: 900, y: 0, z: -800 },
    { x: 900, y: 0, z: -700 },
    { x: 900, y: 0, z: -600 },
    { x: 900, y: 0, z: -500 },
    { x: 900, y: 0, z: -400 },
    { x: 900, y: 0, z: -300 },
    { x: 900, y: 0, z: -200 },
    { x: 900, y: 0, z: -100 },
    { x: 900, y: 0, z: 0 },
    
    { x: 900, y: 0, z: 800 },
    { x: 900, y: 0, z: 700 },
    { x: 900, y: 0, z: 600 },
    { x: 900, y: 0, z: 500 },
    { x: 900, y: 0, z: 400 },
    { x: 900, y: 0, z: 300 },
    { x: 900, y: 0, z: 200 },
    { x: 900, y: 0, z: 100 },
    //lado contrario
    { x: -900, y: 0, z: -900 },
    { x: -900, y: 0, z: -800 },
    { x: -900, y: 0, z: -700 },
    { x: -900, y: 0, z: -600 },
    { x: -900, y: 0, z: -500 },
    { x: -900, y: 0, z: -400 },
    { x: -900, y: 0, z: -300 },
    { x: -900, y: 0, z: -200 },
    { x: -900, y: 0, z: -100 },
    { x: -900, y: 0, z: 0 },
    
    { x: -900, y: 0, z: 800 },
    { x: -900, y: 0, z: 700 },
    { x: -900, y: 0, z: 600 },
    { x: -900, y: 0, z: 500 },
    { x: -900, y: 0, z: 400 },
    { x: -900, y: 0, z: 300 },
    { x: -900, y: 0, z: 200 },
    { x: -900, y: 0, z: 100 }
    
    
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
  
  // edificio
  //const loaderBuilding = new GLTFLoader();
  const loaderBuilding2 = new GLTFLoader();
  const loaderBuilding3 = new GLTFLoader();
  const loaderwatherTank = new GLTFLoader();
  const loaderBuilding5 = new GLTFLoader();

  //wather tank
  loaderwatherTank.load('./Level3/ModelosGLB/water_tank.glb', (gltf) => {
    const water = gltf.scene;
    water.scale.set(15,15,15);
    scene.add(water); 
    water.position.set(630,0,400);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //warehouse
  loaderwatherTank.load('./Level3/ModelosGLB/warehouse_building.glb', (gltf) => {
    const water = gltf.scene;
    water.scale.set(0.1,0.1,0.1);
    scene.add(water); 
    water.position.set(550,0,0);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //tanque gas
  loaderBuilding3.load('./Level3/ModelosGLB/rusty_gas_tank.glb', (gltf) => {
    camion = gltf.scene;
    camion.scale.set(22,22,22);
    scene.add(camion); 
    camion.position.set(300,0,300);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //caseta
  loaderBuilding5.load('./Level3/ModelosGLB/utility_building_2.glb', (gltf) => {
    const baseModel = gltf.scene;
    baseModel.scale.set(25, 25, 25);
    baseModel.rotation.y = Math.PI / 2;
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: 750, y: 0, z: -750 },
    { x: 750, y: 0, z: 750 },
    { x: -750, y: 0, z: 750 },
    { x: -750, y: 0, z: -750 }
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); 
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

  //contenedores
  loaderBuilding5.load('./Level3/ModelosGLB/cargo_container.glb', (gltf) => { 
    const baseModel = gltf.scene;
    baseModel.scale.set(25, 25, 25);
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: 450, y: 0, z: -450 },
    { x: 250, y: 0, z: 450 },
    { x: -450, y: 0, z: 450 },
    { x: -450, y: 0, z: -450 }
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); 
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

  //gabinete electrico
  loaderBuilding5.load('./Level3/ModelosGLB/electrical_cabinet.glb', (gltf) => { 
    const model = gltf.scene;
    model.scale.set(28,28,28);
    scene.add(model); 
    model.position.set(450,0,-800);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //tanque metal 
  loaderBuilding5.load('./Level3/ModelosGLB/tank_metal.glb', (gltf) => { 
    const baseModel = gltf.scene;
    baseModel.scale.set(120, 120, 120);
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: -750, y: 0, z: 500 },
    { x: -750, y: 0, z: 200 },
    { x: -750, y: 0, z: 0 }
    
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); 
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

  //barriles
  loaderBuilding5.load('./Level3/ModelosGLB/rusty_metal_barrel.glb', (gltf) => { //barn_with_one_trim_texture
    const baseModel = gltf.scene;
    baseModel.scale.set(27, 27, 27);
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: -366, y: 0, z: 826 },
    { x: -766, y: 0, z: -110 },
    { x: 666, y: 0, z: -200 },
    { x: 786, y: 0, z: 336 }
    
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); 
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

  loaderBuilding5.load('./Level3/ModelosGLB/rusty_metal_barrel2.glb', (gltf) => { //barn_with_one_trim_texture
    const baseModel = gltf.scene;
    baseModel.scale.set(27, 27, 27);
    let originalMesh = null;
    baseModel.traverse(child => {
      if (child.isMesh && !originalMesh) {
        originalMesh = child;
      }
    });

    const sharedMaterial = originalMesh ? originalMesh.material : null;
    const positions = [
    { x: 366, y: 0, z: -826 },
    { x: 766, y: 0, z: 110 },
    { x: -666, y: 0, z: 200 },
    { x: -786, y: 0, z: -336 }
    
    ];
    positions.forEach((pos) => {
      const clonedModel = baseModel.clone(true); 
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
  
  // camion
  const loaderRuinedTruck = new GLTFLoader();
  loaderRuinedTruck.load('./Level1/ModelosGLB/truck_01.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(15,15,15);
    scene.add(model); 
    model.position.set(0,0,800);
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
    model.position.set(0,0,-800);
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
    model.position.set(-500,0,-150);
  }, undefined, (error) => {
    console.error(error); 
  });

  const loaderWeapon = new GLTFLoader();
  loaderWeapon.load('./Armas/Shotgun.glb', (gltf) => {
    weapon = gltf.scene;
    weapon.scale.set(0.2,0.2,0.2);
    scene.add(weapon); 
    weapon.position.set(0,10,0);
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
    militarbox.position.set(0, 0, 0);
  });

  //carga con fbx
  
    
  
}

//Weapons
let weapon;
function isNearWeapon(character, weap) {
  const distance = character.position.distanceTo(weap.position);
  return distance < 10;
}

function attachWeaponToCharacter(weapon, character) {
  // Busca el hueso de la mano del personaje
  const rightHand = character.getObjectByName("RightHand") || character.getObjectByName("mixamorigRightHand");

  if (rightHand) {
    rightHand.add(weapon); // adjuntar el arma
    weapon.position.set(6, 30, 0); // ajusta según tu modelo -3 5 15
    weapon.rotation.set(-1.46608, 0, -1.62316); //185
    weapon.scale.set(1, 1, 1); // ajustar si es necesario
    scene.remove(weapon);
    
    console.log("¡Arma recogida!");

  } else {
    console.warn("No se encontró el hueso de la mano.");
  }
}

//sistema de apuntado
function updateAim(weapon) {
  const aimDirection = new THREE.Vector3();
  camera.getWorldDirection(aimDirection);
  const targetPos = new THREE.Vector3().copy(camera.position).add(aimDirection.multiplyScalar(10));
  weapon.lookAt(targetPos); // rota el arma hacia donde mira la cámara
}

function updateCameraZoom() {
  if (isAiming) {
    camera.fov = THREE.MathUtils.lerp(camera.fov, 30, 0.1); // acercar
  } else {
    camera.fov = THREE.MathUtils.lerp(camera.fov, 75, 0.1); // normal
  }
  camera.updateProjectionMatrix();
}

let mixer;
const animationsMap = new Map();
let currentAction;
const clock = new THREE.Clock();
const fbxLoaderAnim = new FBXLoader();

//modelo fbx
function Player(){
  const loaderPersonaje = new FBXLoader();
  loaderPersonaje.load('./personajes/Swat.fbx', (fbx) => {
    soldier = fbx;
    soldier.scale.set(0.2, 0.2, 0.2); // ajusta según sea necesario
    scene.add(soldier);

    //despues de cargar el personaje pordriamos atarle el arma desde aqui
    mixer = new THREE.AnimationMixer(soldier);

    //playAnimation('Rifle_Idle');

    //idle
    fbxLoaderAnim.load('./personajes/animaciones/Rifle_Idle.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Rifle_Idle', action);
    });

    //walk
    fbxLoaderAnim.load('./personajes/animaciones/Walking.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Walking_Rifle', action);
    });

    //run
    fbxLoaderAnim.load('./personajes/animaciones/Rifle Run.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Run_Rifle', action);
    });

    //picking up
    fbxLoaderAnim.load('./personajes/animaciones/Picking Up.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Picking_Up', action);
    });

    //aiming
    fbxLoaderAnim.load('./personajes/animaciones/Rifle_Aim.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Aim', action);
    });
  
  });

}


//modelo glb
function Player2(){
  //personaje
  const loaderPersonaje = new GLTFLoader();
  loaderPersonaje.load('./personajes/sold.glb', (gltf) => {
    soldier = gltf.scene;
    mixer = new THREE.AnimationMixer(soldier);
    soldier.scale.set(20,20,20);
    
    scene.add(soldier); 
    soldier.position.set(0,1,0);
    gltf.animations.forEach((clip) => {
      animationsMap.set(clip.name, mixer.clipAction(clip));
    });
  
    playAnimation('Idle'); // animación inicial

    fbxLoaderAnim.load('./personajes/animaciones/Rifle_Idle.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Rifle_Idle', action);
    });

  }, undefined, (error) => {
    console.error(error);

  });
  
}

//animaciones de personaje
function reproducirAnimacionRecoger() {
  const action = animationsMap.get('Aim');
  if (!action) return;

  action.reset();
  action.setLoop(THREE.LoopOnce);
  action.clampWhenFinished = true;
  action.play();

  mixer.addEventListener('finished', function callback(e) {
    if (e.action === action) {
      // 👇 tu lógica de "recoger"
      attachWeaponToCharacter(weapon, soldier);

      // 💡 Remueve el listener después de usarlo una vez
      mixer.removeEventListener('finished', callback);
    }
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
let weaponPickUp = false;

//controles de juego
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
    case 'KeyE':
      if (isNearWeapon(soldier, weapon)) {
        weaponPickUp = true;
        //reproducirAnimacionRecoger();
        attachWeaponToCharacter(weapon, soldier);
        
      }      
      break;
    case 'KeyC':

      if(!FirstPerson){
        CamaraX = 0;
        CamaraY = 31;
        CamaraZ = 6;
        FirstPerson = true;
      }else{
        CamaraX = 0;
        CamaraY = 35;
        CamaraZ = -55;
        FirstPerson = false;
      }
      
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

let isAiming = false;

window.addEventListener('mousedown', (e) => {
  if (e.button === 2) { // botón derecho del mouse
    isAiming = true;
    reproducirAnimacionRecoger();
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.button === 2) {
    isAiming = false;
  }
});


let FirstPerson = false;
let CamaraX = 0, CamaraY = 35, CamaraZ = -55;
let soldier;
Player();
//let isMouseDown = false;


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

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  const isMoving = moveForward || moveBackward || moveLeft || moveRight;

  

  if (isMoving) {

    if(isRunning){
      playAnimation('Run_Rifle');  
    }else{
      playAnimation('Walking_Rifle');
    }
    
  }else{
    if(weaponPickUp){
      playAnimation('Picking_Up');
      weaponPickUp = false;
    }else{
      playAnimation('Rifle_Idle');
    }
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

    const cameraOffset = new THREE.Vector3(CamaraX, CamaraY, CamaraZ); //posicion de la camara 35,-55
    cameraOffset.applyQuaternion(soldier.quaternion);
    camera.position.copy(soldier.position).add(cameraOffset);

  }

  

  if(FirstPerson){
  
    updateCameraZoom();
    
  }
  

  renderer.render(scene, camera);
}


animate();
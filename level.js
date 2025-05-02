import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "/three.js-master/examples/jsm/loaders/FBXLoader.js";
import { CargarModelos } from './CargarModelosMapa.js';
import { explosion } from './shaders.js';

const Personaje = localStorage.getItem('Personaje');
const Arma = localStorage.getItem('Arma');
const Mapa = localStorage.getItem('Mapa');
const Dificultad = localStorage.getItem('Dificultad');

//variables globales
let TanqueGas;
let weapon;
const firePoint = new THREE.Object3D();
const Projectilegeometry = new THREE.SphereGeometry(0.1, 8, 8);
const Projectilematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const raycaster = new THREE.Raycaster();

//variables de animacion y personaje
let mixer;
let mixer2;
let isAiming = false;
const animationsMap = new Map();
const animationsMap2 = new Map();
let currentAction;
let currentAction2;
let PickUpAnimation = false;
const clock = new THREE.Clock();
const fbxLoaderAnim = new FBXLoader();
const fbxLoaderAnim2 = new FBXLoader();

//variables de arma y disparo
let lastShotTime = 0;
let fireRate = 200;
let maxDistance = 0; 
let isShooting = false;
let currentWeapon = "shotgun";
let ammo = 0; 
let ammoMax = 0;
let damageWeapon = 0;
const screenCenter = new THREE.Vector2(0, 0);
const raycaster2 = new THREE.Raycaster();
const origin = new THREE.Vector3();
const projectiles = [];

//variables enemigos
let enemylife = 100;
//controls camara y acciones
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let isRunning = false;
let speed = 20;
const baseSpeed = 1;
const runMultiplier = 2;
const currentSpeed = isRunning ? baseSpeed * runMultiplier : baseSpeed;
let weaponPickUp = false;
let FirstPerson = false;
let CamaraX = 0, CamaraY = 35, CamaraZ = -55;
let soldier;
let rotation = { x: 0, y: 0 };

//enemigos
let Zombie;
let Atack = false;
//escena
function CreateSkyBox(){
  const loaderSkyBox = new THREE.CubeTextureLoader();
  if(Mapa ==="fabrica"){
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

  if(Mapa ==="militar"){
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

  if(Mapa === "ciudad"){
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

function CargaArma(){
    const loaderWeapon = new GLTFLoader();
    if(Arma === "Shotgun"){
        loaderWeapon.load('./Armas/Shotgun.glb', (gltf) => {
            weapon = gltf.scene;
            weapon.scale.set(0.2,0.2,0.2); //m78 0.02 ak47=1
            scene.add(weapon); 
            weapon.position.set(0,10,0);
          }, undefined, (error) => {
            console.error(error); 
        });
        currentWeapon = "shotgun";
        fireRate = 1000;
        maxDistance = 100;
        ammo = 4;
        damageWeapon = 25;
    }

    if(Arma === "m78"){
        loaderWeapon.load('./Armas/m78.glb', (gltf) => {
            weapon = gltf.scene;
            weapon.scale.set(0.02,0.02,0.02); //m78 0.02 ak47=1
            scene.add(weapon); 
            weapon.position.set(0,10,0);
          }, undefined, (error) => {
            console.error(error); 
        });

        currentWeapon = "rifle";
        fireRate = 500;
        maxDistance = 220;
        ammo = 8;
        damageWeapon = 80;
    }

    if(Arma === "ak47"){
        loaderWeapon.load('./Armas/ak_47.glb', (gltf) => {
            weapon = gltf.scene;
            weapon.scale.set(0.2,0.2,0.2); //m78 0.02 ak47=1
            scene.add(weapon); 
            weapon.position.set(0,10,0);
          }, undefined, (error) => {
            console.error(error); 
        });

        currentWeapon = "burst";
        fireRate = 200;
        maxDistance = 175;
        ammo = 30;
        damageWeapon = 60;
    }
  
}

function isNearWeapon(character, weap) {
    const distance = character.position.distanceTo(weap.position);
    return distance < 30;
}

function attachWeaponToCharacter(weapon, character) {
  
    const rightHand = character.getObjectByName("RightHand") || character.getObjectByName("mixamorigRightHand");
  
    if (rightHand) {
      rightHand.add(weapon);
      
      switch (Arma) {
        case "Shotgun":
          weapon.position.set(10, 33, 0); //
          weapon.rotation.set(-1.65806, 0, -1.5708); //185
          weapon.scale.set(1, 1, 1); // shotgun=0.1 mp40=75 m78=0.1 ak47=10    
          ammo = 4;
          ammoMax = 12;
          break;
        case "m78":
          
          weapon.position.set(5, 43, 2.5); //y,x,z?
          weapon.rotation.set(3.14159, 0, -1.5708); //185
          weapon.scale.set(0.11, 0.11, 0.11);
          ammo = 8;
          ammoMax = 24;
          break;
        case "ak47":
          weapon.position.set(10, 33, 0);
          weapon.rotation.set(-1.65806, 0, -1.5708); //185
          weapon.scale.set(0.1, 0.1, 0.1);
          ammo = 30;
          ammoMax = 90;
          break;
        
      }
      updateAmmoUI();
      scene.remove(weapon);
  
      
      weapon.add(firePoint); // arma = modelo de arma (Mesh o Group)
      firePoint.position.set(0, 0, 28);
  
      console.log("¡Arma recogida!");
  
    } else {
      console.warn("No se encontró el hueso de la mano.");
    }
}

function ObjectosDisparar(){ //aqui van los objetos para que el disparo se detecte y FUNCIONE
    const loaderBuilding3 = new GLTFLoader();
    loaderBuilding3.load('./Level3/ModelosGLB/rusty_gas_tank.glb', (gltf) => {
         TanqueGas = gltf.scene;
        TanqueGas.scale.set(22,22,22);
        scene.add(TanqueGas); 
        TanqueGas.position.set(50,0,50);
        TanqueGas.name="gasTank";
        
      }, undefined, (error) => {
        console.error(error); 
      });
}

function createProjectile(position, direction) {
  
  const projectile = new THREE.Mesh(Projectilegeometry, Projectilematerial);
  projectile.position.copy(position);
  scene.add(projectile);

  // Guardamos la dirección para usarla en el update
  projectile.userData.velocity = direction.clone().multiplyScalar(2); // velocidad ajustable
  projectile.userData.traveledDistance = 0;
  return projectile;
}

function reloadAmmo(typeWeapon) {
  
  switch(typeWeapon){
    case "rifle":
      ammo = 8;
      if(ammoMax>0){
        ammoMax = ammoMax - 8;
      }else{
        ammoMax=0;
      }
      
      break;
    case "shotgun":
      ammo = 4;
      if(ammoMax>0){
        ammoMax = ammoMax - 4;
      }else{
        ammoMax=0;
      }
      
      break;
    case "metralla":
      ammo = 30;
      if(ammoMax>0){
        ammoMax = ammoMax - 30;
      }else{
        ammoMax=0;
      }
      
      break;
  }
  updateAmmoUI();
}

function updateAmmoUI() {
  document.getElementById("ammoDisplay").textContent = `Balas: ${ammo}`;
  document.getElementById("ammoDisplay2").textContent = `/ ${ammoMax}`;
}

function shootShotgun(position, direction) {
  const spreadAngle = 10 * (Math.PI / 180); // 10 grados de dispersión
  for (let i = 0; i < 4; i++) {
    const angleOffset = (Math.random() - 0.5) * spreadAngle;
    
    // Clonamos la dirección y le aplicamos una rotación pequeña
    const spreadDir = direction.clone();
    spreadDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleOffset); // Ajusta el eje si es necesario

    const projectile = createProjectile(position, spreadDir);
    projectiles.push(projectile);
  }
}

function shootBurst(position, direction, burstCount = 3, delay = 100) {
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      const projectile = createProjectile(position.clone(), direction.clone());
      projectiles.push(projectile);
    }, i * delay);
  }
}

function shoot(position, direction, currentTime, mode) {
  if (currentTime - lastShotTime >= fireRate && ammo > 0) {
    lastShotTime = currentTime;
    ammo--;

    switch (mode) {
      case "shotgun":
        shootShotgun(origin, direction);
        break;
      case "burst":
        shootBurst(origin, direction); // dispara ráfaga
        break;
      case "rifle":
        const projectile = createProjectile(position, direction);
        projectiles.push(projectile);
        break;
    }

    updateAmmoUI();


  } //else if(ammo <= 0){sonido de vacio o alerta de sin balas}
}

let explota = false;
let balasImpactadas = 0;
function updateProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        const p = projectiles[i];
        const targetObjects = [TanqueGas];
        
        const deltaMove = p.userData.velocity.length();
        p.userData.traveledDistance += deltaMove;
  
        // Limite de distancia (ajustable)
        
  
        if (p.userData.traveledDistance > maxDistance) {
            scene.remove(p);
            projectiles.splice(i, 1);
            i--;
            continue;
        }
  
  
          //colision
          raycaster.set(p.position.clone(), p.userData.velocity.clone().normalize());
          const intersects = raycaster.intersectObjects(targetObjects, true);
          if (intersects.length > 0 && intersects[0].distance < p.userData.velocity.length()) {
              const hit = intersects[0];
              balasImpactadas =  + 1;
              console.log('💥 Proyectil impactó:', hit.object.name, balasImpactadas);
              if(balasImpactadas>0){
                if(enemylife>0){
                  let damage = damageWeapon * balasImpactadas;
                  enemylife = enemylife - damage;
                  if(enemylife<0){
                    enemylife = 0;
                  }
                }
                console.log(enemylife);
              }
              explota = true;
              
              if(enemylife<=0){
                scene.remove(TanqueGas);
              }
              
              
  
              // Eliminar el proyectil
              scene.remove(p);
              projectiles.splice(i, 1);
              i--;
  
              continue;
          }
  
        p.position.add(p.userData.velocity);
  
        // Si se aleja mucho, lo borramos
        if (p.position.length() > 1000) {
            scene.remove(p);
            projectiles.splice(i, 1);
            i--;
            explota = false;
        }
        
        
    } 
    
}

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

function Player(){
  const loaderPersonaje = new FBXLoader();
  loaderPersonaje.load('./personajes/' + Personaje + '.fbx', (fbx) => {
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

function Enemy(){
  const loaderPersonaje = new FBXLoader();
  loaderPersonaje.load('./enemy/Zombie_cop.fbx', (fbx) => {
    Zombie = fbx;
    Zombie.scale.set(0.2, 0.2, 0.2); // ajusta según sea necesario
    Zombie.position.set(80,0,80);
    scene.add(Zombie);

    //despues de cargar el personaje pordriamos atarle el arma desde aqui
    mixer2 = new THREE.AnimationMixer(Zombie);

    //playAnimation('Rifle_Idle');

    //idle
    fbxLoaderAnim2.load('./enemy/animaciones/Zombie_Idle.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer2.clipAction(anim);
      animationsMap2.set('Zombie_Idle', action);
    });

    //walk
    fbxLoaderAnim2.load('./enemy/animaciones/Zombie_Running.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer2.clipAction(anim);
      animationsMap2.set('Zombie_Walking', action);
    });

    //run
    fbxLoaderAnim2.load('./enemy/animaciones/Zombie_Scream.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer2.clipAction(anim);
      animationsMap2.set('Zombie_Scream', action);
    });

    //picking up
    fbxLoaderAnim2.load('./enemy/animaciones/Zombie_Attack.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer2.clipAction(anim);
      animationsMap2.set('Zombie_Attack', action);
    });

    //aiming
    fbxLoaderAnim2.load('./enemy/animaciones/Zombie_Death.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer2.clipAction(anim);
      animationsMap2.set('Zombie_Death', action);
    });
  
  });
  playAnimation2('Zombie_Idle');

}

function moveEnemyTowardPlayer(enemy, playerPosition, speed, delta) {
  const direction = new THREE.Vector3().subVectors(playerPosition, enemy.position);
  const distance = direction.length();

  if (distance > 30) { // evitar que se pegue exactamente
    Atack = false;
    direction.normalize();
    const velocity = direction.multiplyScalar(speed * delta);
    enemy.position.add(velocity);

    // Opcional: girar el enemigo para que mire al jugador
    enemy.lookAt(playerPosition);
  }

  if(distance<30){
    Atack = true;
  }
}

function reproducirAnimacionRecoger() {
  const action = animationsMap.get('Aim');
  if (!action) return;

  action.reset();
  action.setLoop(THREE.LoopOnce);
  action.clampWhenFinished = true;
  action.play();

  mixer.addEventListener('finished', function callback(e) {
    if (e.action === action) {
      
      attachWeaponToCharacter(weapon, soldier);
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

function playAnimation2(name) {
  const newAction = animationsMap2.get(name);
  if (!newAction || newAction === currentAction2) return;

  if (currentAction2) {
    currentAction2.fadeOut(0.2); // suaviza la transición
  }

  newAction.reset().fadeIn(0.2).play();
  currentAction2 = newAction;
}

//configuramos escena
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
const ambientLight = new THREE.AmbientLight(0x404040, 4); // Luz ambiental suave
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Luz direccional (como el sol)
directionalLight.position.set(100, 100, 100).normalize(); // Posición de la luz
scene.add(directionalLight);

CreateSkyBox();
CreateFloor();
CargarModelos(Mapa,scene);
ObjectosDisparar();
CargaArma();
Player();
Enemy();



//agregamos los eventos/controles
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
          PickUpAnimation = true;
          // aqui poner la cantidad de municion segun el arma que se recoja
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
      case 'KeyR':
        reloadAmmo(currentWeapon);
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
    
window.addEventListener('mousedown', (e) => {
    
    if (e.button === 2) { // botón derecho del mouse
      isAiming = true;
      reproducirAnimacionRecoger(); // esta wea es apuntar no recoger segun yo alch ya no se jajajajja
    }
  
    if (e.button === 0) { 
      isShooting = true;
    }
  
});
  
window.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      isAiming = false;
    }
    if (e.button === 0) { 
      isShooting = false;
    }
});

document.body.addEventListener('click', () => {
    if (document.pointerLockElement !== document.body) {
      document.body.requestPointerLock();
    }
    
});
  
document.addEventListener('pointerlockchange', () => {
    const isLocked = document.pointerLockElement === document.body;
    console.log('Pointer locked:', isLocked);
});

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


//loop de animacion
function animate() {

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  if (mixer2) mixer2.update(delta);

  const isMoving = moveForward || moveBackward || moveLeft || moveRight;

  

  if (isMoving) {

    if(isRunning){
      playAnimation('Run_Rifle');
      
    }else{
      playAnimation('Walking_Rifle');
    }
    
  }else{
    if(PickUpAnimation){
      playAnimation('Picking_Up');
      PickUpAnimation = false;
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

    //pal disparo
    raycaster2.setFromCamera(screenCenter, camera);
    //camera.getWorldDirection(shootDirection);
    firePoint.getWorldPosition(origin);
    if(weaponPickUp){
      //if (projectiles.length >= 5) return;
      if(isShooting){
      const currentTime = performance.now();
      const targetPoint = raycaster2.ray.origin.clone().add(raycaster2.ray.direction.clone().multiplyScalar(100));
      const direction = targetPoint.clone().sub(origin).normalize();
      shoot(origin, direction, currentTime, currentWeapon); // shotgun or single
      
      
      }else{
        balasImpactadas = 0;
      }
      
    }
    
    
  }

  if(Zombie){
    

    if (isMoving) {
      playAnimation2('Zombie_Walking');
      if(soldier){
        moveEnemyTowardPlayer(Zombie, soldier.position, 120, delta); // 2 = velocidad
      }
      if(Atack){
        playAnimation2('Zombie_Attack');  
        
      }
      
      
      
    }else{
      if(Atack){
        playAnimation2('Zombie_Attack');  
      }else{
        playAnimation2('Zombie_Idle');  
      }
      
    }

    

  }


  
  updateProjectiles();

  if(FirstPerson){
  
    updateCameraZoom();
    
  }
  
  renderer.render(scene, camera);
}


animate();
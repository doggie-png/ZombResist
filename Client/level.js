import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "/three.js-master/examples/jsm/loaders/FBXLoader.js";
import { CargarModelos } from './CargarModelosMapa.js';
import { explosion } from './shaders.js';
// import io from '/socket.io/socket.io.js'; // asegúrate que esté accesible
const socket = io();

const Personaje = localStorage.getItem('Personaje');
const Arma = localStorage.getItem('Arma');
const Mapa = localStorage.getItem('Mapa');
const Dificultad = localStorage.getItem('Dificultad');

const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");

console.log("Logged in as:", username, "with ID:", userId);
//Arreglo para guardar los jugadores
const otherPlayers = {};
const enemigosSynced = {}; // clave: id, valor: { model, mixer, etc }

const players = {};

//variables globales
const objetosConColision = [];
let ExplosivosOBJ = [];
let positionExplosivos = [
  {x:-150,y:0,z:500},
  {x:230,y:0,z:-500},
  {x:510,y:0,z: 0},
  {x:-290,y:0,z:-500},
  {x:-350,y:0,z:500}
];

let TanqueGas;
let weapon;
const firePoint = new THREE.Object3D();
const Projectilegeometry = new THREE.SphereGeometry(0.1, 8, 8);
const Projectilematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const raycaster = new THREE.Raycaster();

//variables de animacion y personaje
let mixer;

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
let enemigos = []; // cantidad de enemigos que spawnwaran en el nivel
let mixer2;
let previousPositionZombie = new THREE.Vector3();



//varoables de jugabilidad idk ando re perdido
let SoldierLife = 100;
const vidaMaxima = 5;
let vidaActual = 5;
let tiempoRestante = 120; // tiempo en segundos (2 minutos)
let puntaje = 0;
let intervaloID = null;
let EnemigosM = 0;
let EnemigosTotales = 0;
let cajasMilitares = [];
let posicionesCajas = [];
let medics = [];
let posicionesMedics = [];
let FinJuego = false;
let Winner = false;
let NCajasMuni = 4;
let NMedicpack = 4;


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
let ZombieDamage = 0;
let Atack = false;
//escena

let juegoPausado = false;

function pausarJuego() {
  juegoPausado = true;
  clearInterval(intervaloID); 
  document.getElementById('pauseMenu').style.display = 'block';

}

function reanudarJuego() {
  juegoPausado = false;
  document.getElementById('pauseMenu').style.display = 'none';
  // vuelve a iniciar el temporizador
  iniciarTemporizador();
}

function ObtenPuntuacion(){
  //soy una puntuacion! :3
  puntaje = (EnemigosM * 100)
         - (EnemigosTotales * 25)
         + (SoldierLife * 10)
         + ((ammoMax + ammo) * 2);

  console.log('puntuacion',puntaje);
  localStorage.setItem('Kills', EnemigosM);
  localStorage.setItem('Tiempo', tiempoRestante);
  localStorage.setItem('Puntuacion', puntaje);
  mostrarTablaPuntuacion(puntaje, EnemigosM, tiempoRestante)
  

}

function mostrarTablaPuntuacion(puntaje, enemigos, tiempo) {
  document.getElementById('puntajeFinal').textContent = puntaje;
  document.getElementById('enemigosEliminados').textContent = enemigos;
  document.getElementById('tiempoFinal').textContent = tiempo;
  
  document.getElementById('scoreBoard').style.display = 'block';
}

//Funciones de socket io
socket.on('playersUpdate', (players) => {
  for (const id in players) {
    if (id === socket.id) continue;

    if (!otherPlayers[id]) {
      // Crear personaje (cubo por ahora, luego puedes usar un FBX)
      const geo = new THREE.BoxGeometry(5, 5, 5);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      otherPlayers[id] = mesh;
    }

    const p = players[id];
    const mesh = otherPlayers[id];
    mesh.position.set(p.x, p.y, p.z);
    mesh.quaternion.set(p.qx, p.qy, p.qz, p.qw);
  }
});

// Quitar jugador si se desconecta
socket.on('playerDisconnected', (id) => {
  if (otherPlayers[id]) {
    scene.remove(otherPlayers[id]);
    delete otherPlayers[id];
  }
});

socket.on('playerShoot', ({ origin, direction, weapon }) => {
  const originVec = new THREE.Vector3().fromArray(origin);
  const dirVec = new THREE.Vector3().fromArray(direction);
  shoot(originVec, dirVec, performance.now(), weapon);
});

socket.on('gameOver', ({ win }) => {
  FinJuego = true;
  hudMain(true);
  if (win) {
    document.getElementById("Winner").style.display = "block";
    document.getElementById("WinImage").style.display = "block";
  } else {
    document.getElementById("Losser").style.display = "block";
    document.getElementById("LossImage").style.display = "block";
  }
});

socket.on('enemySpawn', (data) => {
  for (const id in data) {
    const enemyData = data[id];
    // if (!enemigosSynced[id]) {
    //   Enemy(enemyData.x, enemyData.z, id); // modificamos Enemy() abajo
    // }
        if (!enemigos[id]) {
      Enemy(enemyData.x, enemyData.z, id); // modificamos Enemy() abajo
    }
  }
});

// socket.on('enemyState', (data) => {
//   for (const id in data) {
//     const enemyData = data[id];
//     const e = enemigosSynced[id];
//     if (e) {
//       e.model.position.set(enemyData.x, enemyData.y, enemyData.z);
//       e.model.rotation.y = enemyData.rotationY;
//       e.vida = enemyData.health;

//       // Visualmente muerto
//       if (e.vida <= 0) {
//         eliminarZombie(e.model, e.mixer);
//         delete enemigosSynced[id];
//       }
//     }
//   }
// });

socket.on('enemyState', (data) => {
  for (const id in data) {
    const enemyData = data[id];
    const e = enemigos[id];
    if (e) {
      e.model.position.set(enemyData.x, enemyData.y, enemyData.z);
      e.model.rotation.y = enemyData.rotationY;
      e.vida = enemyData.health;

      // Visualmente muerto
      if (e.vida <= 0) {
        eliminarZombie(e.model, e.mixer);
        delete enemigos[id];
      }
    }
  }
});

// socket.on('enemyState', (data) => {
//   for (const id in data) {
//     const serverEnemy = data[id];
//     const e = enemigosSynced[id];
//     if (!e) continue;

//     e.model.position.set(serverEnemy.x, serverEnemy.y, serverEnemy.z);
//     e.model.rotation.y = serverEnemy.rotationY;
//     e.vida = serverEnemy.health;

//     if (e.vida <= 0) {
//       eliminarZombie(e.model, e.mixer);
//       delete enemigosSynced[id];
//     }
//   }

//   // Eliminar enemigos que ya no existen
//   for (const id in enemigosSynced) {
//     if (!data[id]) {
//       eliminarZombie(enemigosSynced[id].model, enemigosSynced[id].mixer);
//       delete enemigosSynced[id];
//     }
//   }
// });



function setDificultad(){

  switch (Dificultad) {
    case "Facil":
      tiempoRestante = 300; //segundos
      EnemigosTotales = 2;
      NCajasMuni = 5;
      NMedicpack = 5;
      ZombieDamage = 10;
      posicionesCajas = [
        {x:100,y:0,z:100},
        {x:-180,y:0,z:-500},
        {x:-460,y:0,z:500},
        {x:240,y:0,z:-500},
        {x:300,y:0,z:500}
      ];

      posicionesMedics = [
        {x:150,y:3,z:100},
        {x:-230,y:3,z:-500},
        {x:-510,y:3,z:500},
        {x:290,y:3,z:-500},
        {x:350,y:3,z:500}
      ];
      break;

    case "Normal":
      tiempoRestante = 240; //segundos
      EnemigosTotales = 3;
      NCajasMuni = 4;
      NMedicpack = 4;
      ZombieDamage = 15;
      posicionesCajas = [
        {x:-180,y:0,z:-500},
        {x:-460,y:0,z:500},
        {x:240,y:0,z:-500},
        {x:300,y:0,z:500}
        
      ];

      posicionesMedics = [
        {x:-230,y:3,z:-500},
        {x:-510,y:3,z:500},
        {x:290,y:3,z:-500},
        {x:350,y:3,z:500}
      ];
      break;
    
    case "Dificil":
      tiempoRestante = 240; //segundos
      EnemigosTotales = 5;
      NCajasMuni = 3;
      NMedicpack = 3;
      ZombieDamage = 20;
      posicionesCajas = [
        {x:-460,y:0,z:500},
        {x:300,y:0,z:500},
        {x:240,y:0,z:-500}
      ];

      posicionesMedics = [
        {x:-510,y:3,z:500},
        {x:290,y:3,z:-500},
        {x:350,y:3,z:500}
      ];
      break;

    case "Extremo":
      tiempoRestante = 180; //segundos
      EnemigosTotales = 6;
      NCajasMuni = 2;
      NMedicpack = 2;
      ZombieDamage = 30;
      posicionesCajas = [
        {x:-460,y:0,z:500},
        {x:300,y:0,z:500}
      ];

      posicionesMedics = [
        {x:-510,y:3,z:500},
        {x:350,y:3,z:500}
      ];
      break;
  
  }

  

}

function cargarCajasMilitares(positions) {
  const loaderCajaMilitar = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();
  const textureMilitarBox = textureLoader.load('./Level1/Modelos/Militar-box/militarBox.png');

  positions.forEach((pos) => {
    loaderCajaMilitar.load('./Level1/Modelos/Militar-box/militarBox.obj', function (militarbox) {
      
      militarbox.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = textureMilitarBox;
          child.material.needsUpdate = true;
        }
      });

      militarbox.scale.set(5.5, 5.5, 5.5);
      militarbox.position.set(pos.x, pos.y, pos.z);

      scene.add(militarbox);
      cajasMilitares.push(militarbox);
    });
  });
}

function cargarMedics(positions) {
  const loaderMedic = new GLTFLoader();

  positions.forEach((pos) => {
    loaderMedic.load('./personajes/Medic_pack.glb', (gltf) => {
      const Medic = gltf.scene;
      Medic.scale.set(1, 1, 1);
      Medic.position.set(pos.x, pos.y, pos.z);

      scene.add(Medic);
      medics.push(Medic); // <- Guarda referencia si quieres manipularlos después
    }, undefined, (error) => {
      console.error('Error cargando modelo Medic:', error);
    });
  });
}

function eliminarCajaMilitar(jugadorPosition) {
  for (let i = 0; i < cajasMilitares.length; i++) {
    const caja = cajasMilitares[i];
    if (!caja) continue;

    const distancia = caja.position.distanceTo(jugadorPosition);
    if (distancia < 25) {
      // Eliminar del escenario
      scene.remove(caja);

      // Liberar memoria
      caja.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      // Eliminar del arreglo
      cajasMilitares.splice(i, 1);
      i--; // ajustar índice tras eliminar
      ammoMax += 8;
      updateAmmoUI();
      break;
    }
  }
}

function eliminarMedic(jugadorPosition) {
  for (let i = 0; i < medics.length; i++) {
    const medic = medics[i];
    if (!medic) continue;

    const distancia = medic.position.distanceTo(jugadorPosition);
    if (distancia < 25) {
      // Eliminar del escenario
      scene.remove(medic);

      // Liberar memoria
      medic.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat.map) mat.map.dispose(); // por si tiene texturas
              mat.dispose();
            });
          } else {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });

      // Eliminar del arreglo
      medics.splice(i, 1);
      i--; // ajustar índice tras eliminar
      if(SoldierLife<100){
        SoldierLife += 20; // sumar un corazon completo
        //document.getElementById("userLife").textContent = `vida: ${SoldierLife}`;
        vidaActual = Math.min(vidaActual + 1, vidaMaxima);
        
        actualizarCorazones();
      }
      
      break;
    }
  }
}

function iniciarCronometro() {
  startTime = Date.now();
}

function iniciarTemporizador() {
  actualizarDisplay(); // mostrar tiempo inicial
  intervaloID = setInterval(() => {
    tiempoRestante--;

    if (tiempoRestante <= 0) {
      clearInterval(intervaloID);
      document.getElementById('timer').textContent = "Tiempo agotado";
      FinJuego = true;
      hudMain(FinJuego);
      if(FinJuego && EnemigosTotales > 0){
        document.getElementById("Losser").style.display = "block";
        document.getElementById("LossImage").style.display = "block";
      }
    } else {
      actualizarDisplay();
    }
  }, 1000);
}

function actualizarDisplay() {
  const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, '0');
  const segundos = String(tiempoRestante % 60).padStart(2, '0');
  document.getElementById('timer').textContent = ` ${minutos}:${segundos}`;
}

function actualizarCronometro() {
  if (startTime === null) return;

  const ahora = Date.now();
  tiempoTotal = Math.floor((ahora - startTime) / 1000); // en segundos

  const minutos = String(Math.floor(tiempoTotal / 60)).padStart(2, '0');
  const segundos = String(tiempoTotal % 60).padStart(2, '0');

  const texto = `Tiempo: ${minutos}:${segundos}`;
  document.getElementById('timer').textContent = texto;
}

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

function ObjectosDisparar(positions){ //aqui van los objetos para que el disparo se detecte y FUNCIONE
  
  const loaderExplo = new GLTFLoader();
  positions.forEach((pos) => {
    loaderExplo.load('./Level3/ModelosGLB/rusty_gas_tank.glb', (gltf) => {
      const Explo = gltf.scene;
      Explo.scale.set(22, 22, 22);
      Explo.position.set(pos.x, pos.y, pos.z);

      scene.add(Explo);
      ExplosivosOBJ.push(Explo); // <- Guarda referencia si quieres manipularlos después
      targetObjects.push(Explo);
    }, undefined, (error) => {
      console.error('Error cargando modelo Medic:', error);
    });
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
      
      if(ammoMax>0){
        if(ammoMax >= 8){
          ammoMax = ammoMax - 8;
          ammo = 8;
        }else if(ammoMax > 0 && ammoMax < 8){
          ammo = ammoMax;
          ammoMax = 0;
          
        }
      }else{
        ammoMax=0;
      }
      
      break;
    case "shotgun":
      
      if(ammoMax>0){
        if(ammoMax >=4){
          ammoMax = ammoMax - 4;
          ammo = 4;
        }else if(ammoMax >0 && ammoMax < 4){
          ammo = ammoMax;
          ammoMax = 0;
          
        }
      }else{
        ammoMax=0;
      }
      
      break;
    case "metralla":
      
      if(ammoMax>0){
        if(ammoMax >=30){
          ammoMax = ammoMax - 30;
          ammo = 30;
        }else if(ammoMax >0 && ammoMax < 30){
          ammo = ammoMax;
          ammoMax = 0;
          
        }
        
      }else{
        ammoMax=0;
      }
      
      break;
  }
  updateAmmoUI();
}

function hudMain(mostrar = false){
  if(!mostrar){
    document.getElementById("hud").style.display = "block";
  }

  if(mostrar){
    document.getElementById("hud").style.display = "none";
  }
}

function updateAmmoUI() {
  document.getElementById("ammoDisplay").textContent = `${ammo}`;
  document.getElementById("ammoDisplay2").textContent = ` /${ammoMax}`;
}

function UpdateInterfaz(){
  //
  document.getElementById("EnemyM").textContent = `${EnemigosM}`;
  document.getElementById("EnemyTotal").textContent = `${EnemigosTotales}`;
}

function actualizarCorazones() {
  const contenedor = document.getElementById('vidaContainer');
  contenedor.innerHTML = ''; // Vaciar corazones actuales

  /*for (let i = 0; i < vidaActual; i++) {
    const img = document.createElement('img');
    img.src = './vida.png'; // Ruta de tu PNG de corazón
    img.classList.add('corazon');
    contenedor.appendChild(img);
  }*/

  //opcion con corazones vacios y llenos
  for (let i = 0; i < vidaMaxima; i++) {
    const img = document.createElement('img');
    img.src = i < vidaActual ? './vida.png' : './vida-vacia.png';
    img.classList.add('corazon');
    contenedor.appendChild(img);
  }

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
        crearFXDisparo(origin);
        shootShotgun(origin, direction);
        break;
      case "burst":
        crearFXDisparo(origin);
        shootBurst(origin, direction); // dispara ráfaga
        break;
      case "rifle":
        crearFXDisparo(origin);
        const projectile = createProjectile(position, direction);
        projectiles.push(projectile);
        break;
    }

    updateAmmoUI();


  } //else if(ammo <= 0){sonido de vacio o alerta de sin balas}
}

function eliminarZombie(objetoFBX, mixer = null) { // funciona para cualquier objeto que sea fbx, en teoria
  
  // 1. Detener animaciones si hay mixer
  if (mixer) {
    mixer.stopAllAction();
    mixer.uncacheRoot(objetoFBX);
  }

  // 2. Remover de la escena
  scene.remove(objetoFBX);

  // 3. Liberar memoria de todos los hijos (mallas, geometrías, texturas, materiales)
  objetoFBX.traverse((child) => {
    if (child.isMesh) {
      // Liberar geometría
      if (child.geometry) {
        child.geometry.dispose();
      }

      // Liberar materiales y texturas asociadas
      const materiales = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materiales.forEach((material) => {
        if (!material) return;

        // Liberar texturas asociadas al material
        const mapas = [
          'map',
          'normalMap',
          'roughnessMap',
          'metalnessMap',
          'emissiveMap',
          'alphaMap',
          'aoMap'
        ];

        mapas.forEach((mapa) => {
          if (material[mapa] && typeof material[mapa].dispose === 'function') {
            material[mapa].dispose();
          }
        });

        // Liberar material
        material.dispose();
      });
    }

    //objetoFBX = null;
  });

  // 4. Eliminar referencias (opcional pero recomendado)
  //objetoFBX = null;
  if (objetoFBX.parent) objetoFBX.parent.remove(objetoFBX);
}

function crearExplosionVisual(pos) {
  const geometria = new THREE.SphereGeometry(50, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
  const explosion = new THREE.Mesh(geometria, material);
  explosion.position.copy(pos);
  scene.add(explosion);

  // Desaparece lentamente
  setTimeout(() => scene.remove(explosion), 300);
}


// funciones de vfx's
function crearExplosion(posicion) {
  const radioDeDano = 50; // Ajusta el radio
  const dano = 50;

  crearExplosionVisual(posicion); // efecto opcional

  enemigos.forEach(enemigo => {
    const distancia = enemigo.model.position.distanceTo(posicion);
    if (distancia <= radioDeDano) {
      enemigo.vida -= dano;
      console.log(`¡Enemigo dañado! Vida restante: ${enemigo.vida}`);

      if (enemigo.vida <= 0) {
        eliminarZombie(enemigo.model, enemigo.mixer); // o lo que uses para eliminarlo
        const idx = targetObjects.indexOf(enemigo.model);
        if (idx !== -1) targetObjects.splice(idx, 1);

        enemigos = enemigos.filter(e => e !== enemigo);

        EnemigosM += 1;
        EnemigosTotales -= 1;
                
      }
    }
  });
}

function crearParticulasHumo(posX = 0, posY = 0, posZ = 0, cantidad = 300) {
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < cantidad; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = Math.random() * 100; //altura
    const z = (Math.random() - 0.5) * 2000;
    positions.push(x, y, z);
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 2,
    color: 0xaaaaaa,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particles.position.set(posX, posY, posZ);
  scene.add(particles);

  // (Opcional) Añadir movimiento al efecto
  function actualizarMovimiento() {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] += Math.sin(Date.now() * 0.0003 + i) * 0.02; // frecuencia y apmplitud
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Guarda esta función si deseas usarla en tu loop
  particles.actualizarMovimiento = actualizarMovimiento;

  return particles; // devuelve el objeto por si quieres controlarlo luego
}

function crearFXDisparo(posicion) {
  const origen = posicion.clone()
  const geometria = new THREE.BufferGeometry();
  const numParticulas = 10;
  const posiciones = [];
  const velocidades = [];

  for (let i = 0; i < numParticulas; i++) {
    const offset = new THREE.Vector3(
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
    );

    const p = new THREE.Vector3().copy(origen).add(offset);
    posiciones.push(p.x, p.y, p.z);

    // Velocidad aleatoria por partícula (explosiva)
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    velocidades.push(v);
  }

  geometria.setAttribute('position', new THREE.Float32BufferAttribute(posiciones, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 0.3,
    transparent: true,
    opacity: 0.9
  });

  const particulas = new THREE.Points(geometria, material);
  scene.add(particulas);

  let tiempoVida = 0.2; // segundos
  const clock = new THREE.Clock();

  function animar() {
    const delta = clock.getDelta();
    tiempoVida -= delta;

    const posiciones = particulas.geometry.attributes.position.array;
    for (let i = 0; i < posiciones.length; i += 3) {
      const idx = i / 3;
      posiciones[i]     += velocidades[idx].x * delta * 10;
      posiciones[i + 1] += velocidades[idx].y * delta * 10;
      posiciones[i + 2] += velocidades[idx].z * delta * 10;
    }
    particulas.geometry.attributes.position.needsUpdate = true;

    if (tiempoVida <= 0) {
      scene.remove(particulas);
      material.dispose();
      geometria.dispose();
    } else {
      requestAnimationFrame(animar);
    }
  }

  animar();
}

let explota = false;
let balasImpactadas = 0;
//let targetObjects = [TanqueGas,Zombie];

function updateProjectiles() {
  
    for (let i = 0; i < projectiles.length; i++) {
        const p = projectiles[i];
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
          console.log("Objetivos válidos:", targetObjects);
          //const validTarget = targetObjects.filter(obj => obj && obj.isObject3D);
          
          const intersects = raycaster.intersectObjects(targetObjects, true);

          if (intersects.length > 0 && intersects[0].distance < p.userData.velocity.length()) {
              //const hit = intersects[0];
              const hitObject = intersects[0].object;
              const enemigotarget = enemigos.find(e => e.model === hitObject || e.model.children.includes(hitObject));

              const exploTarget = ExplosivosOBJ.find(explo => {
              let fueImpactado = false;
              explo.traverse(child => {
                if (child === hitObject) {
                  fueImpactado = true;
                }
                });
                  return fueImpactado;
              });
              
              
              balasImpactadas =  + 1;
              console.log('💥 Proyectil impactó:', exploTarget);
              
              if(balasImpactadas>0){
                if( enemigotarget && enemigotarget.vida > 0){
                  let damage = damageWeapon * balasImpactadas;
                  enemigotarget.vida -= damage;
                }
                // if (enemigotarget && enemigotarget.vida > 0) {
                //   const id = Object.keys(enemigosSynced).find(key => enemigosSynced[key].model === enemigotarget.model);
                //   if (id) {
                //     socket.emit('damageEnemy', { id, damage: damageWeapon });
                //   }
                // }
                if (enemigotarget && enemigotarget.vida > 0) {
                  const id = Object.keys(enemigos).find(key => enemigos[key].model === enemigotarget.model);
                  if (id) {
                    socket.emit('damageEnemy', { id, damage: damageWeapon });
                  }
                }


                if(hitObject){
                  scene.remove(hitObject);
                }
              }
              explota = true;
              
              if(exploTarget){
                const explosionPosition = exploTarget.position.clone();
                crearExplosion(explosionPosition);
                scene.remove(exploTarget);
                const idx = targetObjects.indexOf(exploTarget);
                if (idx !== -1) targetObjects.splice(idx, 1);
                ExplosivosOBJ = ExplosivosOBJ.filter(e => e !== exploTarget);

              }
              
              if (enemigotarget && enemigotarget.vida <=0) {
                //enemigotarget.alive = false;
                
                eliminarZombie(enemigotarget.model, enemigotarget.mixer);
            
                const idx = targetObjects.indexOf(enemigotarget.model);
                if (idx !== -1) targetObjects.splice(idx, 1);

                enemigos = enemigos.filter(e => e !== enemigotarget);

                EnemigosM += 1;
                EnemigosTotales -= 1;
                
                if(EnemigosTotales === 0 && SoldierLife > 0){
                  clearInterval(intervaloID);
                  FinJuego = true;
                  hudMain(FinJuego);
                  Winner = true;
                  socket.emit('gameOver', { win: true }); // o false
                  ObtenPuntuacion();
                  document.getElementById("Winner").style.display = "block";
                  document.getElementById("WinImage").style.display = "block";
                }

                // Opcional: animación de muerte antes de eliminar
                
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

    fbxLoaderAnim.load('./personajes/animaciones/Dying.fbx', (fbx) => {
      const anim = fbx.animations[0];
      const action = mixer.clipAction(anim);
      animationsMap.set('Death', action);
    });
  
  });

}
//Funcion de enemigos sin replica
// function Enemy(posX, posZ) {
//   const loaderPersonaje = new FBXLoader();
//   loaderPersonaje.load('./enemy/Zombie_cop.fbx', (fbx) => {
//     const zombie = fbx;
//     zombie.scale.set(0.2, 0.2, 0.2);
//     zombie.position.set(posX, 0, posZ);
//     scene.add(zombie);
//     targetObjects.push(zombie);

//     const mixer = new THREE.AnimationMixer(zombie);
//     const animationsMap = new Map();

//     // Cargar animaciones
//     const anims = [
//       { name: 'Zombie_Idle', path: './enemy/animaciones/Zombie_Idle.fbx', speed: 1.0 },
//       { name: 'Zombie_Walking', path: './enemy/animaciones/Zombie_Running.fbx', speed: 1.0 },
//       { name: 'Zombie_Scream', path: './enemy/animaciones/Zombie_Scream.fbx', speed: 1.0 },
//       { name: 'Zombie_Attack', path: './enemy/animaciones/Zombie_Attack.fbx', speed: 1.5 },
//       { name: 'Zombie_Death', path: './enemy/animaciones/Zombie_Death.fbx', speed: 1.0 }
//     ];

//     anims.forEach(anim => {
//       fbxLoaderAnim2.load(anim.path, (fbx) => {
//         const action = mixer.clipAction(fbx.animations[0]);
//         action.setEffectiveTimeScale(anim.speed);
//         animationsMap.set(anim.name, action);
//       });
//     });

//     // Guardar este enemigo en el arreglo global
//     enemigos.push({ model: zombie, mixer, animationsMap, currentAction: null, vida: 100, ultimoAtaque: 0 });
//   });
// }

function Enemy(posX, posZ, id = null) {
  const loaderPersonaje = new FBXLoader();
  loaderPersonaje.load('./enemy/Zombie_cop.fbx', (fbx) => {
    const zombie = fbx;
    zombie.scale.set(0.2, 0.2, 0.2);
    zombie.position.set(posX, 0, posZ);
    scene.add(zombie);
    targetObjects.push(zombie);

    const mixer = new THREE.AnimationMixer(zombie);
    const animationsMap = new Map();

    // Cargar animaciones
    const anims = [
      { name: 'Zombie_Idle', path: './enemy/animaciones/Zombie_Idle.fbx', speed: 1.0 },
      { name: 'Zombie_Walking', path: './enemy/animaciones/Zombie_Running.fbx', speed: 1.0 },
      { name: 'Zombie_Scream', path: './enemy/animaciones/Zombie_Scream.fbx', speed: 1.0 },
      { name: 'Zombie_Attack', path: './enemy/animaciones/Zombie_Attack.fbx', speed: 1.5 },
      { name: 'Zombie_Death', path: './enemy/animaciones/Zombie_Death.fbx', speed: 1.0 }
    ];

    anims.forEach(anim => {
      fbxLoaderAnim2.load(anim.path, (fbx) => {
        const action = mixer.clipAction(fbx.animations[0]);
        action.setEffectiveTimeScale(anim.speed);
        animationsMap.set(anim.name, action);
      });
    });

    // enemigosSynced[id] = { model: zombie, mixer, animationsMap, currentAction: null, vida: 100 };
    enemigos.push({ model: zombie, mixer, animationsMap, currentAction: null, vida: 100, ultimoAtaque: 0 });
  });
}


function EnemyOLD(){
  const loaderPersonaje = new FBXLoader();
  loaderPersonaje.load('./enemy/Zombie_cop.fbx', (fbx) => {
    Zombie = fbx;
    Zombie.scale.set(0.2, 0.2, 0.2); // ajusta según sea necesario
    Zombie.position.set(80,0,80);
    scene.add(Zombie);
    targetObjects.push(Zombie);

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

function moveEnemyTowardPlayer(zombie, playerPos, speed, delta, selfIndex) {
  const directionToPlayer = new THREE.Vector3().subVectors(playerPos, zombie.position).normalize();

  // Separación de otros enemigos
  const separation = new THREE.Vector3();
  enemigos.forEach((otro, i) => {
    if (i === selfIndex || otro.vida <=0) return;

    const distancia = zombie.position.distanceTo(otro.model.position); // distancia entre zombies
    const minDistance = 142; // distancia mínima entre zombies

    if (distancia < minDistance && distancia > 0) {
      const repulsion = new THREE.Vector3().subVectors(zombie.position, otro.model.position).normalize();
      repulsion.y = 0; // 👉 Eliminar influencia vertical
      repulsion.multiplyScalar((minDistance - distancia) / minDistance);
      separation.add(repulsion);
    }
    

    
  });

  // Combinar direcciones
 
  const finalDir = directionToPlayer.clone().add(separation).normalize();

  // Mover zombie
  finalDir.y = 0;
  zombie.position.add(finalDir.multiplyScalar(speed * delta));


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
  
    if (name === 'Death') {
      newAction.setLoop(THREE.LoopOnce);
      newAction.clampWhenFinished = true;
      newAction.reset();
      newAction.play();
    } else {
      newAction.reset().fadeIn(0.2).play();
    }
    currentAction = newAction;
}

function playEnemyAnimation(enemigo, animName) {
  const newAction = enemigo.animationsMap.get(animName);
  if (!newAction || newAction === enemigo.currentAction) return;

  if (enemigo.currentAction) {
    enemigo.currentAction.fadeOut(0.2);
  }

  newAction.reset().fadeIn(0.2).play();
  enemigo.currentAction = newAction;
}

function playAnimation2oldenemy(name) {
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
CargarModelos(Mapa,scene,objetosConColision);
ObjectosDisparar(positionExplosivos);
CargaArma();
Player();
setDificultad();
cargarCajasMilitares(posicionesCajas);
cargarMedics(posicionesMedics);
// for (let i = 0; i < EnemigosTotales; i++) {
//   let x, z, distancia;

//   // Repetir hasta que la distancia sea mayor a 100
//   do {
//     const angle = Math.random() * Math.PI * 2;
//     const radius = Math.random() * 300 + 100; // Generar de 100 a 400, por ejemplo

//     x = Math.cos(angle) * radius;
//     z = Math.sin(angle) * radius;

//     distancia = Math.sqrt(x * x + z * z);
//   } while (distancia < 100); // Asegurar que no spawneen dentro del radio de 100

//   Enemy(x, z);
// }
let targetObjects = [];
hudMain(FinJuego);
actualizarCorazones();
const humoDelMotor = crearParticulasHumo(10, 5, -20);

// Al cargar los modelos:
//targetObjects.push(TanqueGas);
//targetObjects.push(Zombie);



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
        if(eliminarCajaMilitar(soldier.position)){
          //lo que pongas aqui no va a funcionar almenos que hagamos que la funcion regrese algo como un true por ejemplo
          

        };

        if(eliminarMedic(soldier.position)){
          //aumentar vida del jugador
          
        };

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

      case 'KeyP':
         if (!juegoPausado) {
            pausarJuego();
          } else {
            reanudarJuego();
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

// inicamos cronometro( poner una validacion para que se inicie una vez esten los 2 jugadores)
//iniciarCronometro();
iniciarTemporizador();

//loop de animacion
function animate() {
  let previousPosition = new THREE.Vector3();
  let colisionDetectada = false;
  let colisionDetectadaZ = false;
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  //if (mixer2) mixer2.update(delta);

  const isMoving = moveForward || moveBackward || moveLeft || moveRight;

  const tiempo = performance.now() * 0.001; // tiempo en segundos

  medics.forEach(medic => {
    // Rotación continua
    medic.rotation.y += 0.01;

    // Escala animada tipo pulso
    const escala = 1 + Math.sin(tiempo * 2) * 0.3; // escala entre 0.9 y 1.1
    medic.scale.set(escala, escala, escala);
  });

  if (humoDelMotor.actualizarMovimiento) {
    humoDelMotor.actualizarMovimiento();
  }
  

  if (isMoving && soldier) {
    previousPosition = soldier.position.clone();
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
      if(SoldierLife === 0){
        playAnimation('Death');
      }else{
        playAnimation('Rifle_Idle');
      }
      
    }
    if(soldier){
      previousPosition = soldier.position.clone();
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

  if(soldier && moveForward || moveBackward || moveLeft || moveRight){
    const cajaJugador = new THREE.Box3().setFromObject(soldier);
      
    for (const obj of objetosConColision) {
      const cajaObjeto = new THREE.Box3().setFromObject(obj);
      if (cajaJugador.intersectsBox(cajaObjeto)) {
        colisionDetectada = true;
        break;
      }
    }

    if (colisionDetectada) {
      // Revertir el movimiento o bloquearlo
      soldier.position.copy(previousPosition);
      console.log('colision');
    }
    
  }

  
  
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
      
      socket.emit('playerShoot', {
  origin: origin.toArray(),
  direction: direction.toArray(),
  weapon: currentWeapon
});


      }else{
        balasImpactadas = 0;
      }
      
    }
    
    
  }

  const tiempoActual = performance.now() / 1000;
  if(enemigos && soldier){
    
    enemigos.forEach((enemigo,i) => {

      if (enemigo.vida <=0)return;

    
      const zombie = enemigo.model;
    
      // Calcular distancia al jugador
      const distanciaAtack = zombie.position.distanceTo(soldier.position);
      if(distanciaAtack < 22){
        Atack = true;
      }else{
        Atack = false;
      }
      

      

      if (isMoving) {
        
        const target = soldier.position.clone();
        target.y = zombie.position.y;
        zombie.lookAt(target);
        playEnemyAnimation(enemigo, 'Zombie_Walking');
        previousPositionZombie = zombie.position.clone();
        // moveEnemyTowardPlayer(zombie, soldier.position, 120, delta, i);
        const cajaZombie = new THREE.Box3().setFromObject(zombie);
        for (const obj of objetosConColision) {
          const cajaObjeto = new THREE.Box3().setFromObject(obj);
          if (cajaZombie.intersectsBox(cajaObjeto)) {
            colisionDetectadaZ = true;
            break;
          }
        }

        if (colisionDetectadaZ) {
          // Retrocede un poco en la dirección contraria
          
          zombie.position.copy(previousPositionZombie); // muy muy basico solo impide que no atraviese el objeto
          console.log('Zombie colision');
        }

        if(Atack){
          playEnemyAnimation(enemigo, 'Zombie_Attack');
        }
      }else{
        if(Atack && SoldierLife>0){

          if (tiempoActual - enemigo.ultimoAtaque > 3) { // ajustar segundos entre ataque
            zombie.lookAt(soldier.position);
            playEnemyAnimation(enemigo, 'Zombie_Attack');

            if(SoldierLife >0){
              SoldierLife -= 20;
              vidaActual = Math.max(vidaActual - 1, 0);
              actualizarCorazones();
            }

            if(SoldierLife<=0){
              SoldierLife = 0;
              clearInterval(intervaloID);
              FinJuego = true;
              hudMain(FinJuego);
              socket.emit('gameOver', { win: false }); // o false
              document.getElementById("Losser").style.display = "block";
              document.getElementById("LossImage").style.display = "block";
              
            }
            
            enemigo.ultimoAtaque = tiempoActual;
          }
        }else{
          zombie.lookAt(soldier.position);
          playEnemyAnimation(enemigo, 'Zombie_Idle');  
        }

      }
      // Avanzar animación
      enemigo.mixer.update(delta);
    });

  }

  //Emit de la posicion del jugador
if (soldier) {
  socket.emit('updatePosition', {
    id: socket.id,
    x: soldier.position.x,
    y: soldier.position.y,
    z: soldier.position.z,
    qx: soldier.quaternion.x,
    qy: soldier.quaternion.y,
    qz: soldier.quaternion.z,
    qw: soldier.quaternion.w
  });
}

  
  updateProjectiles();
  UpdateInterfaz();
  //actualizarCronometro();

  if(FirstPerson){
  
    updateCameraZoom();
    
  }
  
  renderer.render(scene, camera);
}


animate();
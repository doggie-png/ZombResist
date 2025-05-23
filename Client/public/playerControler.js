export function PlayerMove(){

}

function SetMoveControll(){
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
}
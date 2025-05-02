import * as THREE from '/three.js-master/build/three.module.js';

export function explosion(scene, position){
    const flash = new THREE.Sprite(flashMaterial.clone()); // clone para animación independiente
    flash.position.copy(position);
    flash.scale.set(0.1, 0.1, 1); // empieza pequeño
    scene.add(flash);
  
    let elapsed = 0;
    const duration = 0.5; // segundos
  
    function update(delta) {
      elapsed += delta;
  
      // Animar crecimiento y desvanecimiento
      const progress = elapsed / duration;
      const scale = THREE.MathUtils.lerp(0.1, 2.5, progress);
      const opacity = THREE.MathUtils.lerp(1.0, 0.0, progress);
  
      flash.scale.set(scale, scale, 10);
      flash.material.opacity = opacity;
  
      if (progress >= 1) {
        scene.remove(flash);
        return false;
      }
      return true;
    }
  
    return update;
}

const loader = new THREE.TextureLoader();
const flashTexture = loader.load('./shaders/glow.png'); // textura circular tipo glow

const flashMaterial = new THREE.SpriteMaterial({
  map: flashTexture,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

import * as THREE from '/three.js-master/build/three.module.js';
import { GLTFLoader } from "/three.js-master/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "/three.js-master/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "/three.js-master/examples/jsm/loaders/FBXLoader.js";

export function CargarModelos(Mapa, scena, listacolision){
    switch (Mapa) {
        case "ciudad":
            Ciudad(scena);
            break;
    
        case "militar":
            Militar(scena)
            break;
    
        case "fabrica":
            Fabrica(scena, listacolision);
            break
    }
}

function Ciudad(scene){
    //avionC
    const loaderAvionC = new GLTFLoader();
    loaderAvionC.load('./Level1/ModelosGLB/avionC/ww_plane.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(22,22,22);
      scene.add(model); 
      model.position.set(-1400,30,700);
      model.rotation.z = Math.PI / 1;
    }, undefined, (error) => {
      console.error(error);
    });
  
    const loader2 = new GLTFLoader();
    //avionA
    loader2.load('./Level1/ModelosGLB/avionA.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(22,22,22);
      scene.add(model); 
      model.position.set(-130,0,-250);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    // edificio
    const loaderBuilding = new GLTFLoader();
    const loaderBuilding2 = new GLTFLoader();
    const loaderBuilding3 = new GLTFLoader();
    const loaderBuilding4 = new GLTFLoader();
    const loaderBuilding5 = new GLTFLoader();
    loaderBuilding.load('./Level1/ModelosGLB/abandoned_brick_building.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1,1,1);
      scene.add(model); 
      model.position.set(-700,0,0);
      
    }, undefined, (error) => {
      console.error(error); 
    });
  
    loaderBuilding4.load('./Level1/ModelosGLB/abandoned_brick_building.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1,1,1);
      scene.add(model); 
      model.position.set(350,0,0);
      
    }, undefined, (error) => {
      console.error(error); 
    });
  
    loaderBuilding3.load('./Level1/ModelosGLB/abandoned_brick_building.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1,1,1);
      scene.add(model); 
      model.position.set(-2700,0,0);
      
    }, undefined, (error) => {
      console.error(error); 
    });
  
    loaderBuilding5.load('./Level1/ModelosGLB/abandoned_brick_building.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1,1,1);
      scene.add(model); 
      model.position.set(-2700,0,1500);
      
    }, undefined, (error) => {
      console.error(error); 
    });
    
    loaderBuilding2.load('./Level1/ModelosGLB/abandoned_brick_building.glb', (gltf) => {
      const model2 = gltf.scene;
      model2.scale.set(1,1,1);
      scene.add(model2); 
      model2.position.set(-700,0,1500);
  
    }, undefined, (error) => {
      console.error(error); 
    });
  
    // edificio destruido
    const loaderbuildDestroyed = new GLTFLoader();
    const loaderbuildDestroyed2 = new GLTFLoader();
    const loaderbuildDestroyed3 = new GLTFLoader();
    loaderbuildDestroyed.load('./Level1/ModelosGLB/post_apocalyptic_building.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(20,20,20);
      scene.add(model); 
      model.position.set(-1600,0,0);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    loaderbuildDestroyed2.load('./Level1/ModelosGLB/post_apocalyptic_building.glb', (gltf) => { 
      const model = gltf.scene;
      model.scale.set(20,20,20);
      scene.add(model); 
      model.position.set(-1600,0,1500);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    loaderbuildDestroyed3.load('./Level1/ModelosGLB/post_apocalyptic_building.glb', (gltf) => { 
      const model = gltf.scene;
      model.scale.set(20,20,20);
      scene.add(model); 
      model.position.set(450,0,1500);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    // camion
    const loaderRuinedTruck = new GLTFLoader();
    loaderRuinedTruck.load('./Level1/ModelosGLB/truck_01.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(15,15,15);
      scene.add(model); 
      model.position.set(750,0,700);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    const loaderRuinedTruck2 = new GLTFLoader();
    loaderRuinedTruck2.load('./Level1/ModelosGLB/truck_01.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(15,15,15);
      scene.add(model); 
      model.position.set(-3150,0,800);
    }, undefined, (error) => {
      console.error(error); 
    });
  
    const loaderAmbulance = new GLTFLoader();
    loaderAmbulance.load('./Level3/ModelosGLB/ambulance.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(18,18,18);
      scene.add(model); 
      model.position.set(-600,0,700);
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
      object.scale.set(3,3,9);
      scene.add(object);
      object.position.set(600, 0, 500);
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
    const loaderobj3 = new OBJLoader();
    loaderobj3.load('./Level1/Modelos/Militar-box/militarBox.obj', function(object) {
      
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
  
    
}

function Militar(scene){
  
  //./Level1/ModelosGLB/wooden_watchtower.glb escala 8 nivel de fabrica abandonada
  const loaderCajaMilitar = new OBJLoader();
  let camion;
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

function Fabrica(scene,listacolision){
  
  //./Level1/ModelosGLB/wooden_watchtower.glb escala 8 nivel de fabrica abandonada
  
  const loaderCajaMilitar = new OBJLoader();
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
    listacolision.push(clonedModel);
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
    listacolision.push(clonedModel);
    });

  }, undefined, (error) => {
    console.error('Error al cargar modelo:', error);
  });
  
  // edificio
  //const loaderBuilding = new GLTFLoader();
  const loaderwatherTank = new GLTFLoader();
  const loaderBuilding5 = new GLTFLoader();

  //wather tank
  loaderwatherTank.load('./Level3/ModelosGLB/water_tank.glb', (gltf) => {
    const water = gltf.scene;
    water.scale.set(15,15,15);
    scene.add(water); 
    water.position.set(630,0,400);
    listacolision.push(water);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //warehouse
  loaderwatherTank.load('./Level3/ModelosGLB/warehouse_building.glb', (gltf) => {
    const water = gltf.scene;
    water.scale.set(0.1,0.1,0.1);
    scene.add(water); 
    water.position.set(550,0,0);
    listacolision.push(water);
    
  }, undefined, (error) => {
    console.error(error); 
  });

  //tanque gas
  

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
      listacolision.push(clonedModel);
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
      listacolision.push(clonedModel);
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
    listacolision.push(model);
    
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
      listacolision.push(clonedModel);
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
      listacolision.push(clonedModel);
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
      listacolision.push(clonedModel);
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
    listacolision.push(model);
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
    listacolision.push(model);
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
    listacolision.push(model);
  }, undefined, (error) => {
    console.error(error); 
  });

  
  
}



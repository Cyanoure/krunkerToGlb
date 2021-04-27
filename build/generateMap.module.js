import { OBJLoader } from "https:/threejs.org/examples/jsm/loaders/OBJLoader.js";
function generateSpawn(conf, parent, data) {
  const url = config.modelsUrl + "spawn_0.obj";
  var loader = new OBJLoader();
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {
      object.position.set(conf[0], conf[1]-5, conf[2]);
      object.rotation.set(6.3, 1.5, conf[5]);
      object.scale.set(1,1,1)
      object.castShadow = data;
      object.receiveShadow = data;
      object.children[0].material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(config.textureURL + "spawn_0.png"),
      });
      parent.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

function generatePrefab(conf,id,data,parent) {
  const pre = config.prefabs[id]
  var name = pre.name.toLowerCase()
  const url = config.modelsUrl +name+"_0.obj";
  var loader = new OBJLoader();
  loader.load(
    // resource URL
    url,
    // called when resource is loaded
    function (object) {
      object.position.set(conf.position.x,conf.position.y,conf.position.z)
      object.rotation.set(conf.rotation.x,conf.rotation.y,conf.rotation.z)
      object.scale.set(pre.scale-1,pre.scale-1,pre.scale-1)
      object.castShadow = data
      object.receiveShadow = data;
      object.children[0].material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(config.textureURL +name+ "_0.png"),
      });
      parent.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

function generateTexture(id) {
  let texture = new THREE.TextureLoader().load(
    config.textureURL + config.textures[id].src + ".png"
  );
  texture.wrapS = 1000;
  texture.wrapT = 1000;
  texture.repeat.set(4, 4);
   texture.minFilter = THREE.NearestFilter
                    texture.magFilter = THREE.NearestFilter
  return texture
}

function generateMap(data, conf) {
  let name = data.name;
  let objects = data.objects;
  let spawns = data.spawns;
  let group = new THREE.Group();

  if (spawns) {
    for (var x in spawns) {
      generateSpawn(spawns[x], group, conf.shadows);
    }
  }
  for (var x in objects) {
    let object = objects[x];
    if (!object.i) {
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshLambertMaterial({});
      let mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = conf.shadows;
      mesh.receiveShadow = conf.shadows;

      if (object.t) {
        material.map = generateTexture(object.t);
      } else {
        material.map = generateTexture(0);
      }
      if (object.s) {
        mesh.position.set(object.p[0], object.p[1], object.p[2]);
      }
      if (object.r) {
        mesh.rotation.set(object.r[0], object.r[1], object.r[2]);
      }
      if (object.s) {
        mesh.scale.set(object.s[0], object.s[1], object.s[2]);
      }
      group.add(mesh);
    } else {
      var object3D = new THREE.Object3D();
      if (object.s) {
        object3D.position.set(object.p[0], object.p[1], object.p[2]);
      }
      if (object.r) {
        object3D.rotation.set(object.r[0], object.r[1], object.r[2]);
      }
      if (object.s) {
        object3D.scale.set(object.s[0], object.s[1], object.s[2]);
      }
      generatePrefab(object3D, object.i,conf.shadows,group);
    }
  }

  return group;
}
export {generateMap}

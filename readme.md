## project is not released (yet)
# but is bring worked on atm

### bugs
- positions
- more...
```js
 isProjectReleased = false
```

```js
import * as THREE from "https:/threejs.org/build/three.module.js";
import {GLTFExporter} from "https://threejs.org/examples/jsm/exporters/GLTFExporter.js"
import {generateMap} from "https://hoodgail.github.io/krunkerToGlb/build/generateMap.module.js"

let mapJson = {
  name: "Test map",
  ambient: "#97a0a8",
  light: "#f2f8fc",
  sky: "#dce8ed",
  fog: "#8d9aa0",
  fogD: 2000,
  spawns: [[0, 0, 0, 0, 0, 0]],
  objects: [
    { p: [0, -10, 0], s: [100, 10, 100] },
    { p: [0, 0, -16], s: [12, 12, 12], i: 8 },
    { p: [0, 0, 27], s: [51, 15, 20], i: 7 },
    { p: [25, 0, 0], s: [3, 20, 10], i: 21 },
    { p: [-28, 0, 0], s: [5, 5, 5], i: 36 },
    { p: [-24, 0, -34], s: [65, 109, 54], i: 15 },
    { p: [16, 0, -28], s: [5, 5, 5], i: 34, l: 1 },
  ],
}

// to threejs scene
let map = generateMap(mapJson,{
  shadows:true
})

var exporter = new GLTFExporter();

exporter.parse( map, function ( gltb ) {
	console.log( gltb );
}, options );
```

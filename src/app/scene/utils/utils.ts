import { Vector2, Vector3 } from "three";

export type Bitmap = number[][];

export function generateBitmap(decimals: number[]): Bitmap {
  return decimals.map(x => 
    convertToBinaryWithComplement(x).split('').map(y => parseInt(y)));
}

export function convertToBinaryWithComplement(n: number, complement: number = 0): string {
  return convertToBinary(n).padStart(complement, '0');
}

export function convertToDecimal(binary: string): number {
  return parseInt(binary, 10);
}

export function convertToBinary(n: number): string {
  return ((n) >>> 0).toString(2)
}

export function generate2dCoordinates(bitmap: Bitmap): number[][] {
  const matrix: number[][] = [];
  bitmap.forEach((bitset, x) => 
    bitset.forEach((bit, y) => {
      if (!!bit)
        matrix.push([x, y]);
    })
  );
  return matrix;
};

export function translateMatrix(matrix: number[][], x: number, y: number): number[][] {
  return matrix.map(v => [v[0] += x, v[1] += y])
}


export function getCoordinates(coords: { x: number, y: number }): Vector2 {
  return new Vector2(
    (coords.x / window.innerWidth) * 2 - 1,
    -(coords.y / window.innerHeight) * 2 + 1
  );
}

export function mapCoordsTo2d(coords: THREE.Vector3): THREE.Vector2 {
  return new Vector2(coords.x, coords.y); 
}

export function mapCoordsTo3d(coords: THREE.Vector2): THREE.Vector3 {
  return new Vector3(coords.x, coords.y, 0);
}



// var originPoint = temp.position.clone();
// const chessRaycaster = new THREE.Raycaster();

// chessRaycaster.params = {
//   Line: { threshold: 1 },
//   Points: { threshold: 1 },
// }

// var o = temp.position.clone();
// const moveMouse = new THREE.Vector2(); 

// window.addEventListener('mousemove', event => {
//   moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// });

// // const arrow = new THREE.ArrowHelper(originPoint, originPoint, 10, 0xff0000);

// // scene.add(arrow);

// let arr: THREE.Intersection[] = [];

// function highlightObject() {
//   //arrow.translateOnAxis(o, 100)
//   chessRaycaster.set(temp.position.clone(), temp.position.clone().setY(-30).normalize());
//   //chessRaycaster.setFromCamera(moveMouse, camera);

//   //console.log(chessRaycaster.ray.origin, chessRaycaster.ray.direction);

//   //console.log(chessRaycaster.ray.distanceToPoint(scene.children[4].position) )
//   arr.forEach(o => {
    
//     const object = (o.object as Mesh);
//     if (object.userData.unpointable) return;
//     const objectMaterial = object.material as MeshStandardMaterial;
//     const x = o.object.userData.defaultColor;
   
//     if (objectMaterial.color == x || !x) return;
  
//     objectMaterial.color = x;
//     o.object.userData.defaultColor = null;

//   })

//   //console.log(o, temp.position.clone())
//   globalState.hovered = arr = chessRaycaster.intersectObjects(scene.children);
//   if (arr.length > 0) {
//     //console.log(arr);
//     arr.forEach(x => {
//       const object = (x.object as Mesh);
//       if (object.userData.unpointable) return;
//       const objectMaterial = object.material as MeshStandardMaterial;
      
//       if (Array.isArray(objectMaterial)) return;

//       if (!object.userData.defaultColor) {
//         object.userData.defaultColor = objectMaterial.color.clone();
//       }
//       objectMaterial.color.set(0xffffff);
//       //(x.object as Mesh).
//     })
//   }
// }















// ########
// Object dragging
// ########

// const globalState = {
//   hovered: [] as any,
//   drag: {} as any
// };
// const raycaster = new THREE.Raycaster();


// const clickMouse = new THREE.Vector2();  // create once
// //const moveMouse = new THREE.Vector2();   // create once
// var draggable: THREE.Object3D;

// function intersect(pos: THREE.Vector2) {
//   raycaster.setFromCamera(pos, camera);
//   return raycaster.intersectObjects(scene.children);
// }

// const toRender: Function[] = [];

// window.addEventListener('click', event => {
//   event.preventDefault();

//   if (draggable != null) {
//     console.log(`dropping draggable ${draggable.userData.name}`)

//     let alpha = 0.3;

//     console.log(draggable.position)
//     //const position = draggable.position.clone().setY(0);

//     const target = globalState.hovered[0];

//     if (!!target) {
//       console.log(target)
//       const position = target.object.position.clone().setY(2.5);
//       const elem = draggable;
//       toRender.push(() => elem.position.lerp(position, alpha));
//     };
//     globalState.drag = draggable;
//     draggable = null as any
//     return;
//   }
 // THREE RAYCASTER
//  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//  const found = intersect(clickMouse);
//  if (found.length > 0) {
//    if (found[0].object.userData.draggable) {
//      draggable = found[0].object

//      draggable.position.y = 5
//      toRender.length = 0;
//      console.log(`found draggable ${draggable.userData.name}`)
//    }
//  }
// })


// function dragObject() {
//  if (draggable != null) {
//    const found = intersect(moveMouse);
//    if (found.length > 0) {
//      for (let i = 0; i < found.length; i++) {
//        if (found[i].object.userData.ground)
//          continue
       
//        let target = found[i].point;
//        draggable.position.x = target.x
//        draggable.position.z = target.z
       
//      }
//    }
//  }
// }



// function animate() {
//   dragObject();
//   highlightObject();
//   requestAnimationFrame( animate );
//   toRender.forEach(x => x());
//   controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
//   render();
// }

// function render() {
//   renderer.render( scene, camera );
// }

// animate()

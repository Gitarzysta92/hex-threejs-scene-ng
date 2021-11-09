// ContextMenu.RotateLeft.onClick(event => {
//   event.preventDefault();

//  });


// const temp2 = document.getElementById('rotate-left');

// temp2.addEventListener('click', event => {
//   globalState.drag.rotateY(Math.PI * 0.333333);
// });


// const temp3 = document.getElementById('rotate-right');

// temp3.addEventListener('click', event => {
//   globalState.drag.rotateY(-Math.PI * 0.333333);
// });


// const temp4 = document.getElementById('remove');

// temp4.addEventListener('click', event => {
//   console.log(globalState.drag)
//   //globalState.drag.geometry.dispose();
//   //globalState.drag.material.dispose();

//   scene.remove( globalState.drag );

//   const t = document.getElementById('app');
//   t.remove();
// });


// const temp5 = document.getElementById('confirm');

// temp5.addEventListener('click', event => {
//   const t = document.getElementById('app');
//   t.remove();
// });


// let pos = new THREE.Vector3();
// pos = pos.setFromMatrixPosition(temp.matrixWorld);
// pos.project(camera);

// let widthHalf = 1200 / 2;
// let heightHalf = 700 / 2;

// pos.x = (pos.x * widthHalf) + widthHalf;
// pos.y = - (pos.y * heightHalf) + heightHalf;
// pos.z = 0;


// const temp2 = document.getElementById('app');


// temp2 && (temp2.style.transform = `translate(${Math.floor(pos.x)}px, ${Math.floor(pos.y)}px)`)


// // temp2.style.position = "absolute";
// // temp2.style.left = Math.floor(pos.x)+'px';
// // temp2.style.top = Math.floor(pos.y)+'px';

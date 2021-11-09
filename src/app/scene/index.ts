
import { Euler, Quaternion, Vector3 } from "three";
import { GameView, Instantionable } from './core/game-view';
import { ambientLight, dirLight1, dirLight2, hemisphereLight } from './lights/lights';
import { ObjectFactory } from './objects/objects';
import { HexBoard } from './objects/hex-board';
import { MainLoop } from './core/main-loop';
import { TasksQueue } from './core/tasks-queue';
import { getCoordinates, mapCoordsTo2d } from './utils/utils';
import { Event } from './utils/events';
import { DragManager } from './services/drag-manager';
import { DomInterfaceFactory } from './ui/ui-factory';
import { CointainerObject, GameObject, TokenObject } from './objects/game-object';
import { AnimationManager } from "./services/animation-manager"; 
import { Collidable, ColliderTask } from "./services/collider";
// import { Game } from "./logic/game";
// import { Player } from "./logic/player";
// import { actions } from "./logic/actions";


export const WindowEvent = new Event(window);





// const view = new GameView({ 
//   aspect: innerWidth/innerHeight,
//   cameraPosition: new Vector3(-120, 130,  0)
// });



// WindowEvent.resize(event => view.adjustRendererSize(event));
// document.body.appendChild(view.domElement);







// // ###############
// // Lights
// // ###############
// view.integrate(dirLight1);
// view.integrate(dirLight2);
// view.integrate(hemisphereLight);
// view.integrate(ambientLight);


// // ###############
// // Plane
// // ###############
// const plane = ObjectFactory.createTerrainPlane();
// view.attach(plane);


// // ###############
// // Fields
// // ###############
// const hexboard = new HexBoard();
// hexboard.assign(coords => {
//   const v = new Vector3(coords[0] * 5,0, coords[1] * 9);
//   const field = ObjectFactory.createHexField(v);
//   return view.attach(field);
// });



// const dragManager = new DragManager(view, tasksQueue);
// const animationManager = new AnimationManager(tasksQueue);


// // ###############
// // Chess
// // ###############

// function createToken() {
//   const token = ObjectFactory.createHexToken("sniper.jpg", new Vector3(40, 0 , 30));
//   const tokenColliderTask = new ColliderTask(token, view);

//   //behavior
//   tokenColliderTask.onColision(collisions => {
//     const released = tokenColliderTask.prev.filter(pc => !collisions.some(c => c.object === pc.object));
//     released.forEach(c => {
//       const gameObject = view.gameObjects[c.object.uuid] as unknown as Collidable;
//       if ("release" in gameObject) 
//         gameObject.release();
//     });
//     collisions.forEach(c => {
//       const gameObject = view.gameObjects[c.object.uuid] as unknown as Collidable;
//       if ("collide" in gameObject) 
//         gameObject.collide();
//     });
//   });

//   tasksQueue.enqueue(tokenColliderTask);
//   view.attach(token);

//   // Rotation
//   const temp1 = document.getElementById('rotate-left');
//   temp1.addEventListener('click', async event => {
//     event.preventDefault();
//     const prev = token.coords.clone();
//     await animationManager.transition(token, { y: 5 });

//     //const asd = new Euler().setFromVector3(token.coords);
//     const asd = new Quaternion().setFromAxisAngle(new Vector3(0,1,0), 1.3).multiply(token.mesh.quaternion);
//     console.log(asd);
//     token.mesh.worldToLocal
//     await animationManager.transition(token, prev, asd);
//     const intersection = view.intersect(getCoordinates({ x: event.clientX, y: event.clientY })).filter(i => i.object != dragManager.currentObject)[0];
//   });

//   WindowEvent.onClick(event => {
//     event.preventDefault(); 
  
//     const intersection = view.intersect(getCoordinates({ x: event.clientX, y: event.clientY })).filter(i => i.object != dragManager.currentObject)[0];
  
//     const object = intersection.object;
//     const token = dragManager.currentObject;
  
//     const releasingTokenOnHexField = token != object && "takeBy" in object && object instanceof CointainerObject;
//     const clickingOnToken = object instanceof TokenObject && dragManager.currentObject == null;
  
//     if (releasingTokenOnHexField) {
//       const hexField = object;
//       dragManager.stopDragging();
      
//       const { coords, quat } = hexField.takeBy(token);
//       animationManager.transition(token, coords, quat)
//         .then(() => {
//           const coords2d = mapCoordsTo2d(token.coords);
//           DomInterfaceFactory.createTokenContextMenu(coords2d, token);
//         });
      
//     } else if (clickingOnToken) {
//       animationManager.transition(object, { y: 5 })
//         .then(() => {
//           console.log('asd');
//           dragManager.startDragging(object);
//         });
      
//     } else {
//       dragManager.stopDragging();
//       token?.destroy();
//     }
//   });
// }




// // ###############
// // Game logic
// // ###############

// const players = [
//   new Player(),
//   new Player()
// ]

// const game = new Game(players);
// game.initialize(players);

// game.proceed(game => {
//   return actions.putToken(game.round, token);
// });
// game.revert();
// game.revert();
// game.proceed(actions.putToken, round, token);
// game.proceed(actions.finalize);


// game.startNewRound();




// const startRound = document.getElementById('start-round');
// startRound.addEventListener('click', async event => {
//   event.preventDefault();
//   game.startNewRound();
// });



// // Add token
// const addTokenButton = document.getElementById('add-token');
// addTokenButton.addEventListener('click', async event => {
//   event.preventDefault();
  
//   const cameraCoords = view.getCameraCoords();
//   const token = createToken({
//     id: 1,
//     image: "sniper.jpg",
//     coords: cameraCoords
//   });
//   const asd = new Vector3(40, 5, 30);
  
//   await animationManager.transition(token, asd);



//   // .then(() => {
//   //   console.log('asd');
//   //   dragManager.startDragging(object);
//   // });


  

//   game.proceed(game => {
//     return actions.putToken(game.round, token);
//   });

// });



// mainLoop.init();









// WindowEvent.onClick(event => {
//   event.preventDefault();

//   const intersection = view.intersect(getCoordinates({ x: event.clientX, y: event.clientY })).filter(i => i.object != dragManager.currentObject)[0];

//   const object = intersection.object;
//   const token = dragManager.currentObject;

//   const releasingTokenOnHexField = token != object && "takeBy" in object && object instanceof CointainerObject;
//   const clickingOnToken = object instanceof TokenObject && dragManager.currentObject == null;

//   if (releasingTokenOnHexField) {
//     const hexField = object;
//     dragManager.stopDragging();
    
//     const { coords, quat } = hexField.takeBy(token);
//     animationManager.transition(token, coords, quat)
//       .then(() => {
//         const coords2d = mapCoordsTo2d(token.coords);
//         DomInterfaceFactory.createTokenContextMenu(coords2d, token);
//       });
    
//   } else if (clickingOnToken) {
//     animationManager.transition(object, { y: 5 })
//       .then(() => {
//         console.log('asd');
//         dragManager.startDragging(object);
//       });
    
//   } else {
//     dragManager.stopDragging();
//     token?.destroy();
//   }
// });

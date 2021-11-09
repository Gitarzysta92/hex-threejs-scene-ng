import * as THREE from "three";

export const dirLight2 = new THREE.DirectionalLight( 0x97fff6, 0.8);
dirLight2.position.set(-100, 30, 10);
dirLight2.rotateY(Math.PI * 0.5);
dirLight2.castShadow = true;
dirLight2.receiveShadow = false;



dirLight2.shadow.mapSize.width = 812; // default
dirLight2.shadow.mapSize.height = 812; // default
dirLight2.shadow.camera.near = 10; // default
dirLight2.shadow.camera.far = 200; // default
dirLight2.shadow.radius = 5;

dirLight2.shadow.bias = 0.007;

// dirLight2.shadow.;

dirLight2.shadow.camera.left = -30;
dirLight2.shadow.camera.right = 30;
dirLight2.shadow.camera.top = 35;
dirLight2.shadow.camera.bottom = -30;


// scene.add( dirLight2 );
// const helper2 = new THREE.CameraHelper( dirLight2.shadow.camera );
// scene.add( helper2);





export const dirLight1 = new THREE.DirectionalLight( 0xfbdaa0, 1.2);
dirLight1.position.set(20, 45, 30);
dirLight1.castShadow = true;
dirLight1.receiveShadow = false;



dirLight1.shadow.mapSize.width = 812; // default
dirLight1.shadow.mapSize.height = 812; // default
dirLight1.shadow.camera.near = 10; // default
dirLight1.shadow.camera.far = 170; // default
dirLight1.shadow.radius = 5;

dirLight1.shadow.bias = 0.003;

// dirLight1.shadow.;

dirLight2.shadow.camera.left = -30;
dirLight2.shadow.camera.right = 30;
dirLight2.shadow.camera.top = 35;
dirLight2.shadow.camera.bottom = -30;

const helper = new THREE.CameraHelper( dirLight1.shadow.camera );


export const ambientLight = new THREE.AmbientLight( 0x222222);


const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xa07966;  // brownish orange
const intensity = 0.4;
export const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
import * as THREE from "three";
import { Quaternion, Vector3 } from "three";
import { CointainerObject, PassiveObject, TokenObject } from "./game-object";


export class ObjectFactory {

  static createTerrainPlane() {
    const planeGeometry = new THREE.PlaneGeometry(500, 500, 50, 50)
    planeGeometry.rotateX(-Math.PI * 0.5);

    return new PassiveObject({
      g: planeGeometry,
      m: new THREE.MeshPhongMaterial({
        side: THREE.FrontSide,
        flatShading: true,
        //vertexColors: true,
        color: 0xa07966
      }),
      o: {
        receiveShadow: true 
      }
    });
  }

  static createHexField(coords: Vector3) {
    const cylinder = new THREE.CylinderBufferGeometry(5, 5, 5, 6);
    //cylinder.rotateY(Math.PI * 1);
//     cylinder.applyQuaternion(new Quaternion(
// 0,0, 0,0.5
//     ));

    return new CointainerObject({
      o: { 
        coords, 
        castShadow: true, 
        receiveShadow: true 
      },
      g: cylinder,
      m: new THREE.MeshStandardMaterial({
        color: 0x705e54,
        roughness: 0.65,
        metalness: 0.15,
        aoMapIntensity: 1,
      })
    });
  }

  static createHexToken(img: string = '', coords: Vector3, quaternion: Quaternion, auxId?: any) {

    const topMaterial = new THREE.MeshStandardMaterial({
      color: 0xb3cbef ,
      aoMapIntensity: 1,
      map: new THREE.TextureLoader().load(img)
    });
    const material = new THREE.MeshBasicMaterial( { color: 0x141414, aoMapIntensity: 1 } );

    let chess = new THREE.CylinderBufferGeometry(5, 5, 0.7, 6);
    //chess.rotateY(Math.PI * 0.5);
    // order to add materials: x+,x-,y+,y-,z+,z-

    if (quaternion) {
      chess.applyQuaternion(quaternion);
    }

  
    return new TokenObject({
      o: { 
        coords, 
        castShadow: true, 
        receiveShadow: true,
      },
      g: chess,
      m: [material, topMaterial, material, material],
      auxId
    });

    // const chessRaycaster = new THREE.Raycaster();

    // chessRaycaster.params = {
    //   Line: { threshold: 1 },
    //   Points: { threshold: 1 },
    // }

    // chessRaycaster.set(temp.position.clone(), temp.position.clone().setY(-30).normalize());

  };
  
}


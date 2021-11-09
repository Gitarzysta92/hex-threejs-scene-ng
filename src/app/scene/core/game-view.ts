import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Intersection, Light, Mesh, Object3D, Quaternion, Scene, Vector2, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mapCoordsTo3d } from "../utils/utils";


export type InstantionableId = string

export interface Instantionable {
  id: InstantionableId;
  coords: Vector3;
  quaternion: Quaternion;
  mesh: Mesh;
  init: () => THREE.Object3D;
  onDestroy: (onDestroy: (x: Instantionable) => void) => void;
}


export interface GameViewCfg {
  domElement: HTMLElement;
  aspect: number;
  cameraPosition: Vector3;
}

// Manage canvas size in relation to user viewport
// Responsible for encapsulating basic settings related to particular scene
// Abstracts creation of THREEJS scene
// Indirect container for gameObjects
@Injectable({
  providedIn: 'root',
})
export class GameView {

  public gameObjects!: { [key: string]: Instantionable }
  private _raycaster!: THREE.Raycaster;

  public get domElement() { return this._renderer?.domElement }
  public get scene() { return this._scene }
  public get camera() { return this._camera }

  private _scene!: Scene;
  private _renderer!: THREE.WebGLRenderer;
  private _camera!: THREE.PerspectiveCamera;
  private _controls!: OrbitControls;


  constructor() { }

  public initialize(cfg: GameViewCfg) {
    this.gameObjects = {};

    this._scene = new Scene();
    this._scene.background = new THREE.Color( 0xa07966 );
		//this._scene.fog = new THREE.FogExp2( 0xa07966, 0.002 );

    const axesHelper = new THREE.AxesHelper( 100 );
    this._scene.add( axesHelper );


    this._renderer = new THREE.WebGLRenderer({ antialias: true, canvas: cfg.domElement });
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFShadowMap;
    this._renderer.setSize(innerWidth, innerHeight);

    this._renderer.setPixelRatio(devicePixelRatio);

    this._camera = new THREE.PerspectiveCamera(20, cfg.aspect, 0.1, 1000);
    const { x, y, z } = cfg.cameraPosition;
    this._camera.position.set(x, y, z);
    this._camera.position.z = 50
    this._controls = new OrbitControls(this._camera, cfg.domElement);

    this._controls.maxPolarAngle = Math.PI / 3;
    this._controls.minPolarAngle = Math.PI / 6;
    // controls.maxAzimuthAngle = 0;
    // controls.minAzimuthAngle = 0;

    // controls.maxPolarAngle = Math.PI * 0.7;
    // 

    //controls.maxDistance = 100;

    this._controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this._controls.dampingFactor = 0.05;

    this._controls.screenSpacePanning = false;

    this._raycaster = new THREE.Raycaster();

    this._raycaster.params = {
      Line: { threshold: 1 },
      Points: { threshold: 1 },
    }
  }



  public adjustRendererSize(event: UIEvent) {
    console.log(event);
  }

  public attach<T extends Instantionable>(object: T): InstantionableId {
    const mesh = object.init();
    this.gameObjects[object.id] = object
    this._scene.add(mesh);

    object.onDestroy(o => {
      this._scene.remove(mesh);
      delete this.gameObjects[object.id];
      this._renderer.renderLists.dispose();
    });

    return object.id;
  }

  public integrate(light: Light): void {
    this._scene.add(light);
  }

  public render() {
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }

  public intersect(to: Vector2): Intersection[];
  public intersect(to: Vector3): Intersection[];
  public intersect(to: Vector3, from: Vector3): Intersection[];
  public intersect(to: Vector2 | Vector3, from: Vector3 = null): Intersection[] {
    if (from && to instanceof Vector3) {
      this._raycaster.set(from, to)
    } else {
      this._raycaster.setFromCamera(to, this._camera);
    }
    return this._raycaster.intersectObjects(this._scene.children).map(c => {
      c.object = this.gameObjects[c.object.uuid] as unknown as Object3D;
      return c;
    });   
  }

  public getObjectAt<T extends Instantionable>(worldCoords: THREE.Vector3, asd: any): T;
  public getObjectAt<T extends Instantionable>(screenCoors: THREE.Vector2): T;
  public getObjectAt<T extends Instantionable>(coords: THREE.Vector2 | THREE.Vector3): T {
    if (!coords) return;
    if (coords instanceof Vector2) {
      const worldCoords = mapCoordsTo3d(coords);
      return this._getObjectByWorldCoords(worldCoords) as T;
    } else {
      return this._getObjectByWorldCoords(coords) as T;
    }
  }

  private _getObjectByWorldCoords(coords: THREE.Vector3) {
    return Object.values(this.gameObjects).find(o => o.coords.equals(coords));
  }

}
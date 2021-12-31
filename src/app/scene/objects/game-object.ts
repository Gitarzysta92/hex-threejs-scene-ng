import { BufferGeometry, Material, Mesh, MeshStandardMaterial, Quaternion, Vector3 } from "three";
import { Instantionable } from "../core/game-view";
import { Draggable } from "../services/drag-manager";
import { Animatable } from "../services/animation-manager";
import { Collidable } from "../services/collider";

export type GameObjectOptions  = { [key: string]: any };

export class GameObject implements Instantionable {
  geometry: BufferGeometry;
  material: Material | Material[];
  protected _mesh: Mesh<BufferGeometry, Material | Material[]>;
  public initialCoords: Vector3;


  private _onDestroy: ((x: this) => void)[]
  private _castShadow: boolean = false;
  private _receiveShadow: boolean = false;
  auxId: any;

  public get id() { return this._mesh?.uuid }
  public get coords() { return this._mesh?.position }
  public get mesh() { return this._mesh };
  public get quaternion() { return this._mesh.quaternion }
  //public get pointCoords() { return this._mesh. }

  constructor(cfg: { 
    o?: GameObjectOptions, 
    g: BufferGeometry, 
    m: Material | Material[],
    auxId?: any
  }) {
    this.geometry = cfg.g;
    this.material = cfg.m;
    this.initialCoords = cfg.o?.coords;
    this.auxId = cfg.auxId;

    this._onDestroy = [];
    this._castShadow = cfg.o?.castShadow;
    this._receiveShadow = cfg.o?.receiveShadow;
    
  }

  public init(): Mesh {
    if (!!this._mesh)
      return this._mesh;

    this._mesh = new Mesh(this.geometry, this.material);
    
    if (this.initialCoords) {
      this._mesh.translateX(this.initialCoords.x);
      this._mesh.translateY(this.initialCoords.y);
      this._mesh.translateZ(this.initialCoords.z);      
    }

    this._mesh.castShadow = this._castShadow;
    this._mesh.receiveShadow = this._receiveShadow;


    return this._mesh;
  }

  public onDestroy(cb: (x: this) => void): void {
    this._onDestroy.push(cb);
  }

  public destroy(): void {
    this.geometry.dispose();
    if (Array.isArray(this.material)) {
      this.material.forEach(m => m.dispose());
    } else {
      this.material.dispose();
    }
    this._onDestroy.forEach(cb => cb(this));
  }
};


export class PassiveObject extends GameObject {
  constructor(...args: ConstructorParameters<typeof GameObject>) {
    super(...args);
  }

  public init(): Mesh {
    const mesh = super.init();
    return mesh;   
  }
}

export class CointainerObject extends GameObject implements Collidable {
  private _initialColor: any;

  constructor( 
    ...args: ConstructorParameters<typeof GameObject>
  ) {
    super(...args);
  }

  public init(): Mesh {
    const mesh = super.init();

    const object = this.mesh
    const objectMaterial = object.material as MeshStandardMaterial;
    this._initialColor = objectMaterial.color.clone();
    return mesh;   
  }

  public takeBy(currentObj: TokenObject) {
    currentObj.takesField = this.id;

    const temp = this.coords.clone();
    temp.y = 2.5;
    return {
      coords: temp,
      quat: currentObj.mesh.quaternion.clone()
    }
  }

  public collide() {
    this._highlight();
  }

  public release() {
    const object = this.mesh
    const objectMaterial = object.material as MeshStandardMaterial;
    objectMaterial.color.set(this._initialColor);
  }

  private _highlight() {
    const object = this.mesh
    const objectMaterial = object.material as MeshStandardMaterial;
    objectMaterial.color.set(0xffffff);
  }

  collided() {
    
  }

}



export class TokenObject extends GameObject implements Draggable, Animatable {

  takesField!: string;

  public get mesh() { return this._mesh };

  constructor( 
    ...args: ConstructorParameters<typeof GameObject>
  ) {
    super(...args);
  }

  public init(): Mesh {
    const mesh = super.init();
    return mesh;   
  }

  public setCoords(coords: Vector3): void {
    this._mesh.position.x = coords.x;
    this._mesh.position.y = coords.y;
    this._mesh.position.z = coords.z;
  }
}
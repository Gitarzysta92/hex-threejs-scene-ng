import { Intersection, Object3D, Raycaster } from "three";
import { GameObject } from "../objects/game-object";

export class RaycasterManager {
  objects: GameObject[];
  raycaster: Raycaster;

  constructor(objects: GameObject[]) {
    this.objects = objects;
    this.raycaster = new Raycaster();
  }

  public intersect(): Intersection[] {
    return this.raycaster.intersectObjects(this.objects.map(o => o.mesh)).map(c => {
      c.object = this.objects[c.object.id] as unknown as Object3D;
      return c;
    });   
  }
}
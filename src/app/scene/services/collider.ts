import { Injectable } from "@angular/core";
import { Intersection, Mesh, PlaneGeometry, Raycaster } from "three";
import { GameView } from "../core/game-view";
import { ContinousTask, TasksQueue } from "../core/tasks-queue";
import { GameObject, TokenObject } from "../objects/game-object";


export interface Collidable {
  collide: () => void;
  release: () => void;
}


@Injectable({
  providedIn: 'root',
})
export class CollisionsManager {
  
  private _registeredColliders: { [key: string]: ColliderTask<any> } = {}

  constructor(
    private _view: GameView,
    private _tasksQueue: TasksQueue
  ) { }

  handle<T extends GameObject>(token: T, cb: (collider: ColliderTask<T>, collisions: Intersection[]) => void): void {
    this._registeredColliders[token.id] = new ColliderTask(token, this._view);
    this._registeredColliders[token.id].onColision(i => cb(this._registeredColliders[token.id], i));
    this._tasksQueue.enqueue(this._registeredColliders[token.id]);
  }

  stop<T extends GameObject>(token: T): void {
    this._registeredColliders[token.id].continue = false;
    delete this._registeredColliders[token.id];
  }

}


export class ColliderTask<T extends GameObject> implements ContinousTask {
  
  public object: T;
  public continue: boolean = true;
  public prev: Intersection[];

  private cbs: Function[];

  private raycaster: Raycaster;
  sceneObjects: GameObject[];
  private _view: GameView;

  

  constructor(
    sourceObject: T,
    view: GameView,
    //sceneObjects: GameObject[]
  ) {
    this.object = sourceObject;
    this._view = view;

    this.cbs = [];
    this.prev = []
    this.raycaster = new Raycaster();
    this.raycaster.params = {
      Line: { threshold: 1 },
      Points: { threshold: 1 },
    };

    this.object.onDestroy(x => {
      this.continue = false;
    })

  }

  public onColision(arg: (i: Intersection[]) => void): void {
    this.cbs.push(arg)
  }

  public perform(): void {
    if (!this.object)
      this.finish();
    if (!this.continue)
      return;

    const coords = this.object.coords.clone();

    const children = this._view.scene.children;

    this.raycaster.set(coords, coords.clone().setY(-30).normalize());
    const result = this.raycaster.intersectObjects(children)
      .filter(r => !((r as any).object.geometry instanceof PlaneGeometry));
    
    this.cbs.forEach(cb => cb(result));

    // here should be stored weak references to game objects.
    this.prev = result;
  }


  public finish(): void {
    this.continue = false;
  }

}
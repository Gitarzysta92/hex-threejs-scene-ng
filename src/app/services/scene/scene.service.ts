import { Injectable } from "@angular/core";
import { fromEvent, Observable, Subject } from "rxjs";
import { publishBehavior, takeUntil, map } from "rxjs/operators";
import { GameView } from "src/app/scene/core/game-view";
import { MainLoop } from "src/app/scene/core/main-loop";
import { TasksQueue } from "src/app/scene/core/tasks-queue";
import { dirLight1, dirLight2, hemisphereLight, ambientLight } from "src/app/scene/lights/lights";
import { TokenObject, PassiveObject, CointainerObject } from "src/app/scene/objects/game-object";
import { HexBoard } from "src/app/scene/objects/hex-board";
import { ObjectFactory } from "src/app/scene/objects/objects";
import { AnimationManager } from "src/app/scene/services/animation-manager";
import { ColliderTask, Collidable } from "src/app/scene/services/collider";
import { DragManager } from "src/app/scene/services/drag-manager";
import { Vector3, Quaternion, Vector2, Intersection } from "three";

export type Coords = { [key: string]: number };


@Injectable({
  providedIn: 'root',
})
export class SceneService {

  mousemove$: any;
  
  constructor(
    public view: GameView,
    public tasksQueue: TasksQueue,
    public animationManager: AnimationManager,
    public dragManager: DragManager,
    public hexboard: HexBoard
  ) { }


  public createScene(nativeElement: HTMLElement): GameView {
    this.view.initialize({
      domElement: nativeElement, 
      aspect: innerWidth/innerHeight,
      cameraPosition: new Vector3(-120, 130,  0)
    });

    this.mousemove$ = publishBehavior<MouseEvent | Vector3>(null)(fromEvent<MouseEvent>(window, 'mousemove'));
    this.mousemove$.connect();

    const mainLoop = new MainLoop(window);
    mainLoop.onTick(() => this.tasksQueue.perform());
    mainLoop.onTick(() => this.view.render());


    // ###############
    // Lights
    // ###############
    this.view.integrate(dirLight1);
    this.view.integrate(dirLight2);
    this.view.integrate(hemisphereLight);
    this.view.integrate(ambientLight);

    // ###############
    // Plane
    // ###############
    const plane = ObjectFactory.createTerrainPlane();
    this.view.attach(plane);


    // ###############
    // Fields
    // ###############

    this.hexboard.assign(coords => {
      const v = new Vector3(coords[0] * 5,0, coords[1] * 9);
      const field = ObjectFactory.createHexField(v);
      return this.view?.attach(field);
    });

    mainLoop.init();

    //this.createToken("assets/img/sniper.jpg");

    return this.view;
  }

  public async createToken(img: string, takenFieldCallback?: (t: TokenObject) => Observable<any>) {
    const camera = this.view['_camera'];

    const ddd = new Vector3()
    camera.getWorldPosition(ddd)
    var forward = new Vector3(0, 1, 0);
    var right = ddd.clone().cross(forward).normalize();
    const d = new Quaternion().setFromAxisAngle(right, -0.85);
    const g = new Quaternion().setFromAxisAngle(new Vector3(0,1,0).normalize(), 3.55)
    let asd = camera.position.clone();
    asd.multiplyScalar(0.5)

    const token = ObjectFactory.createHexToken(img, asd, g);

    this.view.attach(token);
    token.mesh.applyQuaternion(d);

    
    const gg = new Quaternion().setFromAxisAngle(new Vector3(0,3,0).normalize(),-0.4)
    const h = new Quaternion().setFromAxisAngle(right, 0.02);
    const xx = gg.multiply(h);


    const l = new Vector3(0,5,0);
    const destroy$ = new Subject();
    const v = new Vector2();

    const mousemove$ = this.mousemove$  
      .pipe(takeUntil(destroy$))
      .pipe(map((x: MouseEvent) => {
        this._mapToNormalized2dCoords(x, v);
        const found = this.view.intersect(v).filter(x => x.object instanceof PassiveObject)[0];

        l.setX(found?.point?.x || l.x);
        l.setZ(found?.point?.z || l.z);
        return l;
      }));

    await this.animationManager.transition(token, mousemove$, xx);
    destroy$.next();



    const tokenColliderTask = new ColliderTask(token, this.view);
    tokenColliderTask.onColision(collisions => {

      const released = tokenColliderTask.prev.filter(pc => !collisions.some(c => c.object === pc.object));
      released.forEach(c => {
        const gameObject = this.view.gameObjects[c.object.uuid] as unknown as Collidable;
        if (gameObject != null && "release" in gameObject) 
          gameObject.release();
      });

      collisions.forEach(c => {
        const gameObject = this.view.gameObjects[c.object.uuid] as unknown as Collidable;
        if (gameObject != null && "collide" in gameObject) 
          gameObject.collide();
      });

    });
    this.tasksQueue.enqueue(tokenColliderTask);
    
    this.dragManager.startDragging(token);
    // this.dragManager.onDraggingStopped(() => {
    //   tokenColliderTask.finish();
    // });

    const destroy$2 = new Subject();
    fromEvent<MouseEvent>(window, 'click')
      .pipe(takeUntil(destroy$2))
      .subscribe(async e => {
        const v = new Vector2();
        this._mapToNormalized2dCoords(e, v);
        const field = this.view.intersect(v).filter(x => x.object instanceof CointainerObject)[0]?.object as unknown as CointainerObject;
        if (field) {
          const slot = field.takeBy(token);
          this.dragManager.stopDragging();
          await this.animationManager.transition(token, slot.coords, slot.quat);
          takenFieldCallback && takenFieldCallback(token);
        
        } else {
          this.removeToken(token);
        }
        destroy$2.next();

        // fromEvent<MouseEvent>(window, 'click')
        //   .pipe(takeUntil(destroy$2))
        //   .subscribe(e => {
        //     const v = new Vector2();
        //     this._mapToNormalized2dCoords(e, v);
        //     const token2 = this.view.intersect(v).filter(x => x.object as unknown as TokenObject === token)[0]?.object;
        //     if (!token2)
        //       return;

          

        //   });
      });
  }

  public getField(_targetFieldId: number) {
    throw new Error("Method not implemented.");
  }
  public getTile(_tileId: string) {
    throw new Error("Method not implemented.");
  }

  public getTargetedElements(pointerCords: Coords): Intersection[] {
    return this.view.intersect(new Vector2(pointerCords.x, pointerCords.y))
  }


  public removeToken(token: TokenObject) {
    token.destroy();
  }


  public async attachTileToField(token: any, hexField: any): Promise<void> {
    this.dragManager.stopDragging();
    
    const { coords, quat } = hexField.takeBy(token);
    await this.animationManager.transition(token, coords, quat)
    //return mapCoordsTo2d(token.coords);
  }

  public async detachTileFromField(token: any, hexField: any): Promise<void> {
    
  }


  public async rotateToken(token: any) {
    const prev = token.coords.clone();
    await this.animationManager.transition(token, { y: 5 });

    //const asd = new Euler().setFromVector3(token.coords);
    const asd = new Quaternion().setFromAxisAngle(new Vector3(0,1,0), 1.3).multiply(token.mesh.quaternion);
    token.mesh.worldToLocal
    await this.animationManager.transition(token, prev, asd);
    //const intersection = view.intersect(getCoordinates({ x: event.clientX, y: event.clientY })).filter(i => i.object != dragManager.currentObject)[0];
  }


  private _mapToNormalized2dCoords(e: MouseEvent, target: Vector2): void {
    target.set(
      ((e.clientX / window.innerWidth) * 2 - 1),
      (-(e.clientY / window.innerHeight) * 2 + 1)
    );
  }


}



    //Arrow helper ------------------------
    // const length = 10;

    // const hex1 = 0xff0000;
    // const arrowHelper1 = new ArrowHelper( ddd.normalize(), asd , length, hex1 );
    // this.view.scene.add( arrowHelper1 );


    // const hex2 = 0xffff00;
    // const arrowHelper2 = new ArrowHelper( right, asd , length, hex2 );
    // this.view.scene.add( arrowHelper2 );
    //-------------------
    //const tq = this.hexboard.getCenterElement();
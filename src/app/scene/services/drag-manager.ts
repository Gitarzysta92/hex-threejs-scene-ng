import { Vector2, Vector3 } from "three";
import { PassiveObject, TokenObject } from "../objects/game-object";
import { GameView } from "../core/game-view";
import { ContinousTask, TasksQueue } from "../core/tasks-queue";
import { Injectable } from "@angular/core";
import { ConnectableObservable, fromEvent, Observable, Subject } from "rxjs";
import { map, publish, publishBehavior, share, shareReplay, takeUntil } from "rxjs/operators";

export interface Draggable {
  setCoords: (coords: Vector3) => void;
  coords: Vector3;
}

@Injectable({
  providedIn: 'root',
})
export class DragManager {
  
  public position: Subject<Vector3> = new Subject()
  mousemove$: ConnectableObservable<MouseEvent>;
  
  public get currentObject() { return this._dragTask?.object }

  private _dragTask: DragTask<any>;

  constructor(
    private _view: GameView,
    private _tasksQueue: TasksQueue
  ) {

    this.mousemove$ = publishBehavior<MouseEvent>(null)(fromEvent<MouseEvent>(window, 'mousemove'));
    this.mousemove$.connect();
  }

  startDragging<T extends Draggable>(object: T): void {

    if (!!this._dragTask) return;

    this._dragTask = new DragTask<T>(
      object, 
      (x: number, y: number) => {
        const v = new Vector2(x, y);
        const found = this._view.intersect(v).filter(x => x.object instanceof PassiveObject);
        if (found.length === 0) return;
        //console.log(found[0].point)
        this.position.next(found[0].point);
        return found[0].point;
      },
      this.mousemove$
    );

    this._tasksQueue.enqueue(this._dragTask);
  }

  stopDragging() {
    this._dragTask?.finish();
    this._dragTask = null;
  }

  onDraggingStopped(arg0: () => void) {
    throw new Error('Method not implemented.');
  }

}


class DragTask<T extends Draggable> implements ContinousTask {

  public continue: boolean = true;
  public object: T;

  private x: number;
  private y: number;

  private _coordsProvider: (x: number, y: number) => Vector3 | false;

  private destroy$ = new Subject();

  constructor(
    object: T, 
    coordsProvider: (x: number, y: number) => Vector3 | false,
    mousemove$: Observable<MouseEvent>
  ) {
    this.object = object;
    this._coordsProvider = coordsProvider;

    mousemove$
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        this.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
  }


  public perform = () => {
   // console.log(this.x, this.y)
    const coords = this._coordsProvider(this.x, this.y);
    if (!coords) return;
    coords.y = this.object.coords.y;
    this.object.setCoords(coords)
  }


  public finish(): void {
    this.continue = false;
    this.destroy$.next();
  }
}
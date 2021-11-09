import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Mesh, Quaternion, Vector3 } from "three";
import { ContinousTask, TasksQueue } from "../core/tasks-queue"


@Injectable({
  providedIn: 'root',
})
export class AnimationManager {

  constructor(
    private readonly _tasksQueue: TasksQueue
  ) { }

  transition(token: any, targetCoords: any, targetQuaternion?: Quaternion): Promise<void> {
    const animationTask = new AnimationTask(token, targetCoords, targetQuaternion);
    this._tasksQueue.enqueue(animationTask);
    return new Promise((resolve, reject) => {
      animationTask.onFinish(() => {
        resolve();
      });
    })
  }

  rotate(token: any): Promise<void> {
    const animationTask = new RotateAnimationTask(token, token.coords)
    this._tasksQueue.enqueue(animationTask);
    return new Promise((resolve, reject) => {
      animationTask.onFinish(() => {
        resolve();
      });
    })
  }

}

export interface Animatable {
  mesh: Mesh;
}


class AnimationTask<T extends Animatable> implements ContinousTask {

  public continue: boolean = true;
  public mesh: Mesh;

  targetCoords: Vector3;
  targetQuaternion?: Quaternion;

  cb: Function[]
  
  private readonly _destroy: Subject<void> = new Subject();

  constructor(object: T, targetCoords: Vector3, targetQuaternion?: Quaternion) {
    this.mesh = object.mesh;

    if (targetCoords instanceof Vector3) {
      this.targetCoords = Object.assign(this.mesh.position.clone(), targetCoords);
    } else {
      this.targetCoords = new Vector3();
      (targetCoords as Observable<Vector3>)
        .pipe(takeUntil(this._destroy))
        .subscribe(value => {
          this.targetCoords.setX(value.x);
          this.targetCoords.setY(value.y);
          this.targetCoords.setZ(value.z);
        });
    }

    !!targetQuaternion && (this.targetQuaternion = targetQuaternion.clone());
    this.cb = [];
  }

  public perform = () => {
    if (this.mesh.position.clone().round().equals(this.targetCoords.clone().round())) {
      const { x, y, z } = this.targetCoords.round();

      this.mesh.position.set(x, y, z);
      return this.finish();
    }
    this.mesh.position.lerp(this.targetCoords, 0.2);
    !!this.targetQuaternion && this.mesh.quaternion.slerp(this.targetQuaternion, 0.2);
  }

  public onFinish(o: any) {
    this.cb.push(o);
  }


  public finish(): void {
    this._destroy.next();
    this.continue = false;
    this.cb.forEach(c => c());
  }
}

class RotateAnimationTask<T extends Animatable> extends AnimationTask<T> {
  public perform = () => {
    if (this.mesh.position.clone().round().equals(this.targetCoords.round())) {
      const { x, y, z } = this.targetCoords.round()
      this.mesh.position.set(x, y, z);
      return this.finish();
    }
    this.mesh.position.lerp(this.targetCoords, 0.2);
    !!this.targetQuaternion && this.mesh.quaternion.slerp(this.targetQuaternion, 0.2);
  }
} 
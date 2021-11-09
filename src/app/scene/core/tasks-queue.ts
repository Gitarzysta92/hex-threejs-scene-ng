import { Injectable } from "@angular/core";

export interface BasicTask {
  perform: Function
}

export interface ContinousTask extends BasicTask {
  continue: boolean;
}

export type Task = ContinousTask | BasicTask;

@Injectable({
  providedIn: 'root',
})
export class TasksQueue {

  private _queue: Task[];

  constructor() {
    this._queue = [];
  }

  public enqueue(task: Task): void  {
    this._queue.push(task);
  }
  public perform(): void {
    
    if (this._queue.length === 0) return;
    const task = this._queue.shift();
    //console.log(task )
    task.perform();

    if (task.hasOwnProperty("continue") && (task as ContinousTask).continue) {
      this.enqueue(task);
    }
  }
  
}
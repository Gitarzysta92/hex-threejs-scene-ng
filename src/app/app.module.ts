import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SceneComponent } from './components/scene/scene.component';
import { ControlsComponent } from './components/controls/controls.component';
import { GameView } from './scene/core/game-view';
import { AnimationManager } from './scene/services/animation-manager';
import { TasksQueue } from './scene/core/tasks-queue';
import { DragManager } from './scene/services/drag-manager';
import { HexBoard } from './scene/objects/hex-board';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    HexBoard
    // GameView,
    // DragManager,
    // AnimationManager,
    // { provide: TasksQueue, useFactory: (() => {
    //   const queue = new TasksQueue();
    //   return () => queue;
    // })() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

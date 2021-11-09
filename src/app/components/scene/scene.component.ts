import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { GameView } from 'src/app/scene/core/game-view';
import { AnimationManager } from 'src/app/scene/services/animation-manager';
import { ColliderTask } from 'src/app/scene/services/collider';
import { SceneService } from 'src/app/services/scene.service';
import { Intersection, Vector3 } from 'three';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  @Output() onClick: EventEmitter<Intersection> = new EventEmitter();

  @ViewChild('canvas') _canvas: ElementRef | undefined;
  scene: any;

  constructor(
    private readonly _changeDetector: ChangeDetectorRef,
    private readonly _sceneService: SceneService,
    private readonly _renderer2: Renderer2
  ) {
    //this._changeDetector.detach();
  }

  ngOnInit(): void {
    // console.log(this._canvas)
    // this._sceneService.createScene(this._canvas?.nativeElement)    
  }
  ngAfterViewInit() {
    this._sceneService.createScene(this._canvas?.nativeElement);

  } 

  public intersect(event: any) {
    const result = this._sceneService.view.intersect(event.coords);
    if (result.length > 0)
      return;
    
    this._sceneService.dragManager.stopDragging();
  }
}

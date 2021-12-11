import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';
import { SceneService } from 'src/app/services/scene/scene.service';
import { Intersection } from 'three';

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
    private readonly _command: CommandsFactory,
    private readonly _commandBus: CommandBusService,
    private readonly _sceneService: SceneService
  ) { }

  ngOnInit(): void {
    this._sceneService.createScene(this._canvas?.nativeElement)    
  }

  ngAfterViewInit() {
    //this._sceneService.createScene(this._canvas?.nativeElement);
  } 

  public intersect(event: MouseEvent) {
    const command = this._command.makeTileAction({ x: event.x, y: event.y });
    this._commandBus.dispatch(command);
  }
}

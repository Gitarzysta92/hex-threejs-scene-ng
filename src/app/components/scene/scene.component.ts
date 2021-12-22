import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';
import { SceneService } from 'src/app/services/scene/scene.service';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {
  @ViewChild('canvas') _canvas: ElementRef | undefined;
  scene: any;

  constructor(
    private readonly _command: CommandsFactory,
    private readonly _commandBus: CommandBusService,
    private readonly _sceneService: SceneService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._sceneService.createScene(this._canvas?.nativeElement);
  } 

  public intersect(event: MouseEvent) {
    const command = this._command.makeTileAction({ x: event.x, y: event.y });
    this._commandBus.dispatch(command);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Intersection } from 'three';
import { CommandsFactory } from './commands/commands-factory';
import { CommandBusService } from './lib/command-bus/command-bus.service';
import { CommandsStackService } from './lib/commands-stack/commands-stack.service';
import { StateMachineService } from './lib/state-machine/state-machine.service';
import { SceneService } from './services/scene/scene.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'hex-threejs-scene-ng';

  constructor(
    private readonly _commandBusService: CommandBusService,
    private readonly _stateMachine: StateMachineService,
    private readonly _commandsStack: CommandsStackService,
    private readonly _command: CommandsFactory
  ) { }

  ngOnInit() {
    this._commandBusService.useFilter(this._stateMachine);
    this._commandBusService.useHandler(this._commandsStack);
  }

  public attachTokenToField(intersection: Intersection): void {
    const command = this._command.assignToken();
    this._commandBusService.dispatch(command);
  }
}


// const field = intersection.distance;

//     const token = this._sceneService.dragManager.currentObject;
//     if (!!field) {
//       this._sceneService.attachTokenToField(token, field);
//     } 






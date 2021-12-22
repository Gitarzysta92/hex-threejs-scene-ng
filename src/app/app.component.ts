import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Intersection } from 'three';
import { CommandsFactory } from './commands/commands-factory';
import { BaseCommand } from './lib/command-bus/base-command';
import { CommandBusService, DefaultHandler } from './lib/command-bus/command-bus.service';
import { CommandsStackService, RevertableCommand } from './lib/commands-stack/commands-stack.service';
import { StateTransition } from './lib/state-machine/state';
import { LoggerService } from './services/logger/logger.service';
import { StateTransitionValidatorService } from './services/state-transition-validator/state-transition-validator.service';
import { RoundState } from './state/round-state';


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
    private readonly _commandsStack: CommandsStackService,
    private readonly _defaultHandler: DefaultHandler,
    private readonly _command: CommandsFactory,
    private readonly _stateTransitionService: StateTransitionValidatorService,
    private readonly _loggerService: LoggerService
  ) { }

  ngOnInit() {
    this._commandBusService.useMapper(this._loggerService)
    this._commandBusService.useFilter<StateTransition<RoundState>>(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);
  }
}


// const field = intersection.distance;

//     const token = this._sceneService.dragManager.currentObject;
//     if (!!field) {
//       this._sceneService.attachTokenToField(token, field);
//     } 






import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { CommandsFactory } from './commands/commands-factory';
import { StartGame } from './commands/state-transitions/game/start-game.command';
import { FinishRound } from './commands/state-transitions/round/finish-round.command';
import { BaseCommand } from './lib/command-bus/base-command';
import { CommandBusService, DefaultHandler } from './lib/command-bus/command-bus.service';
import { CommandsStackService, RevertableCommand } from './lib/commands-stack/commands-stack.service';
import { GameLoopAutoDispatcherService} from './services/game-loop-auto-dispatcher/game-loop-auto-dispatcher.service';
import { LoggerService } from './services/logger/logger.service';
import { StateTransitionValidatorService } from './services/state-transition-validator/state-transition-validator.service';


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
    private readonly _stateTransitionService: StateTransitionValidatorService,
    private readonly _loggerService: LoggerService,
    private readonly _gameLoopAutoDispatcher: GameLoopAutoDispatcherService,
    private readonly _stateProvider: StateProviderService,
    private readonly _command: CommandsFactory
  ) { }

  ngOnInit() {
    this._commandBusService.useMapper(this._loggerService)
    this._commandBusService.useFilter(this._stateTransitionService);
    this._commandBusService.useHandler<RevertableCommand>(this._commandsStack);
    this._commandBusService.useHandler<BaseCommand>(this._defaultHandler);
    this._commandBusService.useSideEffect(this._gameLoopAutoDispatcher);
    
    // state shortcuts
    merge(
      this._stateProvider.whenOnlyOnePlayerHaveLifePointsAboveZero,
      this._stateProvider.whenBattleInstantActionWasUsed
    )
    .subscribe(() => this._commandBusService.dispatch(this._command.create(FinishRound)));

    // data loading
    const me = this._gameLoopAutoDispatcher()
      

    const players = this._playersService.getPlayers();
    this._playersStateService.init(players);
    
    const game = this._gameService.getGameSettings();
    this._gameStateService.init(game, players);

    

    
    this._commandBusService.dispatch(this._command.create(StartGame));
  }
}








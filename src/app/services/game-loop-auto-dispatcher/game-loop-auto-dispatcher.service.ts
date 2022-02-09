import { Injectable } from '@angular/core';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { ContinueGame, ProceedGame } from 'src/app/commands/high-order/proceed-game';
import { FinishGame } from 'src/app/commands/state-transitions/game/finish-game.command';
import { FinishRound } from 'src/app/commands/state-transitions/round/finish-round.command';
import { CommandBusService, CommandBusSideEffect } from 'src/app/lib/command-bus/command-bus.service';
import { StateTransition } from 'src/app/lib/state-machine/state';
import { gameStateTransitionRules } from 'src/app/state/game/game-transition-rules';
import { RoundState } from 'src/app/state/round/round-state';
import { RoundStateName, roundStateName } from 'src/app/state/round/round-state-name.enum';
import { GameStateService } from '../game-state/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopAutoDispatcherService implements CommandBusSideEffect<StateTransition<RoundState, RoundStateName>> {

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory
  ) { }

  react(command: StateTransition<RoundState, RoundStateName>): void {
    if (!(command instanceof FinishRound) || command.targetStateName !== command.newState.stateName)
      return;
    
    const newCommand = this._command.create(ProceedGame);
    this._commandBus.dispatch(newCommand);
  }
}
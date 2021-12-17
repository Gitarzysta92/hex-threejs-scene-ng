import { Injectable } from '@angular/core';
import { CommandBusFilter } from 'src/app/lib/command-bus/command-bus.service';
import { StateTransition } from 'src/app/lib/state-machine/state';

import { RoundState } from 'src/app/state/round-state';
import { GameStateService } from '../game-state/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class StateTransitionValidatorService implements CommandBusFilter<StateTransition<RoundState>> {

  constructor(
    private readonly _gameStateService: GameStateService
  ) { }

  filter(command: StateTransition<RoundState>): boolean {   
    const currentState = this._gameStateService.getCurrentRoundState();
    return command.checkIfTransitionPossible(currentState);
  }
}
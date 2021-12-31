import { Injectable } from '@angular/core';
import { CommandBusFilter } from 'src/app/lib/command-bus/command-bus.service';
import { StateTransition } from 'src/app/lib/state-machine/state';

import { RoundState } from 'src/app/state/round/round-state';
import { RoundStateService } from '../round-state/round-state.service';

@Injectable({
  providedIn: 'root'
})
export class StateTransitionValidatorService implements CommandBusFilter<StateTransition<RoundState>> {

  constructor(
    private readonly _gameStateService: RoundStateService
  ) { }

  filter(command: StateTransition<RoundState>): boolean {
    if (!command.checkIfTransitionPossible)
      return true;
    const currentState = this._gameStateService.getState();
    return command.checkIfTransitionPossible(currentState);
  }
}
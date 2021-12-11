import { Injectable } from '@angular/core';
import { CommandBusFilter } from 'src/app/lib/command-bus/command-bus.service';
import { StateTransition } from 'src/app/lib/state-machine/state';

import { RoundState } from 'src/app/state/round-state';

@Injectable({
  providedIn: 'root'
})
export class StateTransitionValidatorService implements CommandBusFilter<StateTransition<RoundState>> {
  private _currentState!: RoundState;

  constructor() { }
  verify(state: StateTransition<RoundState>): boolean {   
    return state.transition(this._currentState);
  }
}

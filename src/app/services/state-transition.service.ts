import { Injectable } from '@angular/core';
import { CommandBusFilter } from '../lib/command-bus/command-bus.service';
import { StateTransition } from '../lib/state-machine/state';
import { RoundState } from '../state/round-state';

@Injectable({
  providedIn: 'root'
})
export class StateTransitionService implements CommandBusFilter<StateTransition<RoundState>> {
  private _currentState!: RoundState;

  constructor() { }
  
  verify(state: StateTransition<RoundState>): boolean {   
    return state.transition(this._currentState);
  }
}

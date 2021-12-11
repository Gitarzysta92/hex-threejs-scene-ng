import { Injectable } from '@angular/core';
import { Round } from 'src/app/logic/round';
import { CommandBusFilter } from '../command-bus/command-bus.service';
import { StateTransition } from './state';


@Injectable({
  providedIn: 'root'
})
export class StateMachineService implements CommandBusFilter<StateTransition<Round>>  {

  private _currentState!: Round; 

  constructor() { }

  verify(state: StateTransition<Round>): boolean {   
    return state.transition(this._currentState);
  }
}
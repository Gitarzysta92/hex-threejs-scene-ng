import { Injectable } from '@angular/core';
import { CommandBusFilter } from '../command-bus/command-bus.service';
import { StateTransition } from './state';


@Injectable({
  providedIn: 'root'
})
export class StateMachineService implements CommandBusFilter  {

  constructor() { }

  verify(transition: StateTransition<any>): boolean {
    return true;
  }
}

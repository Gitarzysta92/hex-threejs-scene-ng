import { Injectable } from '@angular/core';
import { CommandBusHandler } from '../command-bus/command-bus.service';

export interface Revertable {
  revert: () => void  
}

@Injectable({
  providedIn: 'root'
})
export class CommandsStackService implements CommandBusHandler {

  constructor() { }
  
  handle() {
    
  }
}

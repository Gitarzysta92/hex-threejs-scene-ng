import { Injectable } from '@angular/core';
import { BaseCommand } from 'src/app/lib/command-bus/base-command';
import { CommandBusMapper } from 'src/app/lib/command-bus/command-bus.service';
import { StateTransition } from 'src/app/lib/state-machine/state';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements CommandBusMapper<BaseCommand | StateTransition<any>> {

  constructor() { }

  map(command: BaseCommand | StateTransition<any>) {

    if ('execute' in command) {
      const commandMethod1 = command.execute;

      command.execute = () => {
        commandMethod1.call(command);
        console.log(command);
      }
    }
    


    if ('checkIfTransitionPossible' in command) {
      const commandMethod2 = command.checkIfTransitionPossible;

      command.checkIfTransitionPossible = (...args) => {
        console.log(command);
        return commandMethod2.call(command, args);    
      }
    }

    return command as BaseCommand;
  }
}


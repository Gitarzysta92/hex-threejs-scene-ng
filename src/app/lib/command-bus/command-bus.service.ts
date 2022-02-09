import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCommand, Command } from './base-command';

export interface CommandBusFilter<T> {
  filter: (command: T) => boolean;
}

export interface CommandBusHandler<T extends BaseCommand> {
  handle: (command: T) => void;
  handleAsync?: (command: T) => Observable<void>;
}

export interface CommandBusMapper<T> {
  map: (command: T) => T;
}

export interface CommandBusSideEffect<T> {
  react: (command: T) => void;
}





@Injectable({
  providedIn: 'root'
})
export class CommandBusService {

  private _processors: Array<(command: any) => boolean | void> = [];

  constructor() { }

  public dispatch<T extends BaseCommand>(command: Command<T>): void {
    for (let a of this._processors) {
      const result = a(command);
      if (result === false)
        break;
    }
  }

  public useFilter<T>(filter: CommandBusFilter<T>): void {
    this._processors.push((command: T) => filter.filter(command));
  }

  public useHandler<T extends BaseCommand>(handler: CommandBusHandler<T>): void {
    this._processors.push((command: T) => {
      handler.handle(command);
      return;
    });
  }

  public useMapper<T extends BaseCommand>(mapper: CommandBusMapper<T>) {
    this._processors.push((command: T) => {
      mapper.map(command);
      return;
    });
  }

  public useSideEffect<T>(sideEffect: CommandBusSideEffect<T>) {
    this._processors.push((command: T) => {
      sideEffect.react(command);
      return;
    });
  }
  
}



@Injectable({
  providedIn: 'root'
})
export class DefaultHandler implements CommandBusHandler<BaseCommand> {
  public handle(command: BaseCommand) {
    !command.isConsumed && command.execute();
    command.isConsumed = true;
  }
}


// Old solution
    // const isNotPassedVerification = this._filters.some(f => !f.filter(command));

    // if (this._filters.length > 0 && isNotPassedVerification)
    //   return;

    // this._mappers.forEach(mapper => mapper.map(command));
    // this._handlers.forEach(handler => handler.handle(command));




//     import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BaseCommand, Command } from './base-command';

// export interface CommandBusFilter<T> {
//   filter: (command: T) => boolean;
// }

// export interface CommandBusHandler<T extends BaseCommand> {
//   handle: (command: T) => void;
//   handleAsync?: (command: T) => Observable<void>;
// }

// export interface CommandBusMapper<T> {
//   map: (command: T) => T;
// }

// export interface CommandBusSideEffect<T> {
//   react: (command: T) => void;
// }


// enum CommandProcessorType {
//   Mapper,
//   Filter,
//   Handler,
//   SideEffect
// }


// class CommandProcessor {

//   type: CommandProcessorType | undefined;
//   processor: any;
  
//   constructor(data: Partial<CommandProcessor>) {
//     this.type = data.type;
//     this.processor = data.processor;
//   }

//   process<T extends BaseCommand>(command: Command<T>) {
//     let canProceed = true;

//     switch (this.type) {
//       case CommandProcessorType.Mapper:
//         (this.processor as CommandBusMapper<unknown>).map(command);
//         break;
      
//       case CommandProcessorType.Filter:
//         canProceed = (this.processor as CommandBusFilter<unknown>).filter(command);
//         break;

//       case CommandProcessorType.Handler:
//         (this.processor as CommandBusHandler<BaseCommand>).handle(command as unknown as BaseCommand);
//         break;

//       case CommandProcessorType.SideEffect:
//         (this.processor as CommandBusSideEffect<unknown>).react(command);
//         break;
//       default:
//         throw new Error();
//     }
//     return canProceed;
//   } 

// }



// @Injectable({
//   providedIn: 'root'
// })
// export class CommandBusService {

//   private _processors: Array<CommandProcessor> = [];

//   constructor() { }

//   public dispatch<T extends BaseCommand>(command: Command<T>): void {
//     for (let p of this._processors) {
//       const result = p.process<T>(command);
//       if (result === false)
//         break;
//     }
//   }

//   public useFilter<T>(filter: CommandBusFilter<T>): void {
//     const p = new CommandProcessor({ type: CommandProcessorType.Filter, processor: filter });
//     this._processors.push(p);
//   }

//   public useHandler<T extends BaseCommand>(handler: CommandBusHandler<T>): void {
//     const p = new CommandProcessor({ type: CommandProcessorType.Handler, processor: handler });
//     this._processors.push(p);
//   }

//   public useMapper<T extends BaseCommand>(mapper: CommandBusMapper<T>) {
//     const p = new CommandProcessor({ type: CommandProcessorType.Mapper, processor: mapper });
//     this._processors.push(p);
//   }

//   public useSideEffect<T extends BaseCommand>(SideEffect: CommandBusSideEffect<T>) {
//     const p = new CommandProcessor({ type: CommandProcessorType.SideEffect, processor: SideEffect })
//     this._processors.push(p);
//   }
  
// }



// @Injectable({
//   providedIn: 'root'
// })
// export class DefaultHandler implements CommandBusHandler<BaseCommand> {
//   public handle(command: BaseCommand) {
//     !command.isConsumed && command.execute();
//     command.isConsumed = true;
//   }
// }
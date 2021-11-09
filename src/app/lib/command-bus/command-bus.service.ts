import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCommand } from './base-command';

export interface CommandBusFilter {
  verify: (command: any) => boolean;
}

export interface CommandBusHandler {
  handle: (command: any) => void;
  handleAsync?: (command: any) => Observable<void>;
}


@Injectable({
  providedIn: 'root'
})
export class CommandBusService {
  
  private _filters: CommandBusFilter[] = [];
  private _handler: CommandBusHandler = new DefaultHandler;

  constructor() { }

  public dispatch(command: BaseCommand): void {
    const passed = this._filters.filter(f => f.verify(command));

    if (this._filters.length > 0 && passed.length === 0)
      return;

    this._handler.handle(command);
  }

  public useFilter(filter: CommandBusFilter): void {
    this._filters.push(filter);
  }

  public useHandler(handler: CommandBusHandler): void {
    this._handler = handler;
  }
}



class DefaultHandler implements CommandBusHandler {
  public handle(command: BaseCommand) {
    command.execute();
  }
}





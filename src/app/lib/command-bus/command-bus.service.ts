import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCommand } from './base-command';

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


@Injectable({
  providedIn: 'root'
})
export class CommandBusService {

  private _filters: CommandBusFilter<any>[] = [];
  private _handlers: CommandBusHandler<any>[] = [];
  private _mappers: CommandBusMapper<any>[] = [];

  constructor() { }

  public dispatch(command: BaseCommand): void {
    const isNotPassedVerification = this._filters.some(f => !f.filter(command));

    if (this._filters.length > 0 && isNotPassedVerification)
      return;

    this._mappers.forEach(mapper => mapper.map(command));
    this._handlers.forEach(handler => handler.handle(command));
  }

  public useFilter<T>(filter: CommandBusFilter<T>): void {
    this._filters.push(filter);
  }

  public useHandler<T extends BaseCommand>(handler: CommandBusHandler<T>): void {
    this._handlers.push(handler);
  }

  public useMapper<T extends BaseCommand>(mapper: CommandBusMapper<T>) {
    this._mappers.push(mapper);
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
import { Injectable } from '@angular/core';
import { BaseCommand } from '../command-bus/base-command';
import { CommandBusHandler } from '../command-bus/command-bus.service';

export interface Revertable {
  revert: () => void
}

export type RevertableCommand = BaseCommand & Revertable;

@Injectable({
  providedIn: 'root'
})
export class CommandsStackService implements CommandBusHandler<RevertableCommand> {

  private _stack: RevertableCommand[] = [];

  constructor() { }

  public handle(command: RevertableCommand): void {
    if (!this._checkIsRevertable(command))
      return;
    this._stack.push(command);
    command.execute();
  }

  public revert(): void {
    const command = this._stack.pop();
    if (!command)
      return;
    command.revert();
  }

  private _checkIsRevertable<T extends Revertable>(command: T): boolean {
    return !!command.revert;
  }
}
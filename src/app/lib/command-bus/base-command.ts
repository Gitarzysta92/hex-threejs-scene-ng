import { Observable } from "rxjs";

export type Command<T extends BaseCommand> = Pick<T, 'setParameters'>;


export abstract class BaseCommand {
  abstract execute(): void;
  public isConsumed!: boolean;
}

export interface BaseCommand {
  setParameters(...args: any[]): Command<this>;
}

export abstract class AsyncBaseCommand extends BaseCommand {
  abstract finished: Observable<void>;
}

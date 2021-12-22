import { Observable } from "rxjs";

export abstract class BaseCommand {
  abstract execute(): void;
  abstract setParameters(...args: any[]): this;
  public isConsumed!: boolean;
}

export abstract class AsyncBaseCommand extends BaseCommand {
  abstract finished: Observable<void>;
}

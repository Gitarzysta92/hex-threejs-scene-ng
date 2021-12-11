import { BaseCommand } from "src/app/lib/command-bus/base-command";

export class FinishRound extends BaseCommand {

  constructor() {
    
  }

  execute(): void {
    throw new Error("Method not implemented.");
  }
  setParameters(...args: any[]): this {
    throw new Error("Method not implemented.");
  }

}
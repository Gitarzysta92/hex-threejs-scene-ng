import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";

export class FinishRound extends BaseCommand implements StateTransition<RoundState> {

  targetState: RoundStateName = RoundStateName.Ended

  constructor() {
    super() 
  }

  execute(): void {
    throw new Error("Method not implemented.");
  }
  setParameters(...args: any[]): this {
    throw new Error("Method not implemented.");
  }

  checkIfTransitionPossible(prevState: RoundState): boolean {
    return true;
  };

}
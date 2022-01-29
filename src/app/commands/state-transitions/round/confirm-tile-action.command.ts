import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition, ValidatableState } from "src/app/lib/state-machine/state";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class ConfirmTileAction extends BaseCommand implements StateTransition<RoundState>, Revertable {

  newState: RoundState;
  targetState: RoundStateName = RoundStateName.Ended;

  constructor(
    private readonly _currentState: RoundState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 
  
  execute(): void { 
    this.newState.apply();
  }

  revert(): void { }

  checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
    this.newState.setState(this.targetState);
    return state.to(this.newState);
  }
}
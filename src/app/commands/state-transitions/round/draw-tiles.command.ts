import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition, ValidatableState } from "src/app/lib/state-machine/state";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";


@Injectable()
export class DrawTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  newState: RoundState;
  targetStateName: RoundStateName = RoundStateName.ChoosingTileToDiscard;

  constructor(
    private readonly _currentState: RoundState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 
  
  execute(): void {
    this.newState.apply();
  }

  revert() { 
    this._currentState.apply();
  }

  checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
    this.newState.setState(this.targetStateName);
    return state.to(this.newState);
  }
}
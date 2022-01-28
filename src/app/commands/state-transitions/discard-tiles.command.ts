import { Injectable } from "@angular/core";
import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";


@Injectable()
export class DiscardTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  public newState!: RoundState;
  private _tilesToDiscard!: string[];

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _currentState: RoundState
  ) {
    super();
  } 

  setParameters(tilesToDiscard: string[]): this { 
    this._tilesToDiscard = tilesToDiscard;
    return this;
  }

  execute(): void {
    this.newState.apply();
  }

  revert(): void { 
    this._currentState.apply();
  }

  checkIfTransitionPossible(state: RoundState): boolean {
      this.newState = this._currentState
        .discardTiles(this._tilesToDiscard)
        .setState(RoundStateName.TilesManage);
    return state.to(this._newState);
  }
}
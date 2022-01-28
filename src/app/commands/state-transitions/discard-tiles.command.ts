import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class DiscardTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  private _newState!: RoundState;

  private _tilesToDiscard!: string[];

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService,
    private readonly _roundState: RoundState
  ) {
    super();
  } 

  setParameters(tilesToDiscard: string[]): this { 
    this._tilesToDiscard = tilesToDiscard;
    return this;
  }

  execute(): void {

    this._newState.apply();
  }

  revert(): void { 
    this._roundState.apply();
  }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._roundState
      .discardTiles(this._tilesToDiscard)
      .setState(RoundStateName.TilesManage);
    return state.to(this._newState);
  }
}
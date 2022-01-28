import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class DrawTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.ChoosingTileToDiscard;
  private _prevState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService,
    private readonly _tilesRepositoryService: TilesRepositoryService
  ) {
    super();
  } 
  
  setParameters(): this { return this; }

  execute(): void {
    this._prevState = this._gameState.getState();
    this._gameState.applyState(this.targetState);
  }

  revert() { }

  checkIfTransitionPossible(state: RoundState): boolean {
    return state.to(this.targetState);
  }
}
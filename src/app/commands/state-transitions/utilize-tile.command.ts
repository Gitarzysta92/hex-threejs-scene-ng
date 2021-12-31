import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class UtilizeTile extends BaseCommand implements StateTransition<RoundState> {
  private _tileId!: string;

  targetState: RoundStateName = RoundStateName.UtilizingTile
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService,
    private readonly _tilesRepositioryService: TilesRepositoryService
  ) {
    super();
  } 
  setParameters(tileId: string): this {
    this._tileId = tileId;
    return this;
  }

  execute(): void {
    this._gameState.applyState(this._newState);
    this._sceneService.createToken(this._newState.utilizingTile.img, this._tileId);
  }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    return new RoundState({
      id: this.targetState,
      holdedTiles: currentState.holdedTiles,
      utilizingTile: currentState.holdedTiles.find(t => t.id === this._tileId),
      playerId: currentState.playerId,
      prevRound: currentState              
    }); 
  }
}
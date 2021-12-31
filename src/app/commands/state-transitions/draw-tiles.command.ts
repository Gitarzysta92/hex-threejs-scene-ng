import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { Tile } from "src/app/logic/models/tile";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";


export class DrawTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.ChoosingTileToDiscard;
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService,
    private readonly _tilesRepositoryService: TilesRepositoryService
  ) {
    super();
  } 
  
  setParameters(): this { return this; }

  execute(): void {
    this._gameState.applyState(this._newState);
  }

  revert() { }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    return new RoundState({
      id: this.targetState,
      holdedTiles: this._drawTiles(currentState?.prevRound?.holdedTiles || [], 3) ,
      playerId: currentState.playerId,
      prevRound: currentState              
    }); 
  }

  private _drawTiles(holded: Tile[], limit: number): Tile[] {
    while(holded.length < limit) {
      const id = this._getRandomId();
      const tile = this._tilesRepositoryService.getTile(id);
      holded.push(tile)
    }
    return holded;
  }

  private _getRandomId(): number {
    return Math.floor(Math.random() * 10);
  }

}
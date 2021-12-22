import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { Tile } from "src/app/logic/models/tile";
import { GameStateService } from "src/app/services/game-state/game-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";


export class DrawTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.ChoosingTileToDiscard;
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: GameStateService,
    private readonly _tilesRepositoryService: TilesRepositoryService
  ) {
    super();
  } 
  
  setParameters(): this { return this; }

  execute(): void {
    this._gameState.applyRoundState(this._newState);
  }

  revert() { }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);

    console.log(this._newState);
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
      const id = Math.floor(Math.random() * 10);
      const tile = this._tilesRepositoryService.getTile(id);
      holded.push(tile)
    }
    return holded;
  }

}
import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { GameStateService } from "src/app/services/game-state/game-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";

export class PickTileForManipulation extends BaseCommand implements StateTransition<RoundState>, Revertable {
  private _tileId!: string;

  targetState: RoundStateName = RoundStateName.TileManipulation
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: GameStateService
  ) {
    super();
  } 

  setParameters(tileId: string): this {
    this._tileId = tileId;
    return this;
  }

  execute(): void {
    this._gameState.applyRoundState(this._newState);
  }

  revert() { }

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
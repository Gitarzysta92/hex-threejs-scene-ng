import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class ConfirmTileAction extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.TilesManage
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService
  ) {
    super();
  } 
  
  setParameters(playerId: string): this { return this }
  execute(): void { 
    this._gameState.applyState(this._newState);
  }

  revert(): void { }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    const utilizedTile = currentState.utilizingTile;
    return new RoundState({
      id: this.targetState,
      holdedTiles: (currentState?.holdedTiles || [])
        .filter(t => t.id !== utilizedTile.id),
      utilizingTile: undefined,
      playerId: currentState.playerId,
      prevRound: currentState              
    }); 
  }
}
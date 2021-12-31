import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class DiscardTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.TilesManage
  private _newState!: RoundState;
  private _tilesToDrop!: string[];

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService
  ) {
    super();
  } 

  setParameters(tilesToDrop: string[]): this { 
    this._tilesToDrop = tilesToDrop;
    return this;
  }

  execute(): void {
    this._gameState.applyState(this._newState);
  }

  revert(): void { 

  }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    return new RoundState({
      id: this.targetState,
      holdedTiles: (currentState?.holdedTiles || [])
        .filter(t => !this._tilesToDrop.some(id => t.id === id)),
      playerId: currentState.playerId,
      prevRound: currentState              
    }); 
  }

}
import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class FinishRound extends BaseCommand implements StateTransition<RoundState> {

  targetState: RoundStateName = RoundStateName.Ended
  private _newState!: RoundState;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameState: RoundStateService
  ) {
    super() 
  }

  execute(): void {
    this._gameState.applyState(this._newState)
  }
  setParameters(...args: any[]): this {
    return this;
  }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    const state = new RoundState(currentState);
    state.id = this.targetState;
    return state;
  }

}
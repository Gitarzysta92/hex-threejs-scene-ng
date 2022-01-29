import { BaseCommand, Command } from "src/app/lib/command-bus/base-command";
import { StateTransition, ValidatableState } from "src/app/lib/state-machine/state";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export class UtilizeTile extends BaseCommand implements StateTransition<RoundState> {

  newState: RoundState;
  targetStateName: RoundStateName = RoundStateName.UtilizingTile;
  
  constructor(
    private readonly _sceneService: SceneService,
    private readonly _currentState: RoundState,
  ) {
    super();
    this.newState = this._currentState.clone();
  } 

  setParameters(tileId: string): Command<this> {
    this.newState.setTileToUtilize(tileId);
    return this;
  }

  execute(): void {
    this.newState.apply();
    this._sceneService.createToken(this.newState.utilizingTile.img, this.newState.utilizingTile.id);
  }

  checkIfTransitionPossible(state: ValidatableState<RoundState>): boolean {
    this.newState.setState(this.targetStateName)
    return state.to(this.newState);
  }
}
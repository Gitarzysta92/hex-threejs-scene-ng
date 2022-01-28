import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { RoundState } from "src/app/state/round/round-state";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";


export class StartNewRound extends BaseCommand implements StateTransition<RoundState> {
  
  public targetState: RoundStateName = RoundStateName.Started;
  
  private _playerId!: string;
  private _newState!: RoundState;

  constructor(
    private readonly _roundState: RoundStateService,
  ) {
    super();
  } 

  setParameters(playerId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {
    this._roundState.applyState(this._newState);
  }

  checkIfTransitionPossible(state: RoundState): boolean {
    return state.to(this.targetState);
  }
}
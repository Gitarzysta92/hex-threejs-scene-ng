import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameStateService } from "src/app/services/game-state/game-state.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";


export class StartNewRound extends BaseCommand implements StateTransition<RoundState> {
  
  public targetState: RoundStateName = RoundStateName.Started;
  
  private _playerId!: string;
  private _newState!: RoundState;

  constructor(
    private readonly _gameState: GameStateService,
  ) {
    super();
  } 

  setParameters(playerId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {
    this._gameState.applyRoundState(this._newState);
  }

  private _createNewState(currentState: RoundState): RoundState {
    return Object.assign(currentState, new RoundState({
      id: this.targetState,
      holdedTiles: currentState.prevRound.holdedTiles,
      playerId: currentState.playerId,
      prevRound: currentState              
    })); 
  }

  checkIfTransitionPossible(state: RoundState): boolean {
    this._newState = this._createNewState(state);
    return state.to(this._newState);
  }
}
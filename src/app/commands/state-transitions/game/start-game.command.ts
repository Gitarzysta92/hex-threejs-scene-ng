import { BaseCommand, Command } from "src/app/lib/command-bus/base-command";
import { StateTransition, ValidatableState } from "src/app/lib/state-machine/state";
import { Player } from "src/app/logic/models/player";
import { GameState } from "src/app/state/game/game-state";
import { GameStateName } from "src/app/state/game/game-state-name.enum";


export class StartGame extends BaseCommand implements StateTransition<GameState> {
  
  newState: GameState;
  targetStateName: GameStateName = GameStateName.Started;
  
  constructor(
    private readonly _currentState: GameState
  ) {
    super();
    this.newState = this._currentState.clone();
  } 

  setParameters(players: Player[]): Command<this> {
    this.newState.setPlayers(players);
    return this;
  }

  execute(): void {
    this.newState.apply();
  }

  checkIfTransitionPossible(state: ValidatableState<GameState>): boolean {
    this.newState.setState(this.targetStateName)
    return state.to(this.newState);
  }
}
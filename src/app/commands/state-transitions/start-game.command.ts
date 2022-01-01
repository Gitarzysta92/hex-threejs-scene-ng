import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { Player } from "src/app/logic/models/player";
import { GameStateService } from "src/app/services/game-state/game-state.service";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { GameState } from "src/app/state/game/game-state";
import { GameStateName } from "src/app/state/game/game-state-name.enum";


export class StartGame extends BaseCommand implements StateTransition<GameState> {
  
  public targetState: GameStateName = GameStateName.Started;
  
  private _players!: Player[];
  private _newState!: GameState;

  constructor(
    private readonly _roundState: RoundStateService,
    private readonly _gameState: GameStateService
  ) {
    super();
  } 

  setParameters(players: Player[]): this {
    this._players = players;
    return this;
  }

  execute(): void {
    this._gameState.applyState(this._newState);
  }

  private _createNewState(currentState: GameState): GameState {
    const players = Object.fromEntries(this._players.map(p => [p.uuid, p]))
    const order = Object.keys(players);

    return new GameState({
      id: this.targetState,
      players: players,
      playersOrder: order,
      currentPlayer: order[0]
    })
  }

  checkIfTransitionPossible(): boolean {
    const currentState = this._gameState.getState();
    this._newState = this._createNewState(currentState);
    return currentState.to(this._newState);
  }
}
import { Player } from "./player";
import { Round } from "./round";

export class Game {
  public players: Player[];
  public winner: Player;
  public currentRound: IteratorResult<Round, this>;
  
  private _initialActions: RoundAction[];
  private _generator: Generator<Round, this, unknown>;
  

  constructor(players: Player[]) {
    this.players = players;
    this._initialActions = [ actions.chooseTokens ];
  }

  public initialize() {
    this._generator = this._start();
    return this._generator;
  }

  
  public startNewRound() {
    this.currentRound = this._generator.next();
  }

  private *_start() {
    const noWinConditionHasMet = !checkIfAnyWinConditionHasMet();
    while (noWinConditionHasMet) {
      yield new Round(this.players, this._initialActions);
      this._initialActions.length = 0; 
    };
    return this;
  }
};




function checkIfAnyWinConditionHasMet() {
  const atLeastOnePlayerHasZeroLife = false;
  const gameTimeIsOver = false;
  const lastFightHasBeenFought = false; 

  return atLeastOnePlayerHasZeroLife ||
    gameTimeIsOver  ||
    lastFightHasBeenFought
}

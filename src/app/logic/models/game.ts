import { Player } from "./player";


export class Game {
  private _players: { [key: string]: Player } = {};
  public winner!: Player;
  public playersOrder: string[] = [];

  public get currentPlayer() {
    return this._players[]
  }
  
  constructor(data: Partial<Game> = {}) {
    Object.assign(this, data);
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

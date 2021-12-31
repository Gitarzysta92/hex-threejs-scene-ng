import { Player } from "./player";


export class Game {
  public players: Player[];
  public winner: Player | undefined;
  
  constructor(players: Player[]) {
    this.players = players;
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

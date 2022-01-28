import { Board } from "./board";
import { Player } from "./player";

export abstract class Game {
  public players: Player[] = [];

  public winner!: Player;
  public currentPlayer!: Player;
  public playersOrder!: Player;
  public board!: Board;

  
};


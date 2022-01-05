import { Player } from "./player";

export class Game {
  public players: { [key: string]: Player } = {};
  public winner!: Player;
  public playersOrder: string[] = [];
  public currentPlayer!: string;
  
  constructor(data: Partial<Game> = {}) {
    Object.assign(this, data);
  }
};


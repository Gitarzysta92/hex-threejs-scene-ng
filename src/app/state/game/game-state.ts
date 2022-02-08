import { State } from "src/app/lib/state-machine/state";
import { Board } from "src/app/logic/models/board";
import { Game } from "src/app/logic/models/game";
import { PlayerState } from "../player/player-state";
import { RoundState } from "../round/round-state";

export class GameState extends State implements Game {
 
  id!: number;
  round: RoundState;

  constructor(data: Partial<GameState> = {}) {
    super(data);

    this.players = data.players || [];

  }
  public players: PlayerState[];
  public winner: PlayerState;
  public currentPlayer: PlayerState;
  public playersOrder: PlayerState;
  public board: Board;
  
}
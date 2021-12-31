import { State } from "src/app/lib/state-machine/state";
import { Game } from "src/app/logic/models/game";
import { gameStateTransitionRules } from "./game-transition-rules";


export class GameState extends Game implements State {
  id!: number;

  constructor(data: Partial<GameState> = {}) {
    super(data);
  }
  

  to(nextState: GameState): boolean {
    return gameStateTransitionRules[this.id][nextState.id]?.call(null, nextState);
  }
}
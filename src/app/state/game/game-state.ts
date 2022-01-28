import { State } from "src/app/lib/state-machine/state";
import { Game } from "src/app/logic/models/game";
import { PlayerState } from "../player/player-state";
import { GameStateName } from "./game-state-name.enum";
import { gameStateTransitionRules } from "./game-transition-rules";

export class GameState extends Game implements State {
  id!: number;
  round: any;



  constructor(data: Partial<GameState> = {}) {
    super();

    this.players = data.players || [];

  }
  

  to(nextState: GameState): boolean {
    return gameStateTransitionRules[this.id][nextState.id]?.call(null, nextState);
  }

  to2(nextState: GameStateName): boolean {
    return gameStateTransitionRules[this.id][nextState]?.call(null, this)
  }
}
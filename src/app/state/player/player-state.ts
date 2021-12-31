import { State } from "src/app/lib/state-machine/state";
import { Player } from "src/app/logic/models/player";
import { playerStateTransitionRules } from "./player-transition-rules";

export class PlayerState extends Player implements State {
  id!: number;

  constructor(data: Partial<PlayerState> = {}) {
    super(data);
  }
  

  to(nextState: PlayerState): boolean {
    return playerStateTransitionRules[this.id][nextState.id]?.call(null, nextState);
  }
}
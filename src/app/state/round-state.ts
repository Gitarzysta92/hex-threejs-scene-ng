import { State } from "../lib/state-machine/state";
import { Round } from "../logic/models/round";
import { Tile } from "../logic/models/tile";
import { roundStateTransitionRules } from "./transition-rules";


export class RoundState extends Round implements State {

  utilizingTile!: Tile

  constructor(data: Partial<RoundState> = {}) {
    super(data);
  }

  to(nextState: RoundState): boolean {
    return roundStateTransitionRules[this.id][nextState.id]?.call(null, nextState);
  }
}
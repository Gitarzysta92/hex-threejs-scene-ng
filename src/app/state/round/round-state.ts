import { State } from "../../lib/state-machine/state";
import { Round } from "../../logic/models/round";
import { Tile } from "../../logic/models/tile";
import { PlayerState } from "../player/player-state";
import { RoundStateName } from "./round-state-name.enum";
import { roundStateTransitionRules } from "./round-transition-rules";


export class RoundState extends Round implements State {

  utilizingTile!: Tile
  tilesToDiscard: any;
  player: PlayerState;
  tilesLimit: any;

  constructor(player: PlayerState, data: Partial<RoundState> = {}) {
    super(data);
    this.player = player;
  }

  to(nextState: RoundStateName): boolean {
    return roundStateTransitionRules[this.id][nextState]?.call(null, nextState);
  }
}
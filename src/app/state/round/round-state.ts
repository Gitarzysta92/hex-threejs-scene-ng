import { State } from "../../lib/state-machine/state";
import { Round } from "../../logic/models/round";
import { Tile } from "../../logic/models/tile";
import { PlayerState } from "../player/player-state";
import { RoundStateName } from "./round-state-name.enum";
import { roundStateTransitionRules } from "./round-transition-rules";


export class RoundState extends Round implements State {


  name!: string;
  utilizingTile!: Tile
  tilesToDiscard: any;
  player: PlayerState;
  tilesLimit: any;

  constructor(player: PlayerState, data: Partial<RoundState> = {}) {
    super(data);
    this.player = player;
  }

  to(nextState: RoundState): boolean {
    return roundStateTransitionRules.checkTransition(this, nextState);
  }

  setState(TilesManage: RoundStateName): this {
    return this;
  }

  apply() {
    return this;
  }

  clone(): RoundState {
    throw new Error("Method not implemented.");
  }

  discardTiles(_tilesToDiscard: string[]): this  {
    return this;
  }

  setPlayer(playerId: string) {
    throw new Error("Method not implemented.");
  }

  setTileToUtilize(tileId: string) {
    new RoundState({
      id: this.targetState,
      holdedTiles: currentState.holdedTiles,
      utilizingTile: currentState.holdedTiles.find(t => t.id === this._tileId),
      playerId: currentState.playerId,
      prevRound: currentState              
    }); 
  }
}
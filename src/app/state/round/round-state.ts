import { Activity } from "src/app/logic/models/activity";
import { Board } from "src/app/logic/models/board";
import { State } from "../../lib/state-machine/state";
import { Round } from "../../logic/models/round";
import { Tile } from "../../logic/models/tile";
import { PlayerState } from "../player/player-state";


export class RoundState extends State implements Round {

  public id: number;
  public playerId: string;
  public prevRound: Round;
  public holdedTiles: Tile[];
  public availableActions: any;
  public board!: Board;
  utilizingTile: Tile | undefined;
  tilesLimit: any;
  player: any;
  actions: any; 

  public get currentActivity() { return this._activityStack[0] };
  private _activityStack: Activity[] = [];

  constructor(
    player: PlayerState, 
    data: Partial<RoundState> = {}
  ) {
    super(data);

  }
  discardTiles(_tilesToDiscard: string[]): this {
    throw new Error("Method not implemented.");
  }

  setActivity(arg0: PickTileFromTheBoard) {
    throw new Error("Method not implemented.");
  }

  markTilesToDiscard(_tilesToDiscard: string[]): this {
    
  }
  setPlayer(playerId: string): void {
    throw new Error("Method not implemented.");
  }
  setTileToUtilize(tileId: string): void {
    throw new Error("Method not implemented.");
  }
  
  utilizizingTile(utilizizingTile: any): RoundState {
    throw new Error("Method not implemented.");
  }
}
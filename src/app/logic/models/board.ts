import { Field } from "./field";
import { Tile } from "./tile";

export class Board {
 
  getTile: any;

  public get fields(): Field[] { return  Object.values(this.fields) } 

  private _fields: { [key: string]: Field } = {};

  getField(key: string): Field {
    return this._fields[key];
  }

  getTiles(playerId: string): Tile[] {
    throw new Error("Method not implemented.");
  }

  occupiedField(utilizizingTile: any): import("../../state/round/round-state").RoundState {
    throw new Error("Method not implemented.");
  }
  removeTile(tileId: string) {
    throw new Error("Method not implemented.");
  }
}
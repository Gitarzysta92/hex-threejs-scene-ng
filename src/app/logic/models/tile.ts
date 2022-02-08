import { TileType } from "../consts/hierarchical-tile-types-model";

export class Tile {

  id!: string;
  type!: TileType;
  img!: string;

  constructor(data: Partial<Tile>) {
    Object.assign(this, data);
  }

  spawnActions(): import("./action").Action {
    throw new Error("Method not implemented.");
  }
}



export class UnitTile extends Tile {
  
  constructor(data: Partial<UnitTile>) {
    super(data);
  }
}

export class InstantActionTile extends Tile {


  constructor(data: Partial<UnitTile>) {
    super(data);
  }
}





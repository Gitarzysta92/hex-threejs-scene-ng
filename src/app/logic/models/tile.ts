import { TileType } from "../consts/hierarchical-tile-types-model";

export class Tile {
  id!: string;
  type!: TileType;
  img!: string;

  constructor(data: Partial<Tile>) {
    Object.assign(this, data);
  }
}
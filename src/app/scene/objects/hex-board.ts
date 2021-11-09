import { Injectable } from "@angular/core";
import { InstantionableId } from "../core/game-view";
import { Bitmap, convertToBinaryWithComplement, generate2dCoordinates, translateMatrix } from "../utils/utils";


// [0,0,0,1,0,0,0],
// [0,0,1,0,1,0,0],
// [0,1,0,1,0,1,0],
// [0,0,1,0,1,0,0],
// [0,1,0,1,0,1,0],

enum ItemsInRow {
  One =   0b0001000,
  Two =   0b0010100,
  Three = 0b0101010
}

type Coordinates = number[];


@Injectable()
export class HexBoard {
  private _fieldsDistribution: Bitmap;
  public fieldsCoordinates: Coordinates[];
  asd!: string[];

  
  constructor() {
    this._fieldsDistribution = [
      ItemsInRow.One,
      ItemsInRow.Two,
      ItemsInRow.Three,
      ItemsInRow.Two,
      ItemsInRow.Three,
      ItemsInRow.Two,
      ItemsInRow.Three,
      ItemsInRow.Two,
      ItemsInRow.One,
    ].map(x => convertToBinaryWithComplement(x, 7).split('').map(y => parseInt(y)));
      
    this.fieldsCoordinates = translateMatrix(generate2dCoordinates(this._fieldsDistribution), -4, -3);
  }
  
  public assign(callback: (coords: Coordinates) => InstantionableId): void {
    this.asd = this.fieldsCoordinates.map(coords => callback(coords));
  }

  public getCenterElement() {
    return this.asd[9];
  }
}
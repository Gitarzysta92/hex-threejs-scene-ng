import { Tile } from "./tile";


export class Round {

  public id!: number;
  public playerId!: string;
  public prevRound!: Round;
  public holdedTiles!: Tile[];


  constructor(data: Partial<Round>) {
    Object.assign(this, data);
  }

  discardTiles(_tilesToDiscard: string[]): this  {
    return this;
  }

  setPlayer(playerId: string) {
    throw new Error("Method not implemented.");
  }
};
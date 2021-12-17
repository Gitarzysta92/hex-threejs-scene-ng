import { Tile } from "./tile";


export class Round {

  public id!: number;
  public playerId!: string;
  public prevRound!: Round;
  public holdedTiles!: Tile[];


  constructor(data: Partial<Round>) {
  }
};
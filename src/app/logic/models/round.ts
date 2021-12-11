

export class Round {

  public id!: number;
  public pickedTokens!: []
  public disposingToken!: Token;
  public playerId!: string;
  public prevRound!: Round;
  public tiles: any;


  constructor(data: Partial<Round>) {
  }
};
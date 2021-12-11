import { State } from "../lib/state-machine/state";
import { Round } from "../logic/models/round";
import { roundStateTransitionRules } from "./transition-rules";

export enum RoundStateName {
  Started,
  ChoosingTileToDiscard,
  TilesManage,
  UtilizingTile,
  TileManipulation,
  Battle,
  Ended
}

export class RoundState extends Round implements State {
  public id!: RoundStateName;
  public currentState!: RoundState;
  public pickedTokens!: [];
  public playerId!: string;
  public prevRound!: Round;

  constructor(data: Partial<RoundState>) {
    super(data);
  }

  to(stepId: RoundStateName): boolean {
    return roundStateTransitionRules[this.id][stepId]?.call(null, this);
  }
}
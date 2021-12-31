import { TransitionsScheme } from "src/app/lib/state-machine/state";
import { RoundStateName } from "../round/round-state-name.enum";
import { PlayerState } from "./player-state";
import { PlayerStateName } from "./player-state-name.enum";

export const playerStateTransitionRules: TransitionsScheme<PlayerState> = {
  [PlayerStateName.Active]: {
    [PlayerStateName.Idle]: (state: PlayerState) => state.round.id === RoundStateName.Ended
  },
  [PlayerStateName.Idle]: {
    [PlayerStateName.Reactive]: (state: PlayerState) => !!state.pendingDecision 
  },
  [PlayerStateName.Reactive]: {
    [PlayerStateName.Idle]: (state: PlayerState) => !state.pendingDecision 
  }
}
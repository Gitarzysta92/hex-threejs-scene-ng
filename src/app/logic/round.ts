import { MachineState } from "../lib/state-machine/state";
import { Player } from "./player";


export enum RoundState {
  PickTokens,
  DisposeTokens,
  TokenDisposed,
  TokenManipulation,
  Battle,
  End
}


export class Round implements MachineState {

  public id!: number;
  public pickedTokens!: []
  public disposing!: {}


  constructor(data: Partial<Round>) {
  }

  to(nextStep: RoundState): boolean {
    return false;
  };

};

export const transitionRules = {
  [RoundState.PickTokens]: {
    [RoundState.DisposeTokens]: (state: Round) => state.pickedTokens.length < 3
  },
  [RoundState.DisposeTokens]: {
    [RoundState.TokenDisposed]: (state: Round) => !!state.disposing,
    [RoundState.End]: () => true
  },
  [RoundState.TokenDisposed]: {
    [RoundState.TokenManipulation]: (state: Round) => state.disposing.token.isOnField(),
    [RoundState.DisposeTokens]: (state: Round) => !state.disposing,
    [RoundState.Battle]: (state: Round) => lastRoundWasPlayed(state)
  },
  [RoundState.TokenManipulation]: {
    [RoundState.DisposeTokens]: (state: Round) => !state.disposing
  },
  [RoundState.Battle]: { }
}

function lastRoundWasPlayed(args: any) {}
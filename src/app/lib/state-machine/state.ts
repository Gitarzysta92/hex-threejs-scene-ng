import { RoundStateName } from "src/app/state/round/round-state-name.enum";

export type ValidatableState<T extends State> = Pick<T, keyof State>;

export interface StateTransition<T extends State> {
  checkIfTransitionPossible: (prevState: ValidatableState<T>) => boolean
  newState: T;
  targetStateName: number;
}

export type TransitionsScheme<T extends State> = { 
  [key: number]: { 
    [key: number]: {
      validators: Array<(state: T) => boolean>,
      mutators: Array<(state: T) => void>
    } 
  } 
}

export abstract class State {
  stateName!: string;
  name!: number;

  constructor(
    private readonly _transitionRules: TransitionsScheme<State>
  ) {

  }

  to<T extends State>(nextState: T): boolean {
    return this._transitionRules[this.name][nextState.name]
      ?.validators?.every(v => v.call(null, nextState));
  }

  setState(stateName: RoundStateName): this {
    this.name = stateName;
    return this;
  }

  apply(): void {
    
  }

  clone(): this {
    return Object.assign({}, this);
  }

}
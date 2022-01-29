export interface State {
  id: number;
  to: (nextState: any) => boolean;
}

export type ValidatableState<T extends State> = Pick<T, keyof State>;

export interface StateTransition<T extends State> {
  checkIfTransitionPossible: (prevState: ValidatableState<T>) => boolean
  newState: T;
  targetStateName: number;
}

export type TransitionsScheme<T extends State> = { [key: number]: { [key: number]: (state: T) => boolean } }

export type TransitionsScheme2<T extends State> = { 
  [key: number]: { 
    [key: number]: {
      validators: Array<(state: T) => boolean>,
      mutators: Array<(state: T) => Partial<T>>
    } 
  } 
}
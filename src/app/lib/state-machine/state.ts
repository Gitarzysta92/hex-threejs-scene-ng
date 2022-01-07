export interface State {
  id: number;
  to: (nextState: any) => boolean;
}

export interface StateTransition<T extends State> {
  checkIfTransitionPossible: (prevState: T) => boolean
  targetState: number;
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
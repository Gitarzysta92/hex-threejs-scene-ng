export interface State {
  id: number;
  to: (stepId: number) => boolean;
}

export interface StateTransition<T extends State> {
  transition: (prevState: T) => boolean
}

export type TransitionsScheme<T extends State> = { [key: number]: { [key: number]: (state: T) => boolean } }
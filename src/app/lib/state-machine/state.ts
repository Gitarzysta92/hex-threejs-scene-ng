export interface MachineState {
  id: number;
  to: (nextStep: any) => boolean;
}

export interface StateTransition<T extends MachineState> {
  transition: (prevState: T) => boolean
}



import { TransitionsScheme } from "src/app/lib/state-machine/state";
import { GameState } from "./game-state";
import { GameStateName } from "./game-state-name.enum";


export const gameStateTransitionRules: TransitionsScheme<GameState> = {
  [GameStateName.Started]: {
    [GameStateName.Ended]: (state: GameState) => true
  }
}
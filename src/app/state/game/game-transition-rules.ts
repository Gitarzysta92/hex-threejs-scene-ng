import { TransitionsScheme } from "src/app/lib/state-machine/state";  
import { GameState } from "./game-state";
import { GameStateName } from "./game-state-name.enum";


export const gameStateTransitionRules: TransitionsScheme<GameState> = {
  [GameStateName.Preparation]: {
    [GameStateName.Started]: (state: GameState) => true
  },
  [GameStateName.Started]: {
    [GameStateName.Ended]: (state: GameState) => true
  }
}


export const gameStateTransitionRules2 = {
  [GameStateName.Preparation]: {
    [GameStateName.Started]: {
      validators: [isAllPlayersAreReady],
      mutators: [randomizePlayersOrder]
    }
  },
  [GameStateName.Started]: {
    [GameStateName.Ended]: {
      validators: [isAnyWinConditionsHasBeenMet],
      mutators: [setGameWinner]
    }
  }
}


// infrastructure
function isAllPlayersAreReady() {

}

// game logic
function isAnyWinConditionsHasBeenMet() {
  const atLeastOnePlayerHasZeroLife = false;
  const gameTimeIsOver = false;
  const lastFightHasBeenFought = false; 

  return atLeastOnePlayerHasZeroLife ||
    gameTimeIsOver  ||
    lastFightHasBeenFought
}

function randomizePlayersOrder() {

}

function setGameWinner() {

}
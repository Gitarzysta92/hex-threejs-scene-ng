import { TransitionsScheme, TransitionsScheme2 } from "src/app/lib/state-machine/state";  
import { Game } from "src/app/logic/models/game";
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


export const gameStateTransitionRules2: TransitionsScheme2<GameState> = {
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
function isAllPlayersAreReady(state: GameState): boolean {
  return true;
}

// game logic
function isAnyWinConditionsHasBeenMet(state: Game): boolean {
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
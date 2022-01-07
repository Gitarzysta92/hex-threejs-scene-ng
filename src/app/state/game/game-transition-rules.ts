import { TransitionsScheme2 } from "src/app/lib/state-machine/state";  
import { Game } from "src/app/logic/models/game";
import { GameState } from "./game-state";
import { GameStateName } from "./game-state-name.enum";

const gameEnded = {
  validators: [isAnyWinConditionsHasBeenMet],
  mutators: [setGameWinner]
}

export const gameStateTransitionRules: TransitionsScheme2<GameState> = {
  [GameStateName.Preparation]: {
    [GameStateName.Round]: {
      validators: [isAllPlayersAreReady],
      mutators: [randomizePlayersOrder, pickNextPlayer]
    }
  },
  [GameStateName.Round]: {
    [GameStateName.Battle]: {
      validators: [isBattleTileWasUsed],
      mutators: [calculateBattleResults]
    },
    [GameStateName.Ended]: gameEnded
  },
  [GameStateName.Battle]: {
    [GameStateName.Round]: {
      validators: [isBattleEnded],
      mutators: [pickNextPlayer]
    },
    [GameStateName.Ended]: gameEnded
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

function randomizePlayersOrder(state: Game): Game {
  return state;
}

function setGameWinner(state: Game): Game {
  return state;
}
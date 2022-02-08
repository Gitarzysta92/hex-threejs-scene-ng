import { Action } from "rxjs/internal/scheduler/Action";
import { TransitionsScheme } from "src/app/lib/state-machine/state";
import { Board } from "src/app/logic/models/board";
import { Game } from "src/app/logic/models/game";
import { RoundState } from "../round/round-state";
import { RoundStateName } from "../round/round-state-name.enum";
import { GameState } from "./game-state";
import { GameStateName } from "./game-state-name.enum";


const isOnlineGame = false;

export const gameStateTransitionRules: TransitionsScheme<GameState> = {
  [GameStateName.Preparation]: {
    [GameStateName.Round]: {
      validators: [isAllPlayersAreReady],
      mutators: [pickNextPlayer, startNewRound]
    }
  },
  [GameStateName.Round]: {
    [GameStateName.Round]: {
      validators: [isCurrentRoundEnded],
      mutators: [pickNextPlayer, startNewRound]
    },
    [GameStateName.Battle]: {
      validators: [isBattleTileWasUsed],
      mutators: [calculateBattleResults]
    },
    [GameStateName.Ended]: {
      validators: [isAnyWinConditionsHasBeenMet],
      mutators: [setGameWinner]
    }
  },
  [GameStateName.Battle]: {
    [GameStateName.Round]: {
      validators: [isNoWinner],
      mutators: [pickNextPlayer]
    },
    [GameStateName.Ended]: {
      validators: [isAnyWinConditionsHasBeenMet],
      mutators: [setGameWinner]
    }
  }
}


function isCurrentRoundEnded(game: GameState): boolean {
  return game.round.stateName == RoundStateName.Ended;
}


function startNewRound(state: GameState): GameState {
  const prevRound = state.round;
  state.round = new RoundState(state.currentPlayer, prevRound);
  return state; 
}

function pickNextPlayer(game: GameState): GameState {
  let currentInitiative = game.currentPlayer.initiative 
  const nextInitiative = currentInitiative == null || currentInitiative === game.players.length - 1 ? 0 : ++currentInitiative;
  const player = game.players.find(p => p.initiative === nextInitiative);
  if (player == null) {
    throw new Error();
  }
  game.currentPlayer = player;
  return game;
}


// infrastructure
function isAllPlayersAreReady(game: GameState): boolean {
  return game.players.every(p => p.ready);
}

// game logic
function isNoWinner(game: Game): boolean {
  return !isAnyWinConditionsHasBeenMet(game);
}



function isAnyWinConditionsHasBeenMet(game: Game): boolean {
  const atLeastOnePlayerHasZeroLife = false;
  const gameTimeIsOver = false;
  const lastFightHasBeenFought = false; 

  return atLeastOnePlayerHasZeroLife ||
    gameTimeIsOver  ||
    lastFightHasBeenFought
}

function randomizePlayersOrder(state: Game): Game {
  let i = state.players.length;
  let players = [...state.players];

  while(i >= 0) {
    const r = Math.floor(Math.random() * i);
    players = players.filter((p, i) => {
      if (i == r) 
        p.initiative = i;
      return i !== r;  
    });
    --i;
  }
  
  return state;
}

function setGameWinner(state: Game): Game {
  return state;
}

function isBattleTileWasUsed(game: GameState, ): boolean {
  const a = game.round.currentActivity.name === 'UseInstantAction';
  return game.round.actions.last().tileId === game.round.currentActivity.tileId;
}



function calculateBattleResults(game: Game): Game {
  game.board = evaluateBattle(game.board);
  return game;
} 







function evaluateBattle(board: Board): Board {
  return new Board();
}


  



















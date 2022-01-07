import { TransitionsScheme2 } from "src/app/lib/state-machine/state";
import { Player } from "src/app/logic/models/player";
import { PlayerState } from "./player-state";
import { PlayerStateName } from "./player-state-name.enum";


export const gameStateTransitionRules2: TransitionsScheme2<PlayerState> = {
  [PlayerStateName.Idle]: {
    [PlayerStateName.Active]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: []
    },
    [PlayerStateName.Reactive]: {
      validators: [isPlayerReady, isPlayerNeedToMakeReaction],
      mutators: [addAction]
    }
  },
  [PlayerStateName.Active]: {
    [PlayerStateName.Idle]: {
      validators: [],
      mutators: []
    }
  },
  [PlayerStateName.Reactive]: {
    [PlayerStateName.Idle]: {
      validators: [isPlayerUtilizedReactiveAction],
      mutators: []
    }
  }
}


function isPlayerReady(state: PlayerState): boolean {
  return true;
}

function isPlayerRoundStarted(state: Player): boolean {
  return true;
}

function drawTiles(state: Player): Player {
  return state;
}

function isPlayerNeedToMakeReaction(state: PlayerState): boolean {
  return true;
}

function addAction(state: Player): Player {
  return state;
} 

function isPlayerUtilizedReactiveAction(state: Player): boolean {
  return true;
}



// export const playerStateTransitionRules: TransitionsScheme<PlayerState> = {
//   [PlayerStateName.Active]: {
//     [PlayerStateName.Idle]: (state: PlayerState) => state.round.id === RoundStateName.Ended
//   },
//   [PlayerStateName.Idle]: {
//     [PlayerStateName.Reactive]: (state: PlayerState) => !!state.pendingDecision 
//   },
//   [PlayerStateName.Reactive]: {
//     [PlayerStateName.Idle]: (state: PlayerState) => !state.pendingDecision 
//   }
// }
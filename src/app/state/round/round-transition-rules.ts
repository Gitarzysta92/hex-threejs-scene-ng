import { TransitionsScheme2 } from "../../lib/state-machine/state";
import { RoundState } from "./round-state";
import { RoundStateName } from "./round-state-name.enum";


export const roundStateTransitionRules2: TransitionsScheme2<RoundState> = {
  [RoundStateName.Started]: {
    [RoundStateName.ChoosingTileToDiscard]: {
      validators: [isPlayerHaveThreeTiles],
      mutators: [drawTiles]
    },
  },
  [RoundStateName.ChoosingTileToDiscard]: {
    [RoundStateName.TilesManage]: {
      validators: [isPlayerHaveTwoTiles],
      mutators: []
    },
  },
  [RoundStateName.TilesManage]: {
    [RoundStateName.UtilizingTile]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: [drawTiles]
    },
    [RoundStateName.TileManipulation]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: [drawTiles]
    },
    [RoundStateName.Ended]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: [drawTiles]
    },
  },
  [RoundStateName.UtilizingTile]: {
    [RoundStateName.TilesManage]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: [drawTiles]
    },
  },
  [RoundStateName.TileManipulation]: {
    [RoundStateName.TilesManage]: {
      validators: [isPlayerReady, isPlayerRoundStarted],
      mutators: [drawTiles]
    },
  },
}






// export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
//   [RoundStateName.Started]: {
//     [RoundStateName.ChoosingTileToDiscard]: (state: RoundState) => state.holdedTiles.length === 3
//   },
//   [RoundStateName.ChoosingTileToDiscard]: {
//     [RoundStateName.TilesManage]: (state: RoundState) => state.holdedTiles.length === 2
//   },
//   [RoundStateName.TilesManage]: {
//     [RoundStateName.UtilizingTile]: (state: RoundState) => !!state.utilizingTile,
//     [RoundStateName.TileManipulation]: (state: RoundState) => !!state.utilizingTile,
//     [RoundStateName.Ended]: () => true
//   },
//   [RoundStateName.UtilizingTile]: {
//     [RoundStateName.TilesManage]: (state: RoundState) => !state.utilizingTile,
//   },
//   [RoundStateName.TileManipulation]: {
//     [RoundStateName.TilesManage]: (state: RoundState) => !state.utilizingTile
//   },
//   [RoundStateName.Ended]: {
//     [RoundStateName.Started]: (state: RoundState) => state.playerId !== state.prevRound.playerId
//   }
// }
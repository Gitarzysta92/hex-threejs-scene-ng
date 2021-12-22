import { TransitionsScheme } from "../lib/state-machine/state";
import { RoundState } from "./round-state";
import { RoundStateName } from "./state-name.enum";

export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
  [RoundStateName.Started]: {
    [RoundStateName.ChoosingTileToDiscard]: (state: RoundState) => state.holdedTiles.length === 3
  },
  [RoundStateName.ChoosingTileToDiscard]: {
    [RoundStateName.TilesManage]: (state: RoundState) => state.holdedTiles.length === 2
  },
  [RoundStateName.TilesManage]: {
    [RoundStateName.UtilizingTile]: (state: RoundState) => !!state.utilizingTile,
    [RoundStateName.TileManipulation]: (state: RoundState) => !!state.utilizingTile,
    [RoundStateName.Ended]: () => true
  },
  [RoundStateName.UtilizingTile]: {
    [RoundStateName.TilesManage]: (state: RoundState) => !state.utilizingTile,
    [RoundStateName.Battle]: (state: RoundState) => true
  },
  [RoundStateName.TileManipulation]: {
    [RoundStateName.TilesManage]: (state: RoundState) => !state.utilizingTile
  },
  [RoundStateName.Battle]: { },
  [RoundStateName.Ended]: {
    [RoundStateName.Started]: (state: RoundState) => state.playerId !== state.prevRound.playerId
  }
}
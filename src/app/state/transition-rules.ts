import { TransitionsScheme } from "../lib/state-machine/state";
import { RoundState, RoundStateName as State } from "./round-state";


export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
  [State.Started]: {
    [State.ChoosingTileToDiscard]: (state: RoundState) => state.holdedTiles.length === 3
  },
  [State.ChoosingTileToDiscard]: {
    [State.TilesManage]: (state: RoundState) => state.holdedTiles.length === 2
  },
  [State.TilesManage]: {
    [State.UtilizingTile]: (state: RoundState) => !!state.utilizingTile,
    [State.TileManipulation]: (state: RoundState) => !!state.utilizingTile,
    [State.Ended]: () => true
  },
  [State.UtilizingTile]: {
    [State.TilesManage]: (state: RoundState) => !state.utilizingTile,
    [State.Battle]: (state: RoundState) => true
  },
  [State.TileManipulation]: {
    [State.TilesManage]: (state: RoundState) => !state.utilizingTile
  },
  [State.Battle]: { },
  [State.Ended]: {
    [State.Started]: (state: RoundState) => state.playerId !== state.prevRound.playerId
  }
}
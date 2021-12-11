import { TransitionsScheme } from "../lib/state-machine/state";
import { RoundState, RoundStateName as State } from "./round-state";


export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
  [State.Started]: {
    [State.ChoosingTileToDiscard]: (state: RoundState) => state.tiles.length === 3
  },
  [State.ChoosingTileToDiscard]: {
    [State.TilesManage]: (state: RoundState) => state.tiles.length < 3
  },
  [State.TilesManage]: {
    [State.UtilizingTile]: (state: RoundState) => !!state.disposingToken,
    [State.TileManipulation]: (state: RoundState) => !!state.disposingToken,
    [State.Ended]: () => true
  },
  [State.UtilizingTile]: {
    [State.TilesManage]: (state: RoundState) => !state.disposingToken,
    [State.Battle]: (state: RoundState) => true
  },
  [State.TileManipulation]: {
    [State.TilesManage]: (state: RoundState) => !state.disposingToken
  },
  [State.Battle]: { },
  [State.Ended]: {
    [State.Started]: (state: RoundState) => state.playerId !== state.prevRound.playerId
  }
}
// export enum RoundStateName {
//   Preparation,
//   Started,
//   ChoosingTileToDiscard,
//   TilesManage,
//   UtilizingTile,
//   TileManipulation,
//   Battle,
//   Ended,
//   PlacingTileOnTheBoard,
//   UtilizingInstantActionTile
// }

export type RoundStateName = string;

export const roundStateName = {
  Started: 'Started',
  ChoosingTileToDiscard: 'ChoosingTileToDiscar',
  TilesManage: 'TilesManage',
  UtilizingTile: 'UtilizingTile',
  TileManipulation: 'TileManipulation',
  Battle: 'Battle',
  Ended: 'Ended',
  PlacingTileOnTheBoard: 'PlacingTileOnTheBoard',
  UtilizingInstantActionTile: 'UtilizingInstantActionTile'
} 

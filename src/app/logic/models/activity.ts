export interface Activity {
  name: 'PickTileFromHoldedTiles' | 'PickTileFromTheBoard' | 'PutTileOnTheBoard' | 'UseInstantAction' | 'UseTileAbility' | 'DiscardTiles'
  tileId: string
  tilesIds: string[]
  targetFieldId: string
}
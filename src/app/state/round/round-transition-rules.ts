
import { Action } from "src/app/logic/models/action";
import { Tile } from "src/app/logic/models/tile";
import { TransitionsScheme } from "../../lib/state-machine/state";
import { RoundState } from "./round-state";
import { RoundStateName } from "./round-state-name.enum";


export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
  [RoundStateName.Preparation]: {
    [RoundStateName.Started]: {
      validators: [],
      mutators: [spawnActions, applyPassives]
    },
  },
  [RoundStateName.Started]: {
    [RoundStateName.ChoosingTileToDiscard]: {
      validators: [],
      mutators: [drawTiles]
    },
  },
  [RoundStateName.ChoosingTileToDiscard]: {
    [RoundStateName.TilesManage]: {
      validators: [isPlayerChooseTilesToDiscard],
      mutators: [discardTiles]
    },
  },
  [RoundStateName.TilesManage]: {
    [RoundStateName.PlacingTileOnTheBoard]: {
      validators: [
        isPlayerHoldLessOrEqualTilesThanMaximum, 
        isPlayerHasAtLeasOneHoldedTile,
        isPlayerChooseTileFromHoldedTiles,
        isChoosenTileIsOfUnitType
      ],
      mutators: [pickTileFromHoldedTiles]
    },
    [RoundStateName.UtilizingInstantActionTile]: {
      validators: [
        isPlayerHoldLessOrEqualTilesThanMaximum, 
        isPlayerHasAtLeasOneHoldedTile,
        isPlayerChooseTileFromHoldedTiles,
        isChoosenTileIsOfInstantActionType
      ],
      mutators: [pickTileFromHoldedTiles]
    },
    [RoundStateName.TileManipulation]: {
      validators: [
        isExistsActionThatCanBeApplyedToChoosenTile,
        isPlayerChooseTileFromTilesOnTheBoard
      ],
      mutators: [pickTileFromTheBoard]
    },
    [RoundStateName.Ended]: {
      validators: [isPlayerHoldLessOrEqualTilesThanMaximum],
      mutators: []
    },
  },
  [RoundStateName.PlacingTileOnTheBoard]: {
    [RoundStateName.TilesManage]: {
      validators: [isTileCanBePlacedOnTargetField],
      mutators: [putTileOnTheBoard]
    },
  },
  [RoundStateName.UtilizingInstantActionTile]: {
    [RoundStateName.TilesManage]: {
      validators: [isTileCanBePlacedOnTargetField],
      mutators: [useInstantAction]
    },
  },
  [RoundStateName.TileManipulation]: {
    [RoundStateName.TilesManage]: {
      validators: [isTileCanBePlacedOnTargetField],
      mutators: [putTileOnTheBoard]
    },
  },
};

//
// Validators
//
function isPlayerChooseTilesToDiscard(round: RoundState): boolean {
  const { tileId, name } = round.currentActivity;
  return name === 'DiscardTiles' && !!tileId;
}

function isPlayerHoldLessOrEqualTilesThanMaximum(round: RoundState): boolean {
  return round.holdedTiles.length >= 3;
}

function isPlayerHasAtLeasOneHoldedTile(round: RoundState): boolean {
  return round.holdedTiles.length > 0;
}

function isExistsActionThatCanBeApplyedToChoosenTile(round: RoundState): boolean {
  return round.holdedTiles.length > 0;
}

function isTileCanBePlacedOnTargetField(round: RoundState): boolean {
  const { tileId, targetFieldId } = round.currentActivity;

  if (!tileId || !targetFieldId)
    return false;

  const boardField = round.board.getField(targetFieldId);
  return boardField.isOccupied;
}

function isPlayerChooseTileFromHoldedTiles(round: RoundState): boolean {
  const tileId = round.currentActivity.tileId;
  return round.holdedTiles.some(t => t.id === tileId);
}

function isPlayerChooseTileFromTilesOnTheBoard(round: RoundState): boolean {
  const tile = round.currentActivity.tileId;
  return round.board.fields.some(f => f.tiles.some(t => t.id === tile));
}

function isChoosenTileIsOfUnitType(round: RoundState): boolean {
  return round.currentActivity.name === 'PutTileOnTheBoard';
}

function isChoosenTileIsOfInstantActionType(round: RoundState): boolean {
  return round.currentActivity.name === 'UseInstantAction'
}

//
// Mutators
//
function drawTiles(round: RoundState): RoundState {
  const holded = round.player.holdedTiles;
  const deck = round.player.deck;

  while(holded.length < round.tilesLimit) {
    holded.push(deck.pop());
  }

  return round;
}

function discardTiles(round: RoundState): RoundState {
  round.holdedTiles = round.holdedTiles.filter(t => 
    round.currentActivity.tilesIds.some(id => t.id === id));
  return round;  
}

function spawnActions(round: RoundState): RoundState {
  const tiles = round.board.getTiles(round.playerId);
  round.availableActions = tiles.reduce((acc: Action[], t: Tile) => 
    [...acc, t.spawnActions()], [])
  return round;
}

function applyPassives(round: RoundState): RoundState {
  const tiles = round.board.getTiles(round.playerId);
  round.availableActions = tiles.reduce((acc: Action[], t: Tile) => 
    [...acc, t.spawnActions()], [])
  return round;
}

function pickTileFromHoldedTiles(round: RoundState): RoundState {
  const tileId = round.currentActivity.tileId;
  round.utilizingTile = round.holdedTiles.find(t => t.id == tileId);
  round.holdedTiles = round.holdedTiles.filter(t => t.id != tileId);
  return round;
}

function pickTileFromTheBoard(round: RoundState): RoundState {
  const tileId = round.currentActivity.tileId;
  round.utilizingTile = round.board.getTile(tileId);
  round.board.removeTile(tileId);
  return round;
}

function putTileOnTheBoard(round: RoundState): RoundState {
  return round.board.occupiedField(round.utilizizingTile);
}

function useInstantAction(round: RoundState): RoundState {
  return round;
}
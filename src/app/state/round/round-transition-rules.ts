import { TransitionsScheme } from "../../lib/state-machine/state";
import { RoundState } from "./round-state";
import { roundStateName as state} from "./round-state-name.enum";


export const roundStateTransitionRules: TransitionsScheme<RoundState> = {
  [state.Started]: {
    [state.ChoosingTileToDiscard]: {
      validators: [],
      mutators: [drawTiles]
    },
  },
  [state.ChoosingTileToDiscard]: {
    [state.TilesManage]: {
      validators: [isPlayerChooseTilesToDiscard],
      mutators: [discardTiles]
    },
  },
  [state.TilesManage]: {
    [state.PlacingTileOnTheBoard]: {
      validators: [
        isPlayerHoldLessOrEqualTilesThanMaximum, 
        isPlayerHasAtLeasOneHoldedTile,
        isPlayerChooseTileFromHoldedTiles,
        isChoosenTileIsOfUnitType
      ],
      mutators: [pickTileFromHoldedTiles]
    },
    [state.UtilizingInstantActionTile]: {
      validators: [
        isPlayerHoldLessOrEqualTilesThanMaximum, 
        isPlayerHasAtLeasOneHoldedTile,
        isPlayerChooseTileFromHoldedTiles,
        isChoosenTileIsOfInstantActionType
      ],
      mutators: [pickTileFromHoldedTiles]
    },
    [state.TileManipulation]: {
      validators: [
        isExistsActionThatCanBeApplyedToChoosenTile,
        isPlayerChooseTileFromTilesOnTheBoard
      ],
      mutators: [pickTileFromTheBoard]
    },
    [state.Ended]: {
      validators: [],
      mutators: [discardRandomTilesToEqualMaximum]
    },
  },
  [state.PlacingTileOnTheBoard]: {
    [state.TilesManage]: {
      validators: [isTileCanBePlacedOnTargetField],
      mutators: [putTileOnTheBoard]
    },
  },
  [state.UtilizingInstantActionTile]: {
    [state.TilesManage]: {
      validators: [isTileCanBePlacedOnTargetField],
      mutators: [useInstantAction]
    }
  },
  [state.TileManipulation]: {
    [state.TilesManage]: {
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

function discardRandomTilesToEqualMaximum(round: RoundState): RoundState { 
  return round;
}
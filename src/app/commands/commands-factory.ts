import { Injectable } from "@angular/core";
import { CommandBusService } from "../lib/command-bus/command-bus.service";
import { GameLogicService } from "../services/game-logic/game-logic.service";
import { SceneService } from "../services/scene/scene.service";
import { TilesRepositoryService } from "../services/tiles-repository/tiles-repository.service";
import { MakeTileAction } from "./high-order/make-tile-action.command";
import { AssignTile } from "./state-mutators/assign-tile.command";
import { MoveTile } from "./state-mutators/move-tile.command";
import { RotateTile, RotationDirection } from "./state-mutators/rotate-tile.command";
import { ConfirmTileAction } from "./state-transitions/confirm-tile-action.command";
import { DiscardTile } from "./state-transitions/discard-tile.command";
import { DrawTiles } from "./state-transitions/draw-tiles.command";
import { FinishRound } from "./state-transitions/finish-round.command";
import { PickTileForManipulation } from "./state-transitions/pick-tile-for-manipulation.command";
import { StartNewRound } from "./state-transitions/start-new-round.command";
import { UtilizeTile } from "./state-transitions/utilize-tile.command";

@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService,
    private readonly _tilesRepositoryService: TilesRepositoryService,
    private readonly _commandBusService: CommandBusService
  ) { }

  // state transitions

  public startRound(playerId: string): StartNewRound {
    return new StartNewRound(
      this._sceneService,
      this._gameLogicService
    ).setParameters(playerId);
  }

  public finishRound(): FinishRound {
    return new FinishRound(
      this._sceneService,
      this._gameLogicService
    )
  }

  public drawTiles(): DrawTiles {
    return new DrawTiles(
      this._sceneService,
      this._gameLogicService,
      this._tilesRepositoryService
    )
  }

  public discardTile(tileId: number): DiscardTile {
    return new DiscardTile(
      this._sceneService,
      this._gameLogicService
    ).setParameters(tileId);
  }

  public utilizeTile(tileId: number) {
    return new UtilizeTile(
      this._sceneService,
      this._gameLogicService,
      this._tilesRepositoryService
    ).setParameters(tileId);
  }

  public pickTileForManipulation(tileId: number) {
    return new PickTileForManipulation(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(tileId);
  }

  public confirmTileAction() {
    return new ConfirmTileAction(
      this._sceneService,
      this._gameLogicService 
    )
  }

  // state mutators

  public moveTile(targetFieldId: number) {
    return new MoveTile(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(targetFieldId);
  }

  public rotateTile(tileId: number, direction: RotationDirection) {
    return new RotateTile(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(tileId, direction);
  }

  public assignTile(): AssignTile {
    return new AssignTile(
      this._sceneService,
      this._gameLogicService 
    )
  }

  // high order

  public makeTileAction(viewportCoords: { [key: string]: number }): MakeTileAction {
    return new MakeTileAction(
      this._sceneService,
      this._commandBusService,
      this._gameLogicService,
      this
    ).setParameters(viewportCoords)
  }


}
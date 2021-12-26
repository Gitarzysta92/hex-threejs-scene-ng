import { Injectable } from "@angular/core";
import { CommandBusService } from "../lib/command-bus/command-bus.service";
import { GameLogicService } from "../services/game-logic/game-logic.service";
import { GameStateService } from "../services/game-state/game-state.service";
import { Coords, SceneService } from "../services/scene/scene.service";
import { TilesRepositoryService } from "../services/tiles-repository/tiles-repository.service";
import { MakeTileAction } from "./high-order/make-tile-action.command";
import { ApplyTile } from "./state-mutators/apply-tile.command";
import { AssignTile } from "./state-mutators/assign-tile.command";
import { MoveTile } from "./state-mutators/move-tile.command";
import { RotateTile, RotationDirection } from "./state-mutators/rotate-tile.command";
import { ConfirmTileAction } from "./state-transitions/confirm-tile-action.command";
import { DiscardTiles } from "./state-transitions/discard-tiles.command";
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
    private readonly _gameStateService: GameStateService,
    private readonly _tilesRepositoryService: TilesRepositoryService,
    private readonly _commandBusService: CommandBusService
  ) { }

  // state transitions

  public startRound(playerId: string): StartNewRound {
    return new StartNewRound(
      this._gameStateService
    ).setParameters(playerId);
  }

  public finishRound(): FinishRound {
    return new FinishRound(
      // this._sceneService,
      // this._gameLogicService
    )
  }

  public drawTiles(): DrawTiles {
    return new DrawTiles(
      this._sceneService,
      this._gameStateService,
      this._tilesRepositoryService
    )
  }

  public discardTiles(tileId: string[]): DiscardTiles {
    return new DiscardTiles(
      this._sceneService,
      this._gameStateService,
    ).setParameters(tileId);
  }

  public utilizeTile(tileId: string) {
    return new UtilizeTile(
      this._sceneService,
      this._gameLogicService,
      this._tilesRepositoryService
    ).setParameters(tileId);
  }

  public pickTileForManipulation(tileId: string) {
    return new PickTileForManipulation(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(tileId);
  }

  public confirmTileAction() {
    return new ConfirmTileAction(
      this._sceneService
    )
  }

  // state mutators

  public moveTile(tileId: string, targetFieldId: number): MoveTile {
    return new MoveTile(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(tileId, targetFieldId);
  }

  public rotateTile(tileId: string, direction: RotationDirection): RotateTile {
    return new RotateTile(
      this._sceneService,
      this._gameLogicService 
    ).setParameters(tileId, direction);
  }

  public assignTile(tileId: string, targetFieldId: number): AssignTile {
    return new AssignTile(
      this._sceneService
    ).setParameters(tileId, targetFieldId)
  }

  public applyTile(tileId: string): ApplyTile {
    return new ApplyTile(
      this._sceneService
    ).setParameters(tileId);
  }

  // high order

  public makeTileAction(viewportCoords: Coords): MakeTileAction {
    return new MakeTileAction(
      this._sceneService,
      this._commandBusService,
      this._gameStateService,
      this
    ).setParameters(viewportCoords)
  }
}
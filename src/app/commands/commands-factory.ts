import { Injectable, Injector } from "@angular/core";
import { resolve } from "dns";
import { BaseCommand } from "../lib/command-bus/base-command";
import { CommandBusService } from "../lib/command-bus/command-bus.service";
import { Player } from "../logic/models/player";
import { Tile } from "../logic/models/tile";
import { GameStateService } from "../services/game-state/game-state.service";
import { RoundStateService } from "../services/round-state/round-state.service";
import { Coords, SceneService } from "../services/scene/scene.service";
import { TilesRepositoryService } from "../services/tiles-repository/tiles-repository.service";
import { GameState } from "../state/game/game-state";
import { PlayerState } from "../state/player/player-state";
import { RoundState } from "../state/round/round-state";
import { MakeTileAction } from "./high-order/make-tile-action.command";
import { ApplyTile } from "./state-mutators/apply-tile.command";
import { AssignTile } from "./state-mutators/assign-tile.command";
import { MoveTile } from "./state-mutators/move-tile.command";
import { RotateTile, RotationDirection } from "./state-mutators/rotate-tile.command";
import { UnassignTile } from "./state-mutators/unassign-tile.command";
import { ConfirmTileAction } from "./state-transitions/confirm-tile-action.command";
import { DiscardTiles } from "./state-transitions/discard-tiles.command";
import { DrawTiles } from "./state-transitions/draw-tiles.command";
import { FinishRound } from "./state-transitions/finish-round.command";
import { PickTileForManipulation } from "./state-transitions/pick-tile-for-manipulation.command";
import { StartGame } from "./state-transitions/start-game.command";
import { StartNewRound } from "./state-transitions/start-new-round.command";
import { UtilizeTile } from "./state-transitions/utilize-tile.command";

@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(
    private readonly _roundStateService: RoundStateService,
    private readonly _gameStateService: GameStateService,
    private readonly _playerStateService: PlayerStateService
  ) { }

  public create<T>(command: new(...args: any[]) => T): T {
    return Injector.create({
      providers: [
        {
          provide: command, 
          deps: [
            SceneService,
            GameStateService,
            RoundStateService,
            TilesRepositoryService,
            CommandBusService,
            {
              provide: RoundState,
              useFactory: this._roundStateService.getState(),
            },
            {
              provide: GameState,
              useFactory: this._gameStateService.getState(),
            },
            {
              provide: PlayerState,
              useFactory: this._playerStateService.getState(),
            }
          ]
        }
      ]
    }).get(command);
  }
}

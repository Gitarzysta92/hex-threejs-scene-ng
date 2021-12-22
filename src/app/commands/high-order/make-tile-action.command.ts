import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { CommandBusService } from "src/app/lib/command-bus/command-bus.service";
import { TileType } from "src/app/logic/consts/hierarchical-tile-types-model";
import { GameStateService } from "src/app/services/game-state/game-state.service";
import { Coords, SceneService } from "src/app/services/scene/scene.service";
import { RoundStateName } from "src/app/state/state-name.enum";

import { CommandsFactory } from "../commands-factory";


export class MakeTileAction extends BaseCommand {
  private _coords!: Coords;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _commandBus: CommandBusService,
    private readonly _gameState: GameStateService,
    private readonly _commandsFactory: CommandsFactory
  ) {
    super();
  }
  
  setParameters(coords: Coords): this {
    this._coords = coords;
    return this;
  }

  execute(): void {
    const result = this._sceneService.getTargetedElements(this._coords);
    if (result.length > 0)
    return;

    const currentState = this._gameState.getCurrentRoundState();
    const utilizingTile = currentState?.utilizingTile

    if (!utilizingTile) {
      return;
    }

    if (utilizingTile.type === TileType.Unit) {
      switch (currentState.id) {
        case RoundStateName.UtilizingTile:
          this._attachTile(utilizingTile.id, result[0] as any);
          break;
        case RoundStateName.TileManipulation:
          this._moveTile(utilizingTile.id, result[0] as any);
          break;
        default:
          break;
      }
    } else {
      this._applyTile(utilizingTile.id);
    }
  }

  private _applyTile(tileId: string): void {
    const command = this._commandsFactory.applyTile(tileId)
    this._commandBus.dispatch(command);
  }

  private _attachTile(currentTileId: string, targetFieldId: number): void {
    const command = this._commandsFactory.assignTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _moveTile(currentTileId: string, targetFieldId: number): void {
    const command = this._commandsFactory.moveTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }
}
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
    const currentState = this._gameState.getCurrentRoundState();
    const utilizingTile = currentState?.utilizingTile;
    const targetedField = this._sceneService.getTargetedField(this._coords);

    if (!utilizingTile)
      return;
    

    const utilizedTileShouldBeAssignedToField = utilizingTile?.type === TileType.Unit && 
      !!targetedField && currentState.id === RoundStateName.UtilizingTile;

    if (utilizedTileShouldBeAssignedToField) {
      this._assignTile(utilizingTile.id, targetedField);
      this._pickTileForManipulation(utilizingTile.id);
    }

    const chooseTileToUtilization = !utilizingTile && targetedField.isOccupied() && 
      currentState.id === RoundStateName.TilesManage;

    if (chooseTileToUtilization) {
      const targetTileId = targetedField.getAssignedTileId();
      this._pickTileForManipulation(targetTileId);
    }

    const isTargetedInstantAction = utilizingTile?.type === TileType.InstantAction && 
      currentState.id === RoundStateName.TileManipulation
    if (isTargetedInstantAction) {
      this._applyTile(utilizingTile.id); 
    }
  }

  private _applyTile(tileId: string): void {
    const command = this._commandsFactory.applyTile(tileId)
    this._commandBus.dispatch(command);
  }

  private _assignTile(currentTileId: string, targetFieldId: number): void {
    const command = this._commandsFactory.assignTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _moveTile(currentTileId: string, targetFieldId: number): void {
    const command = this._commandsFactory.moveTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _pickTileForManipulation(currentTileId: string): void {
    const command = this._commandsFactory.pickTileForManipulation(currentTileId);
    this._commandBus.dispatch(command);
  }

}
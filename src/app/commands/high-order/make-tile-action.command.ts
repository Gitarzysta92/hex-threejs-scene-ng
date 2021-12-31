import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { CommandBusService } from "src/app/lib/command-bus/command-bus.service";
import { TileType } from "src/app/logic/consts/hierarchical-tile-types-model";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { Coords, SceneService } from "src/app/services/scene/scene.service";
import { RoundStateName } from "src/app/state/round/round-state-name.enum";

import { CommandsFactory } from "../commands-factory";


export class MakeTileAction extends BaseCommand {
  private _coords!: Coords;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _commandBus: CommandBusService,
    private readonly _gameState: RoundStateService,
    private readonly _commandsFactory: CommandsFactory
  ) {
    super();
  }
  
  setParameters(coords: Coords): this {
    this._coords = coords;
    return this;
  }

  execute(): void {
    const currentState = this._gameState.getState();
    const utilizingTile = currentState?.utilizingTile;
    const targetedField = this._sceneService.getTargetedField(this._coords);
    const tile = this._sceneService.getTile(utilizingTile.id);


    const utilizedTileShouldBeAssignedToField = utilizingTile?.type === TileType.Unit && 
      !!targetedField && currentState.id === RoundStateName.UtilizingTile;

    if (utilizedTileShouldBeAssignedToField) {
      this._assignTile(utilizingTile.id, targetedField.id);
      this._pickTileForManipulation(utilizingTile.id);
      return;
    }

    const isTargetedInstantAction = utilizingTile?.type === TileType.InstantAction && 
    currentState.id === RoundStateName.UtilizingTile
    if (isTargetedInstantAction) {
      this._applyTile(utilizingTile.id);
      return;
    }
      

    

    const manipulatedTileShouldBeAssignedToField = utilizingTile?.type === TileType.Unit && 
      !!targetedField && currentState.id === RoundStateName.TileManipulation && !tile?.takesField;
    if (manipulatedTileShouldBeAssignedToField) {
      this._assignTile(utilizingTile.id, targetedField.id);
      return;
    }
      


    const clickedTileShouldBeUnassignedFromField = 
      utilizingTile?.type === TileType.Unit &&
      currentState.id === RoundStateName.TileManipulation &&
      !!tile?.takesField && 
      targetedField?.id === tile?.takesField;
    if (clickedTileShouldBeUnassignedFromField) {
      this._unassignTile(utilizingTile.id);
      return;
    }
      
   
    
    const assignedTile = this._sceneService.getAssignedTile(targetedField?.id || '');
    const chooseTileForManipulation = !!assignedTile && 
      currentState.id === RoundStateName.TilesManage;
    if (chooseTileForManipulation) {
      this._pickTileForManipulation(assignedTile.id);
      return;
    }
      

  }

  private _applyTile(tileId: string): void {
    const command = this._commandsFactory.applyTile(tileId)
    this._commandBus.dispatch(command);
  }

  private _assignTile(currentTileId: string, targetFieldId: string): void {
    const command = this._commandsFactory.assignTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _unassignTile(currentTileId: string): void {
    const command = this._commandsFactory.unasignTile(currentTileId);
    this._commandBus.dispatch(command);
  }

  private _moveTile(currentTileId: string, targetFieldId: string): void {
    const command = this._commandsFactory.moveTile(currentTileId, targetFieldId);
    this._commandBus.dispatch(command);
  }

  private _pickTileForManipulation(currentTileId: string): void {
    const command = this._commandsFactory.pickTileForManipulation(currentTileId);
    this._commandBus.dispatch(command);
  }

}
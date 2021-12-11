import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { CommandBusService } from "src/app/lib/command-bus/command-bus.service";
import { TileType } from "src/app/logic/consts/hierarchical-tile-types-model";
import { RoundState } from "src/app/logic/models/round";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { CommandsFactory } from "../commands-factory";

type Coords = { [key: string]: number };

export class MakeTileAction extends BaseCommand {
  private _coords!: Coords;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _commandBus: CommandBusService,
    private readonly _gameLogicService: GameLogicService,
    private readonly _commandsFactory: CommandsFactory
  ) {
    super();
  }
  
  setParameters(coords: Coords): this {
    this._coords = coords;
    return this;
  }

  execute(): void {
    const result = this._sceneService.view.intersect(this._coords);
    if (result.length > 0)
    return;

    const currentState = this._gameLogicService.getState();
    const targetTile = currentState.targetTile

    if (targetTile.type === TileType.Unit) {
      switch (currentState) {
        case RoundState.UtilizingTile:
            this._attachTile();
          break;
        case RoundState.TileManipulation:
            this._moveTile(fieldId);
          break;
        default:
          break;
      }
    } else {
      this._applyTile();
    }
  }

  private _attachTile(): void {
    const command = this._commandsFactory.assignTile();
    this._commandBus.dispatch(command);
  }

  private _moveTile(targetFieldId: number): void {
    const command = this._commandsFactory.moveTile(targetFieldId);
    this._commandBus.dispatch(command);
  }

}





// this.viewState.intersect !== 'idle'
// this.viewState.intersect !== 'targetField'
// if (this.viewState.intersect !== 'targetTile')
// return;
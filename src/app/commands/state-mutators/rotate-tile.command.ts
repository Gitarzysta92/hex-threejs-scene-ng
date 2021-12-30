import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { SceneService } from "src/app/services/scene/scene.service";


export enum RotationDirection {
  Clockwise,
  CounterClockwise
}

export class RotateTile extends BaseCommand implements Revertable {
  private _tileId!: string;
  private _direction!: RotationDirection;

  constructor(
    private readonly _sceneService: SceneService,
  ) {
    super();
  } 

  setParameters(tileId: string, direction: RotationDirection): this {
    this._tileId = tileId;
    this._direction = direction;
    return this;
  }

  execute(): void {
    const tile = this._sceneService.getTile(this._tileId);
    this._sceneService.rotateToken(tile);
  }

  revert(): void {
    
  };
}
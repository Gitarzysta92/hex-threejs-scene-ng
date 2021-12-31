import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { SceneService } from "src/app/services/scene/scene.service";

export class AssignTile extends BaseCommand implements Revertable {

  private _tileId!: string;
  private _targetFieldId!: string;

  constructor(
    private readonly _sceneService: SceneService,
  ) {
    super();
  }

  setParameters(tileId: string, targetFieldId: string): this {
    this._tileId = tileId;
    this._targetFieldId = targetFieldId;

    return this;
  }

  execute(): void {
    this._sceneService.dragManager.stopDragging();
    const tile = this._sceneService.getTile(this._tileId);
    const field = this._sceneService.getField(this._targetFieldId);
    this._sceneService.attachTileToField(tile, field);
  }

  revert(): void {
    const token = this._sceneService.getTile(this._tileId)
    if (!token)
      return;
    this._sceneService.detachTileFromField(token);
  };
  
}
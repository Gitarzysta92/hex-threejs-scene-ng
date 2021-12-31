import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { RoundStateService } from "src/app/services/round-state/round-state.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round/round-state";

export class UnassignTile extends BaseCommand implements Revertable {

  private _tileId!: string;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _state: RoundStateService
  ) {
    super();
  }

  setParameters(tileId: string): this {
    this._tileId = tileId;
    return this;
  }

  execute(): void {
    const tile = this._sceneService.getTile(this._tileId);
    if (!tile)
      return;
    this._sceneService.detachTileFromField(tile);

    // const currentState = this._state.getCurrentRoundState();
    // const newState = new RoundState(currentState);
    // newState.utilizingTile = null as unknown as any;
    // this._state.applyRoundState(newState);
  }

  revert(): void {
    // const token = this._sceneService.getTile(this._tileId)
    // const field = this._sceneService.getField(this._targetFieldId)
    // this._sceneService.detachTileFromField(token, field);
  };
  
}
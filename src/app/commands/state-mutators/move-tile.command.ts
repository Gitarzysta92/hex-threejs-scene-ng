import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { SceneService } from "src/app/services/scene/scene.service";

export class MoveTile extends BaseCommand implements Revertable {
  private _playerId!: string;

  constructor(
    private readonly _sceneService: SceneService,
  ) {
    super();
  }

  setParameters(playerId: string, targetFieldId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {

  }

  revert(): void {
    
  };
}
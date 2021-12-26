import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";

export class MoveTile extends BaseCommand implements Revertable {
  private _playerId!: string;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService
  ) {
    super();
  }

  setParameters(playerId: string, targetFieldId: number): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {

  }

  revert(): void {
    
  };
}
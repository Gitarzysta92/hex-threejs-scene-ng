import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";

export class PickTileForManipulation extends BaseCommand implements StateTransition<RoundState>, Revertable {
  private _tileId!: string;

  targetState: RoundStateName = RoundStateName.UtilizingTile

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService
  ) {
    super();
  } 

  setParameters(tileId: string): this {
    this._tileId = tileId;
    return this;
  }

  execute(): void {
    const round = this._gameLogicService.createRound();
  }

  revert() { }

  checkIfTransitionPossible(prevState: RoundState): boolean {
    return true
  }
}
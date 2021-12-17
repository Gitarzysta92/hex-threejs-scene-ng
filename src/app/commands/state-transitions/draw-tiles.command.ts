import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState, RoundStateName } from "src/app/state/round-state";

export class DrawTiles extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.ChoosingTileToDiscard;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService,
    private readonly _tilesRepositoryService: TilesRepositoryService
  ) {
    super();
  } 
  
  setParameters(): this { return this; }

  execute(): void {
    const round = this._gameLogicService.createRound();
  }

  revert() { }

  checkIfTransitionPossible(prevState: RoundState): boolean {
    return true;
  }

}
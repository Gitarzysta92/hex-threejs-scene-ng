import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";

export class UtilizeTile extends BaseCommand implements StateTransition<RoundState> {
  private _playerId!: string;

  targetState: RoundStateName = RoundStateName.TileManipulation

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService,
    private readonly _tilesRepositioryService: TilesRepositoryService
  ) {
    super();
  } 
  setParameters(playerId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {

  }

  checkIfTransitionPossible(prevState: RoundState): boolean {
    return true;
  }

}
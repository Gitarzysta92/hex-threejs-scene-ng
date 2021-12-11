import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { Round, RoundState } from "src/app/logic/models/round";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { TilesRepositoryService } from "src/app/services/tiles-repository/tiles-repository.service";

export class DrawTiles extends BaseCommand implements StateTransition<Round>, Revertable {
  private _playerId: string;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService,
    private readonly _tilesRepositoryService: TilesRepositoryService
  ) {
    super();
  } 
  

  setParameters(playerId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {
    const round = this._gameLogicService.createRound();

  }

  revert() { }

  transition(state: Round): boolean {
    return state.to(RoundState.Started);
  }

}
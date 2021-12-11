import { BaseCommand } from "src/app/lib/command-bus/base-command";

export class MoveTile extends BaseCommand implements Revertable {
  private _playerId!: string;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService
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

  transition(state: Round): boolean {
    return state.to(RoundState.Started);
  }
}
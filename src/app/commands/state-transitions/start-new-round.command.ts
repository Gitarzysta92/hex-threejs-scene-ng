import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { StateTransition } from "src/app/lib/state-machine/state";
import { GameLogicService } from "src/app/services/game-logic/game-logic.service";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round-state";


export class StartNewRound extends BaseCommand implements StateTransition<RoundState> {
  
  public targetState: RoundStateName = RoundStateName.Started;
  
  private _playerId!: string;

  constructor(
    private readonly _sceneService: SceneService,
    private readonly _gameLogicService: GameLogicService,
  ) {
    super();
  } 

  setParameters(playerId: string): this {
    this._playerId = playerId;
    return this;
  }

  execute(): void {
    //const round = this._gameLogicService.createRound();
    const currentState = this._gameState.getRoundState();
    this.transition(currentState);
    

  }

  transition(prevState: RoundState): void {
    const newState = Object.assign({}, prevState);
    newState.

    this._gameState.setRoundState(newState);
  }

  checkTransitionAvailibility(state: RoundState): boolean {
    return state.to(this.targetState);
  }
}



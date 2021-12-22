import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { StateTransition } from "src/app/lib/state-machine/state";
import { SceneService } from "src/app/services/scene/scene.service";
import { RoundState } from "src/app/state/round-state";
import { RoundStateName } from "src/app/state/state-name.enum";

export class ConfirmTileAction extends BaseCommand implements StateTransition<RoundState>, Revertable {

  targetState: RoundStateName = RoundStateName.TilesManage

  constructor(
    private readonly _sceneService: SceneService,
  ) {
    super();
  } 
  
  setParameters(playerId: string): this { return this }
  execute(): void { }
  revert(): void { }

  checkIfTransitionPossible(prevState: RoundState): boolean {
    return true;
  }


}
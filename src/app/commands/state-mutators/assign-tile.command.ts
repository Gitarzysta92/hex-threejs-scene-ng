import { BaseCommand } from "src/app/lib/command-bus/base-command";
import { Revertable } from "src/app/lib/commands-stack/commands-stack.service";
import { Round, RoundState } from "src/app/logic/models/round";
import { SceneService } from "src/app/services/scene/scene.service";
import { Intersection } from "three";

export class AssignTile extends BaseCommand implements Revertable {

  private _intersection!: Intersection;

  constructor(
    private readonly _sceneService: SceneService,
  ) {
    super();
  }

  setParameters(intersection: Intersection): this {
    this._intersection = intersection;
    return this;
  }

  execute(): void {
    const field = this._intersection.distance;
    const token = this._sceneService.dragManager.currentObject;
    if (!!field) {
      this._sceneService.attachTokenToField(token, field);
    } 
  }

  revert(): void {};
  
}
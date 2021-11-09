import { Injectable } from "@angular/core";
import { SceneService } from "../services/scene/scene.service";
import { Command } from "./commands";

@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(
    private readonly sceneService: SceneService,
  ) { }

  public createToken(imgSrc: string): Command.CreateToken {
    return new Command.CreateToken(this.sceneService).setParameters(imgSrc);
  }

}
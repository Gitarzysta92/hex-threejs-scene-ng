import { Injectable } from "@angular/core";
import { BaseCommand } from "../lib/command-bus/base-command";
import { Revertable } from "../lib/commands-stack/commands-stack.service";
import { StateTransition } from "../lib/state-machine/state";
import { Round, RoundState } from "../logic/round";
import { SceneService } from "../services/scene/scene.service";

export namespace Command {


  export class CreateToken extends BaseCommand implements StateTransition<Round>, Revertable {
    private _imgSrc!: string;

    constructor(
      private readonly sceneService: SceneService,
    ) {
      super();
    }
    
    setParameters(imgSrc: string): this {
      this._imgSrc = imgSrc;
      return this;
    }

    execute(): void {
      this.sceneService.createToken(this._imgSrc);
    }

    revert(): void {
      
    };

    transition(state: Round): boolean {
      return state.to(RoundState.TokenDisposed);
    }
  }


};

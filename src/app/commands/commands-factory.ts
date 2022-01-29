import { Injectable, Injector } from "@angular/core";
import { BaseCommand, Command } from "../lib/command-bus/base-command";
import { CommandBusService } from "../lib/command-bus/command-bus.service";
import { GameStateService } from "../services/game-state/game-state.service";
import { RoundStateService } from "../services/round-state/round-state.service";
import { Coords, SceneService } from "../services/scene/scene.service";
import { TilesRepositoryService } from "../services/tiles-repository/tiles-repository.service";
import { GameState } from "../state/game/game-state";
import { PlayerState } from "../state/player/player-state";
import { RoundState } from "../state/round/round-state";



@Injectable({ 
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(
    private readonly _roundStateService: RoundStateService,
    private readonly _gameStateService: GameStateService,
  ) { }

  public create<T extends BaseCommand>(command: new(...args: any[]) => T): Command<T> {
    return Injector.create({
      providers: [
        {
          provide: command, 
          deps: [
            SceneService,
            GameStateService,
            RoundStateService,
            TilesRepositoryService,
            CommandBusService,
            {
              provide: RoundState,
              useFactory: this._roundStateService.getState(),
            },
            {
              provide: GameState,
              useFactory: this._gameStateService.getState(),
            },
          ]
        }
      ]
    }).get(command);
  }
}

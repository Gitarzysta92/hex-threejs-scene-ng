import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { RotationDirection } from 'src/app/commands/state-mutators/rotate-tile.command';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { PlayersRepositoryService } from 'src/app/services/players-repository/players-repository.service';
import { RoundStateService } from 'src/app/services/round-state/round-state.service';
import { GameStateName } from 'src/app/state/game/game-state-name.enum';
import { RoundStateName } from 'src/app/state/round/round-state-name.enum';


@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, OnDestroy {

  public game = GameStateName;
  public gameState: Observable<GameStateName>;

  public round = RoundStateName;
  public roundState: Observable<RoundStateName>;
  public isTileToUtilize: Observable<boolean>;

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory,
    private readonly _roundStateService: RoundStateService,
    private readonly _gameStateService: GameStateService,
    private readonly _playersRepository: PlayersRepositoryService
  ) {
    
    this.gameState = this._gameStateService.onStateChange
      .pipe(map(gs => gs.id))

    this.roundState = this._roundStateService.onStateChange
      .pipe(map(rs => rs.id));

    this.isTileToUtilize = this._roundStateService.onStateChange
      .pipe(map(rs => rs.holdedTiles.length > 0));
  }

  ngOnInit(): void { 
    
  }

  ngOnDestroy(): void {

  }

  startGame(): void {
    const players = this._playersRepository.getPlayers();

    const command = this._command.startGame(players);
    this._commandBus.dispatch(command);
  }

  //
  // Round
  //

  startRound(): void {
    const command = this._command.startRound('first');
    this._commandBus.dispatch(command);  
  }

  drawTiles(): void {
    const command = this._command.drawTiles();
    this._commandBus.dispatch(command);  
  }

  discardTiles(): void {
    const state = this._gameStateService.getState();
    const tileToDiscard = state.holdedTiles[0]
    const command = this._command.discardTiles([tileToDiscard.id]);
    this._commandBus.dispatch(command);  
  }

  utilizeTile(): void {
    const state = this._gameStateService.getState();
    const tileToCreate = state.holdedTiles[0];
    if (!tileToCreate)
      return;

    const command = this._command.utilizeTile(tileToCreate.id);
    this._commandBus.dispatch(command);
  }

  pickTileForManipulation(): void {
    const command = this._command.pickTileForManipulation('1');
    this._commandBus.dispatch(command);
  }

  unassignTile(): void {
    const state = this._gameStateService.getState();
    const tile = state.utilizingTile;
    const command = this._command.unasignTile(tile.id);
    this._commandBus.dispatch(command);
  }

  rotateTileLeft(): void {
    const state = this._gameStateService.getState();
    const tile = state.utilizingTile;
    const command = this._command.rotateTile(tile.id, RotationDirection.CounterClockwise);
    this._commandBus.dispatch(command);
  }

  rotateTileRight(): void {
    const state = this._gameStateService.getState();
    const tile = state.utilizingTile;
    const command = this._command.rotateTile(tile.id, RotationDirection.Clockwise);
    this._commandBus.dispatch(command);
  }

  confirmTileAction(): void {
    const command = this._command.confirmTileAction();
    this._commandBus.dispatch(command);
  }

  finishRound(): void {
    const command = this._command.finishRound();
    this._commandBus.dispatch(command);
  }
}
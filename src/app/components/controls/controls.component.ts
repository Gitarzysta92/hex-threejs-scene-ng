import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { RotationDirection } from 'src/app/commands/state-mutators/rotate-tile.command';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { RoundStateName } from 'src/app/state/state-name.enum';


@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, OnDestroy {

  public round = RoundStateName

  public internalState: Observable<RoundStateName>;

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory,
    private readonly _gameStateService: GameStateService
  ) { 
    this.internalState = this._gameStateService.onStateChange
      .pipe(map(rs => rs.id))
  }

  ngOnInit(): void { 
    
  }

  ngOnDestroy(): void {

  }

  startRound(): void {
    const command = this._command.startRound('first');
    this._commandBus.dispatch(command);  
  }

  drawTiles(): void {
    const command = this._command.drawTiles();
    this._commandBus.dispatch(command);  
  }

  discardTiles(): void {
    const state = this._gameStateService.getCurrentRoundState();
    const tileToDiscard = state.holdedTiles[0]
    const command = this._command.discardTiles([tileToDiscard.id]);
    this._commandBus.dispatch(command);  
  }

  utilizeTile(): void {
    const state = this._gameStateService.getCurrentRoundState();
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

  detachTile(): void {
    // const command = this._command.detachTile('1');
    // this._commandBus.dispatch(command);
  }

  rotateTile(): void {
    const state = this._gameStateService.getCurrentRoundState();
    const tile = state.utilizingTile;
    const command = this._command.rotateTile(tile.id, RotationDirection.Clockwise);
    this._commandBus.dispatch(command);
  }

  confirmTileAction(): void {
    const command = this._command.pickTileForManipulation('1');
    this._commandBus.dispatch(command);
  }

  finishRound(): void {
    const command = this._command.finishRound();
    this._commandBus.dispatch(command);
  }
}
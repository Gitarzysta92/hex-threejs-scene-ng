import { Component, OnInit } from '@angular/core';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';


@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory,
  ) { }

  ngOnInit(): void { }

  startRound(): void {
    const command = this._command.startRound('first');
    this._commandBus.dispatch(command);  
  }

  drawTiles(): void {
    const command = this._command.drawTiles();
    this._commandBus.dispatch(command);  
  }

  utilizeTile(): void {
    const command = this._command.utilizeTile(1);
    this._commandBus.dispatch(command);
  }

  pickTileForManipulation(): void {
    const command = this._command.pickTileForManipulation(1);
    this._commandBus.dispatch(command);
  }

  confirmTileAction(): void {
    const command = this._command.pickTileForManipulation(1);
    this._commandBus.dispatch(command);
  }

  finishRound(): void {
    const command = this._command.finishRound();
    this._commandBus.dispatch(command);
  }
}
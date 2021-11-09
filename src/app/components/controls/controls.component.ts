import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Command } from 'src/app/commands/commands';
import { CommandsFactory } from 'src/app/commands/commands-factory';
import { CommandBusService } from 'src/app/lib/command-bus/command-bus.service';
import { SceneService } from 'src/app/services/scene/scene.service';


@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  commands$: Subject<unknown>;

  constructor(
    private readonly _commandBus: CommandBusService,
    private readonly _command: CommandsFactory
  ) {

    this.commands$ = new Subject();

  }

  ngOnInit(): void {
  }

  addToken() {
    const command = this._command.createToken('assets/img/sniper.jpg');

    // const command = new Command.CreateToken(
    //   this._sceneService,
    //   'assets/img/sniper.jpg'
    // );
    //command.subject(result => result.)
    this._commandBus.dispatch(command);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoundState } from 'src/app/state/round-state';
import { RoundStateName } from 'src/app/state/state-name.enum';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private _roundState: RoundState = new RoundState({
    id: RoundStateName.Started
  });
  
  public onStateChange: BehaviorSubject<RoundState> = new BehaviorSubject(this._roundState)


  
  //private _roundStates: RoundState[] = [];

  constructor() { }

  applyRoundState(state: RoundState): void {
    this._roundState = state;
    this.onStateChange.next(this._roundState);
  }

  getRoundState(playerId: string): RoundState {
    if (!this._roundState)
      this._roundState = this._getInitialRoundState(playerId);
    
    return this._roundState;
  }

  getRoundCurrentStateCopy(): RoundState {
    return Object.assign({}, this.getCurrentRoundState());
  }

  getCurrentRoundState(): RoundState {
    // const round = Object.values().find(r => r.id !== RoundStateName.Ended);
    // if (!round)
    //   throw new Error('all rounds are eneded');
    return this._roundState;
  }


  private _getInitialRoundState(playerId: string) {
    return new RoundState({
      id: 1,
      playerId: playerId,
      prevRound: new RoundState({ holdedTiles: [] }),
      holdedTiles: []
    });
  }
}
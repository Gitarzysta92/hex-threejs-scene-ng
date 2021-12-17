import { Injectable } from '@angular/core';
import { RoundState, RoundStateName } from 'src/app/state/round-state';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  
  private _roundState!: { [key: string]: RoundState };
  //private _roundStates: RoundState[] = [];

  constructor() { }

  applyRoundState(state: RoundState): void {
    this._roundState[state.playerId] = state;
  }

  getRoundState(playerId: string): RoundState {
    if (!this._roundState[playerId])
      this._roundState[playerId] = this._getInitialRoundState(playerId);
    
    return this._roundState[playerId];
  }

  getRoundStateCopy(playerId: string): RoundState {
    return Object.assign({}, this.getRoundState(playerId));
  }

  getCurrentRoundState(): RoundState {
    const round = Object.values(this._roundState).find(r => r.id !== RoundStateName.Ended);

    if (!round)
      throw new Error('all rounds are eneded');

    return round;
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
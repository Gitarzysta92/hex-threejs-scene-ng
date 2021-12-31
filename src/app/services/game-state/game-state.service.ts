import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private _roundState: GameState = new GameState({
    id: GameStateName.Started
  });
  
  public onStateChange: BehaviorSubject<GameState> = new BehaviorSubject(this._roundState)

  constructor() { }

  applyState(state: GameState): void {
    this._roundState = state;
    this.onStateChange.next(this._roundState);
  }

  getState(): GameState {
    return this._roundState;
  }
}

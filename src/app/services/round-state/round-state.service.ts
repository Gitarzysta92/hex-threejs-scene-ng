import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoundState } from 'src/app/state/round/round-state';
import { RoundStateName } from 'src/app/state/round/round-state-name.enum';

@Injectable({
  providedIn: 'root'
})
export class RoundStateService {
  private _roundState: RoundState = new RoundState({
    id: RoundStateName.Started
  });
  
  public onStateChange: BehaviorSubject<RoundState> = new BehaviorSubject(this._roundState)

  constructor() { }

  applyState(state: RoundState): void {
    this._roundState = state;
    this.onStateChange.next(this._roundState);
  }

  getState(): RoundState {
    return this._roundState;
  }
}
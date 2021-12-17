import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {
  
  constructor() { }

  getCurrentRoundState() {
    throw new Error("Method not implemented.");
  }
  createRound() {
    throw new Error("Method not implemented.");
  }
}

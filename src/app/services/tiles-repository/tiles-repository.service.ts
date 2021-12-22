import { Injectable } from '@angular/core';
import { Tile } from 'src/app/logic/models/tile';

@Injectable({
  providedIn: 'root'
})
export class TilesRepositoryService {




  constructor() { }


  getTile(id: number) {
    const asd= {
      0:new Tile({ img: 'assets/img/sniper.jpg'}),
      1:new Tile({ img: 'assets/img/sniper1.jpg'}),
      2:new Tile({ img: 'assets/img/sniper2.jpg'}),
      3:new Tile({ img: 'assets/img/sniper3.jpg'}),
      4:new Tile({ img: 'assets/img/sniper4.jpg'}),
      5:new Tile({ img: 'assets/img/sniper5.jpg'}),
      6:new Tile({ img: 'assets/img/sniper6.jpg'}),
      7:new Tile({ img: 'assets/img/sniper7.jpg'}),
      8:new Tile({ img: 'assets/img/sniper8.jpg'}),
      9:new Tile({ img: 'assets/img/sniper9.jpg'}),
    } as any

    return  asd[id]
  }

  
}

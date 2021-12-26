import { Injectable } from '@angular/core';
import { TileType } from 'src/app/logic/consts/hierarchical-tile-types-model';
import { Tile } from 'src/app/logic/models/tile';

@Injectable({
  providedIn: 'root'
})
export class TilesRepositoryService {




  constructor() { }


  getTile(id: number) {
    const asd= {
      0:new Tile({ id: '0', img: 'assets/img/sniper.jpg', type: TileType.Unit }),
      1:new Tile({ id: '1', img: 'assets/img/sniper1.jpg', type: TileType.Unit}),
      2:new Tile({ id: '2', img: 'assets/img/sniper2.jpg', type: TileType.Unit}),
      3:new Tile({ id: '3', img: 'assets/img/sniper3.jpg', type: TileType.Unit}),
      4:new Tile({ id: '4', img: 'assets/img/sniper4.jpg', type: TileType.Unit}),
      5:new Tile({ id: '5', img: 'assets/img/sniper5.jpg', type: TileType.Unit}),
      6:new Tile({ id: '6', img: 'assets/img/sniper6.jpg', type: TileType.Unit}),
      7:new Tile({ id: '7', img: 'assets/img/sniper7.jpg', type: TileType.Unit}),
      8:new Tile({ id: '8', img: 'assets/img/sniper8.jpg', type: TileType.Unit}),
      9:new Tile({ id: '9', img: 'assets/img/sniper9.jpg', type: TileType.Unit}),
    } as any

    return  asd[id]
  }

  
}

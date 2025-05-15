import { Component, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common';
import { DragDropModule,
	 CdkDrag,
	 CdkDragDrop,
	 CdkDropList,
	 CdkDragEnd,
	 CdkDragMove,
	 CdkDragStart
       } from '@angular/cdk/drag-drop';

import { Chess } from 'chess.js'

@Component({
  standalone: true,
  selector: 'app-chessboard',
  imports: [
    DragDropModule,
    CommonModule
  ],
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent {
  board: any = null;

  blackColor: string = "grey"
  whiteColor: string = "white"
  chess: any = new Chess()

  isDragging = false;
  startTransition = '';

  constructor() {
    console.log(this.chess.board());
    this.board = this.chess.board();
  }

  getTileBackgroundColor = (i: number) => {
    let line = Math.floor(i / 8);
    if (i % 2 == 0)
      return line % 2 == 0 ? this.whiteColor : this.blackColor;
    return line % 2 == 0 ? this.blackColor : this.whiteColor;
  }

  dragStart(event: CdkDragStart): void {
    console.log(event);
  }
  dragEnd(event: CdkDragEnd): void {
    console.log(event);
  }
  drop(event: CdkDragDrop<string>) {
    // this.chess.clear()
    // console.log(event);
    // console.log("----------")
    // console.log(event);
    // console.log(document.querySelectorAll('#chess-tile'))
    let nextCoord = null;
    for (let element of document.elementsFromPoint(event.dropPoint.x, event.dropPoint.y)) {
      if (element.id == "chess-tile") {
	nextCoord = element.attributes.getNamedItem("ng-reflect-data")?.value;
	break;
      }
    }
    if (!nextCoord) return
    let coords = this.translateCoordToChess(parseInt(nextCoord.split(',')[0]), parseInt(nextCoord.split(',')[1]));

    let previousCoords = this.translateCoordToChess(parseInt(event.previousContainer.data.split(',')[0]), parseInt(event.previousContainer.data.split(',')[1])); 
    console.log(coords, previousCoords);

    this.chess.move(`${previousCoords}-${coords}`)

    this.board = this.chess.board();
    // this.chess.moves(event.previousContainer.data['square'])
    // this.chess.board().clear()
    // console.log("yulu");
    // this.board[event.container.data] = this.board[event.previousContainer.data];
    // this.board[event.previousContainer.data] = null;
  }

  enterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    // console.log(drop.data == null);
    // console.log(drag.data);
    return drop.data == null;
  }

  translateCoordToChess(x: number, y: number): string {
    return `${String.fromCharCode('a'.charCodeAt(0) + y)}${x+1}`
  }
}

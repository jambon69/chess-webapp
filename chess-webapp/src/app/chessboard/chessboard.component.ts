import { Component,
	 ViewChild,
	 Input,
	 Output,
	 EventEmitter
       } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule,
	 CdkDrag,
	 CdkDragDrop,
	 CdkDropList,
	 CdkDragEnd,
	 CdkDragMove,
	 CdkDragStart
       } from '@angular/cdk/drag-drop';
import { AngularSplitModule } from 'angular-split';

import { Chess } from 'chess.js'

@Component({
  standalone: true,
  selector: 'app-chessboard',
  imports: [
    DragDropModule,
    CommonModule,
    AngularSplitModule
  ],
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent {
  @Input() history: string[] = [];
  @Output() updateHistory = new EventEmitter<string[]> ();
  board: any = null;

  blackColor: string = "grey"
  whiteColor: string = "white"
  chess: any = new Chess()

  isDragging = false;
  startTransition = '';

  turnColor: string = "w";

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
    // Get div with id chess-tile at specific corrd
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

    this.movePiece(previousCoords, coords);
  }

  clickPiece(event: MouseEvent) {
    console.log(event);
  }

  movePiece(coord1: string, coord2: string) {
    /*
    ** do the chess moves.
    ** If fails, then print message fail
    */
    // Or by passing .move() a move object (only the 'to', 'from', and when necessary 'promotion', fields are needed):
    // promotion will be needed later
    try {
      let moveObj = this.chess.move(`${coord1}-${coord2}`);

      // play sound if capture has been done
      // if (moveObj.captured != undefined) play(capture_sound)

      // change turn color
      this.turnColor = this.chess.turn()

      // update history
      this.updateHistory.emit(this.chess.history());
    } catch (error) {
      alert("illegal move");
    }

    // regenerates chessboard after move
    this.board = this.chess.board();
  }

  enterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    // console.log(drop.data == null);
    // console.log(drag.data);
    return drag.data.color == this.turnColor && drop.data == null;
  }

  translateCoordToChess(x: number, y: number): string {
    return `${String.fromCharCode('a'.charCodeAt(0) + y)}${x+1}`
  }
}

import { Component, ViewChild, Input } from '@angular/core'
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chesshistory',
  imports: [
    CommonModule,
  ],
  templateUrl: './chesshistory.component.html',
  styleUrls: ['./chesshistory.component.scss'],
})
export class ChesshistoryComponent {
  @Input() history: string[] = [];
}

import { Component, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

// own components
import { ChessboardComponent } from '../chessboard/chessboard.component';
import { ChesshistoryComponent } from '../chesshistory/chesshistory.component';
import { ChatComponent } from '../chat/chat.component';

// websockets
import { WebsocketService } from '../services/websocket.service';
import { User } from '../services/websocket.service';

// Ui components
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { AngularSplitModule } from 'angular-split';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chessenv',
  imports: [
    ChessboardComponent,
    ChesshistoryComponent,
    ChatComponent,
    AngularSplitModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './chessenv.component.html',
  styleUrls: ['./chessenv.component.scss'],
})
export class ChessenvComponent {
  history: string[] = [];

  user: User = new User();

  websocketService = inject(WebsocketService);
  isConnected = toSignal(this.websocketService.onConnect());
  error = toSignal(this.websocketService.onError());

  updateHistory(hist: string[]) {
    console.log("updating history");
    console.log(this.isConnected());
    this.history = hist;
  }

  connect() {
    this.websocketService.connect(this.user);
  }
}

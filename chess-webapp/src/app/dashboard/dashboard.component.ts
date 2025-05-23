import { Component, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common';

// websockets
import { WebsocketService } from '../services/websocket.service';
import { User } from '../services/websocket.service';

import { GameService } from '../services/game.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // websocketService = inject(WebsocketService);
  gameService = inject(GameService);

  construcor() {
  }

  // TODO On veut pouvoir créer des games / rejoindre / lister depuis le dashboard
  // -> Création du gameservice la prochinae fois
}

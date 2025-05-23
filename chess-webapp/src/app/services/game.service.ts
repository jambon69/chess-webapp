import { Injectable, signal, inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  websocketService = inject(WebsocketService);
  
  constructor() {
  }
}

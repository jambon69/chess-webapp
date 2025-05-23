import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list'; 
import { MatExpansionModule } from '@angular/material/expansion';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { CommonModule } from '@angular/common';
import { SidenavComponent } from './navbar/navbar.component';
import { AngularSplitModule } from 'angular-split';

import { RouterModule } from '@angular/router';

import { WebsocketService } from './/services/websocket.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    SidenavComponent,
    AngularSplitModule,
    MatTooltipModule,
    MatExpansionModule,
    RouterModule
  ],
  providers: [WebsocketService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chess-webapp';

  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav
  @ViewChild('sidenavEnd', { static: false }) sidenavEnd!: MatSidenav
  isMobile = true;
  isCollapsed = true;

  showLeftSidenav: boolean = true
  showRightSidenav: boolean = true
  mainArea: boolean = true

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
}

import { Component, ViewChild } from '@angular/core'

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';

@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatExpansionModule,
    AngularSplitModule,
    MatSidenav,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  selector: 'app-sidenav',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class SidenavComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav
  @ViewChild('sidenavEnd', { static: false }) sidenavEnd!: MatSidenav

  showLeftSidenav: boolean = true
  showRightSidenav: boolean = true
  mainArea: boolean = true
}

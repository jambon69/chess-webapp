import { Routes } from '@angular/router';

import { ChessenvComponent } from "./chessenv/chessenv.component"
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "chessgame", component: ChessenvComponent},
];

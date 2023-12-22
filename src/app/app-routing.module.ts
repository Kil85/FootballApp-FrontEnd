import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainPaigeComponent } from './main-paige/main-paige.component';
import { GameWidgetComponent } from './widgets/game-widget/game-widget.component';
import { LeagueWidgetComponent } from './widgets/league-widget/league-widget.component';
import { FavouriteMatchBarComponent } from './favourite-match-bar/favourite-match-bar.component';

const appRoutes: Routes = [
  { path: '', component: MainPaigeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameWidgetComponent },
  { path: 'league', component: LeagueWidgetComponent },
  { path: 'favourite', component: FavouriteMatchBarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

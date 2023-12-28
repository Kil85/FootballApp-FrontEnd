import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { DateBarComponent } from './date-bar/date-bar.component';
import { MainPaigeComponent } from './main-paige/main-paige.component';
import { MatchBarComponent } from './main-paige/match-bar/match-bar.component';
import { MatchBarItemComponent } from './main-paige/match-bar/match-bar-item/match-bar-item.component';
import { MatchBarItemMatchComponent } from './main-paige/match-bar/match-bar-item/match-bar-item-match/match-bar-item-match.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { GameWidgetComponent } from './widgets/game-widget/game-widget.component';
import {
  LAZYLOAD_IMAGE_HOOKS,
  LazyLoadImageModule,
  ScrollHooks,
} from 'ng-lazyload-image';
import { LeagueWidgetComponent } from './widgets/league-widget/league-widget.component';
import { FavouriteMatchBarComponent } from './favourite-match-bar/favourite-match-bar.component';
import { UserSettingsComponent } from './auth/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SidebarItemComponent,
    DateBarComponent,
    MainPaigeComponent,
    MatchBarComponent,
    MatchBarItemComponent,
    MatchBarItemMatchComponent,
    LoadingSpinnerComponent,
    GameWidgetComponent,
    LeagueWidgetComponent,
    FavouriteMatchBarComponent,
    UserSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LazyLoadImageModule,
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  bootstrap: [AppComponent],
})
export class AppModule {}

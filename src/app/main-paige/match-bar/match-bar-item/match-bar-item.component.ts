import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Match } from '../../../../model/fixture-response-result.module';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user.model';
import { __makeTemplateObject } from 'tslib';
import { FavouriteService } from '../../../services/favourite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-bar-item',
  templateUrl: './match-bar-item.component.html',
  styleUrl: './match-bar-item.component.scss',
})
export class MatchBarItemComponent implements OnInit, OnDestroy {
  @Input() matches: Match[];
  sub: Subscription;
  favSub: Subscription;
  user: User;

  countryName: string;
  countryFlag: string;
  leagueName: String;
  leagueFlag: string;
  leagueId: string;
  isLogged = false;

  constructor(
    private authService: AuthService,
    private favService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryName = this.matches.at(0).league.country.name;
    this.countryFlag = this.matches.at(0).league.country.flag;
    this.leagueName = this.matches.at(0).league.name;
    this.leagueFlag = this.matches.at(0).league.logo;
    this.leagueId = this.matches.at(0).league.id.toString();

    this.sub = this.authService.user.subscribe((u) => {
      this.user = u;
      this.isLogged = !!u;
    });
  }

  onClick(event: Event) {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.classList.contains('fa-star')) {
      this.starChandler(clickedElement);
    } else {
      this.widgetChandler();
    }
  }

  private widgetChandler() {
    const urlWithParams = this.router.createUrlTree(['/league']).toString();
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.location.href = urlWithParams;
    } else {
      console.error('Otwarcie nowego okna zostało zablokowane.');
    }

    console.log('widget');
  }

  private starChandler(clickedElement: HTMLElement) {
    if (
      clickedElement.classList.contains('fa-regular') &&
      clickedElement.classList.contains('fa-star')
    ) {
      clickedElement.classList.remove('fa-regular');
      clickedElement.classList.add('fa-solid');
      this.favSub = this.favService
        .addFavLeague(this.user, this.leagueId)
        .subscribe((res) => {
          console.log(res);
        });
    } else if (
      clickedElement.classList.contains('fa-solid') &&
      clickedElement.classList.contains('fa-star')
    ) {
      this.favSub = this.favService
        .removeFavLeague(this.user, this.leagueId)
        .subscribe();
      clickedElement.classList.remove('fa-solid');
      clickedElement.classList.add('fa-regular');
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.favSub) this.favSub.unsubscribe();
  }
}

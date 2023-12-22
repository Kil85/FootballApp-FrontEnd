import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Match } from '../../../../../model/fixture-response-result.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/user.model';
import { FavouriteService } from '../../../../services/favourite.service';

@Component({
  selector: 'app-match-bar-item-match',
  templateUrl: './match-bar-item-match.component.html',
  styleUrl: './match-bar-item-match.component.scss',
})
export class MatchBarItemMatchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() match: Match;
  sub: Subscription;
  favSub: Subscription;
  user: User;
  @ViewChild('home') homeStar: ElementRef;
  @ViewChild('away') awayStar: ElementRef;

  isLogged = false;

  homeImg: string;
  awayImg: string;
  homeName: string;
  awayName: string;
  homeGoals: string;
  awayGoals: string;
  homeTeamId: string;
  awayTeamId: string;
  matchId: string;
  isFinished = true;
  dateOnly: string;
  timeOnly: string;
  colon: string;

  constructor(
    private authService: AuthService,
    private favService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe((u) => {
      this.user = u;
      this.isLogged = !!u;
    });
    if (!this.match.status.match('Finished')) {
      this.isFinished = false;
    } else {
      this.homeGoals = this.match.homeTeamGoals.toString();
      this.awayGoals = this.match.awayTeamGoals.toString();
      this.colon = ':';
    }

    this.homeImg = this.match.homeTeam.logo;
    this.awayImg = this.match.awayTeam.logo;
    this.homeName = this.match.homeTeam.name;
    this.awayName = this.match.awayTeam.name;
    this.matchId = this.match.id.toString();
    this.dateOnly = this.match.date;
    this.timeOnly = this.match.time;
    this.homeTeamId = this.match.homeTeam.id.toString();
    this.awayTeamId = this.match.awayTeam.id.toString();
    console.log(this.isLogged);
  }

  ngAfterViewInit(): void {
    if (this.isLogged) {
      if (this.checkIfFav(this.homeTeamId)) {
        this.homeStar.nativeElement.classList.remove('fa-regular');
        this.homeStar.nativeElement.classList.add('fa-solid');
      }
      if (this.checkIfFav(this.awayTeamId)) {
        this.awayStar.nativeElement.classList.remove('fa-regular');
        this.awayStar.nativeElement.classList.add('fa-solid');
      }
    }
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
    const queryParams = { dataId: this.matchId };
    const urlWithParams = this.router
      .createUrlTree(['/game'], { queryParams })
      .toString();
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.location.href = urlWithParams;
    } else {
      console.error('Otwarcie nowego okna zostało zablokowane.');
    }
    console.log('widget');
  }

  private starChandler(clickedElement: HTMLElement) {
    let teamId: string;
    if (clickedElement.classList.contains('home')) {
      teamId = this.homeTeamId;
    } else if (clickedElement.classList.contains('away')) {
      teamId = this.awayTeamId;
    }

    if (
      clickedElement.classList.contains('fa-regular') &&
      clickedElement.classList.contains('fa-star')
    ) {
      clickedElement.classList.remove('fa-regular');
      clickedElement.classList.add('fa-solid');

      this.favSub = this.favService.addFavTeam(this.user, teamId).subscribe();
    } else if (
      clickedElement.classList.contains('fa-solid') &&
      clickedElement.classList.contains('fa-star')
    ) {
      this.favSub = this.favService
        .removeFavTeam(this.user, teamId)
        .subscribe();
      clickedElement.classList.remove('fa-solid');
      clickedElement.classList.add('fa-regular');
    }
  }

  private checkIfFav(teamId: string): boolean {
    let result = false;
    this.user.teamsIds.forEach((team: number) => {
      if (team.toString() === teamId) {
        result = true;
        return;
      }
    });
    return result;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.favSub) this.favSub.unsubscribe();
  }
}

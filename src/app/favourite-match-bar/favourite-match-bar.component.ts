import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavouriteMatchesResponse } from '../../model/fixture-response-result.module';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../services/favourite.service';
import { User } from '../shared/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-favourite-match-bar',
  templateUrl: './favourite-match-bar.component.html',
  styleUrl: './favourite-match-bar.component.scss',
})
export class FavouriteMatchBarComponent implements OnInit, OnDestroy {
  clubLogo: string = 'https://media-4.api-sports.io/football/teams/50.png';
  clubName: string = 'Manchester City';
  matches: FavouriteMatchesResponse;
  sub: Subscription;
  userSub: Subscription;
  user: User;

  constructor(
    private favService: FavouriteService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((u) => {
      this.user = u;
    });

    this.sub = this.favService
      .getMatchesOfFavTeams(this.user.id)
      .subscribe((res) => {
        console.log(res);
        this.matches = res;
      });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe;
    if (this.userSub) this.userSub.unsubscribe();
  }
}

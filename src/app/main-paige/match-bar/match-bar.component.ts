import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchResponse } from '../../../model/fixture-response-result.module';
import { Subscription } from 'rxjs';
import { MainPaigeService } from '../../services/main-paige.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-match-bar',
  templateUrl: './match-bar.component.html',
  styleUrl: './match-bar.component.scss',
})
export class MatchBarComponent implements OnInit, OnDestroy {
  matches: MatchResponse;
  matchesSubscription: Subscription;
  favMatchesSubscription: Subscription;
  userSub: Subscription;
  user: User;
  favOnlySub: Subscription;
  favOnly: boolean;
  isLogged = false;
  isLoaded = false;

  constructor(
    private mPaigeService: MainPaigeService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((u) => {
      this.isLogged = !!u;
      this.user = u;
    });
    this.favOnlySub = this.auth.favOnly.subscribe((f) => {
      this.favOnly = f;
    });

    this.matchesSubscription = this.mPaigeService
      .getMatchesSubject()
      .subscribe((m: MatchResponse) => {
        this.matches = m;
        this.isLoaded = true;
      });

    this.favMatchesSubscription = this.mPaigeService
      .getmatchesFavLeagueSubject()
      .subscribe((m: MatchResponse) => {
        this.matches = m;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.matchesSubscription) this.matchesSubscription.unsubscribe();
    if (this.favMatchesSubscription) this.favMatchesSubscription.unsubscribe();
    if (this.favOnlySub) this.favOnlySub.unsubscribe();
  }
}

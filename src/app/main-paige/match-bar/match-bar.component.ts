import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchResponse } from '../../../model/fixture-response-result.module';
import { Subscription } from 'rxjs';
import { MainPaigeService } from '../main-paige.service';

@Component({
  selector: 'app-match-bar',
  templateUrl: './match-bar.component.html',
  styleUrl: './match-bar.component.scss',
})
export class MatchBarComponent implements OnInit, OnDestroy {
  matches: MatchResponse;
  matchesSubscription: Subscription;
  isLoaded = false;

  constructor(private mPaigeService: MainPaigeService) {}

  ngOnInit(): void {
    this.matchesSubscription = this.mPaigeService
      .getMatchesSubject()
      .subscribe((m: MatchResponse) => {
        this.matches = m;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.matchesSubscription.unsubscribe();
  }
}

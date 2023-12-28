import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainPaigeService } from '../services/main-paige.service';
import { Subscription } from 'rxjs';
import { MatchResponse } from '../../model/fixture-response-result.module';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-paige',
  templateUrl: './main-paige.component.html',
  styleUrls: ['./main-paige.component.scss'],
})
export class MainPaigeComponent implements OnInit, OnDestroy {
  private fetchSubscription: Subscription;
  private logOutSub: Subscription;
  constructor(
    private service: MainPaigeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchSubscription = this.service.getFetchSubject().subscribe();
    this.logOutSub = this.authService.userLoggedOut.subscribe(() => {
      console.log('object');
      this.service.resendRequest(); // Ponowne wysłanie zapytania po wylogowaniu
    });

    this.service.fetchFixtures(); // Rozpoczęcie pierwszego zapytania
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.logOutSub.unsubscribe();
  }

  resendRequest(): void {
    this.service.resendRequest(); // Ponowne wysłanie zapytania
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainPaigeService } from '../services/main-paige.service';
import { Subscription } from 'rxjs';
import { MatchResponse } from '../../model/fixture-response-result.module';

@Component({
  selector: 'app-main-paige',
  templateUrl: './main-paige.component.html',
  styleUrls: ['./main-paige.component.scss'],
})
export class MainPaigeComponent implements OnInit, OnDestroy {
  private fetchSubscription: Subscription;
  private fetchedData: MatchResponse[] = []; // Tablica przechowująca dane z zapytań HTTP

  constructor(private service: MainPaigeService) {}

  ngOnInit(): void {
    this.fetchSubscription = this.service.getFetchSubject().subscribe();

    this.service.fetchFixtures(); // Rozpoczęcie pierwszego zapytania
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
  }

  resendRequest(): void {
    this.service.resendRequest(); // Ponowne wysłanie zapytania
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-widget',
  templateUrl: './league-widget.component.html',
  styleUrl: './league-widget.component.scss',
})
export class LeagueWidgetComponent implements OnInit, OnDestroy {
  leagueId: string;
  season: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.leagueId = params['leagueId'] || null;
      console.log(this.leagueId);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

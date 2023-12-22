import { Component } from '@angular/core';

@Component({
  selector: 'app-league-widget',
  templateUrl: './league-widget.component.html',
  styleUrl: './league-widget.component.scss',
})
export class LeagueWidgetComponent {
  leagueId: string;
  season: string;
}

import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../../../model/fixture-response-result.module';

@Component({
  selector: 'app-match-bar-item',
  templateUrl: './match-bar-item.component.html',
  styleUrl: './match-bar-item.component.scss',
})
export class MatchBarItemComponent implements OnInit {
  @Input() matches: Match[];
  countryName: string = 'England';
  countryFlag: string = 'https://media.api-sports.io/flags/gb.svg';
  leagueName: string = 'Premier League';
  leagueFlag: string = 'https://media-4.api-sports.io/football/leagues/39.png';

  ngOnInit(): void {
    console.log(this.matches);
    this.countryName = this.matches.at(0).league.country.name;
    this.countryFlag = this.matches.at(0).league.country.flag;
    this.leagueName = this.matches.at(0).league.name;
    this.leagueFlag = this.matches.at(0).league.logo;
  }
}

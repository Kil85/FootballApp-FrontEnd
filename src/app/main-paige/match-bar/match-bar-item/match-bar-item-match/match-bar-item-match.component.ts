import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../../../../model/fixture-response-result.module';

@Component({
  selector: 'app-match-bar-item-match',
  templateUrl: './match-bar-item-match.component.html',
  styleUrl: './match-bar-item-match.component.scss',
})
export class MatchBarItemMatchComponent implements OnInit {
  @Input() match: Match;
  homeImg: string = 'https://media-4.api-sports.io/football/teams/620.png';
  awayImg: string = 'https://media-4.api-sports.io/football/teams/608.png';
  homeName: string = 'Dinamo Zagrzeb';
  awayName: string = 'HNK Hajduk Split';
  homeGoals: string = '2';
  awayGoals: string = '1';
  isFinished = true;

  ngOnInit(): void {
    if (!this.match.status.match('Finished')) {
      this.isFinished = false;
    } else {
      this.homeGoals = this.match.homeTeamGoals.toString();
      this.awayGoals = this.match.awayTeamGoals.toString();
    }
    this.homeImg = this.match.homeTeam.logo;
    this.awayImg = this.match.awayTeam.logo;
    this.homeName = this.match.homeTeam.name;
    this.awayName = this.match.awayTeam.name;
  }
}

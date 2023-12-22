import { Component } from '@angular/core';
import {
  Match,
  MatchResponse,
} from '../../model/fixture-response-result.module';

@Component({
  selector: 'app-favourite-match-bar',
  templateUrl: './favourite-match-bar.component.html',
  styleUrl: './favourite-match-bar.component.scss',
})
export class FavouriteMatchBarComponent {
  clubLogo: string = 'https://media-4.api-sports.io/football/teams/50.png';
  clubName: string = 'Manchester City';
  matches: MatchResponse;
}

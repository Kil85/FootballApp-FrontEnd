import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { User } from '../shared/user.model';
import {
  FavouriteMatchesResponse,
  MatchResponse,
} from '../../model/fixture-response-result.module';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private baseLink = 'https://localhost:7183/api/favourite/';

  constructor(private http: HttpClient) {}

  addFavTeam(user: User, teamId: string) {
    const requestBody = {
      userId: user.id,
      newFavId: teamId,
    };
    return this.http.post(this.baseLink + 'team', requestBody).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error));
      }),
      tap(() => this.addTeamToLocalStorage(user, teamId))
    );
  }
  removeFavTeam(user: User, teamId: string): Observable<any> {
    const requestBody = {
      userId: user.id,
      newFavId: teamId,
    };
    console.log(requestBody);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: requestBody,
    };

    return this.http
      .request<any>('delete', this.baseLink + 'team', httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        }),
        tap(() => this.removeTeamFromLocalStorage(user, teamId))
      );
  }

  addFavLeague(user: User, leagueId: string) {
    const requestBody = {
      userId: user.id,
      newFavId: leagueId,
    };
    return this.http.post(this.baseLink + 'league', requestBody).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error));
      }),
      tap(() => this.addLeagueToLocalStorage(user, leagueId))
    );
  }

  removeFavLeague(user: User, leagueId: string): Observable<any> {
    const requestBody = {
      userId: user.id,
      newFavId: leagueId,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: requestBody,
    };

    return this.http
      .request<any>('delete', this.baseLink + 'league', httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        }),
        tap(() => this.removeLeagueFromLocalStorage(user, leagueId))
      );
  }

  getMatchesOfFavTeams(userId: string) {
    let params = new HttpParams();
    params = params.append('userId', userId);

    return this.http
      .get<FavouriteMatchesResponse>(`${this.baseLink}favteams`, {
        params,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  private addTeamToLocalStorage(user: User, teamId: string) {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.id === user.id) {
      userData.teamsIds.push(Number.parseInt(teamId));
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  private removeTeamFromLocalStorage(user: User, teamId: string) {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.id === user.id) {
      userData.teamsIds = userData.teamsIds.filter(
        (id) => id.toString() !== teamId
      );
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  private addLeagueToLocalStorage(user: User, leagueId: string) {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.id === user.id) {
      userData.leaguesIds.push(Number.parseInt(leagueId));
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  private removeLeagueFromLocalStorage(user: User, leagueId: string) {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.id === user.id) {
      userData.leaguesIds = userData.leaguesIds.filter(
        (id) => id.toString() !== leagueId
      );
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatchResponse } from '../../model/fixture-response-result.module';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class MainPaigeService implements OnDestroy {
  private baseLink = 'https://localhost:7183';
  private currentDate: string;
  private fetchSubject: Subject<void> = new Subject<void>();
  private fetchFavLeagueSubject: Subject<void> = new Subject<void>();
  private matchesSubject: Subject<MatchResponse> = new Subject<MatchResponse>();
  private matchesFavLeagueSubject: Subject<MatchResponse> =
    new Subject<MatchResponse>();

  userSub: Subscription;
  favOnlySub: Subscription;
  favOnly: boolean;
  user: User;
  isLogged = false;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.userSub = this.auth.user.subscribe((u) => {
      this.isLogged = !!u;
      this.user = u;
    });

    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    this.currentDate = `${day}.${month}.${year}`;
    this.favOnlySub = auth.favOnly.subscribe((f) => {
      this.favOnly = f;
      if (this.favOnly) {
        console.log('dupa');
        this.fetchFavouriteLeague();
      } else {
        console.log('chuj');
        this.fetchFixtures();
      }
    });
    // if (this.favOnly) {
    //   console.log('dupa');
    //   this.fetchFavouriteLeague();
    // } else {
    //   console.log('chuj');
    //   this.fetchFixtures();
    // }
  }

  setCurrentDate(date: string) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    this.currentDate = `${day}.${month}.${year}`;
    if (this.favOnly) {
      this.fetchFavouriteLeague();
    } else {
      this.fetchFixtures();
    }
  }

  fetchFixtures() {
    let params = new HttpParams();
    params = params.append('date', this.currentDate);

    return this.http
      .get<MatchResponse>(`${this.baseLink}/api/fixture`, {
        params,
      })
      .subscribe((fetch) => {
        this.fetchSubject.next();
        this.matchesSubject.next(fetch);
      });
  }

  fetchFavouriteLeague() {
    let params = new HttpParams();
    params = params.append('userId', this.user.id);
    params = params.append('date', this.currentDate);
    return this.http
      .get<MatchResponse>(`${this.baseLink}/api/favourite/favleagues`, {
        params,
      })
      .subscribe((fetch) => {
        this.fetchFavLeagueSubject.next();
        this.matchesFavLeagueSubject.next(fetch);
      });
  }

  getMatchesSubject() {
    return this.matchesSubject.asObservable();
  }

  getFetchSubject() {
    return this.fetchSubject.asObservable();
  }

  resendRequest(): void {
    return this.fetchSubject.next();
  }

  getmatchesFavLeagueSubject() {
    return this.matchesFavLeagueSubject.asObservable();
  }

  getFetchFavLeagueSubject() {
    return this.fetchFavLeagueSubject.asObservable();
  }

  resendRequestFetchFavLeagueSubject(): void {
    return this.fetchFavLeagueSubject.next();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.favOnlySub.unsubscribe();
  }
}

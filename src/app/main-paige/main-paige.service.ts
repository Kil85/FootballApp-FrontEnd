import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchResponse } from '../../model/fixture-response-result.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainPaigeService {
  private baseLink = 'https://localhost:7183';
  private currentDate: string;
  private fetchSubject: Subject<void> = new Subject<void>();
  private matchesSubject: Subject<MatchResponse> = new Subject<MatchResponse>();

  constructor(private http: HttpClient) {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    this.currentDate = `${day}.${month}.${year}`;
  }

  setCurrentDate(date: string) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    this.currentDate = `${day}.${month}.${year}`;
  }

  fetchFixtures() {
    console.log(this.currentDate);

    let params = new HttpParams();
    params = params.append('date', this.currentDate);

    return this.http
      .get<MatchResponse>(`${this.baseLink}/api/fixture`, {
        params,
      })
      .subscribe((fetch) => {
        console.log(fetch);
        this.fetchSubject.next();
        this.matchesSubject.next(fetch);
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
}

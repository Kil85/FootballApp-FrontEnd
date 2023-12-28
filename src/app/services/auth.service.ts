import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { UserResponse } from '../../model/user-response-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseLink = 'https://localhost:7183/api/account/';
  user = new BehaviorSubject<User>(null);
  private _user: User;
  favOnly = new BehaviorSubject<boolean>(false);
  userLoggedOut = new Subject<void>();
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(mail: string, password: string) {
    return this.http
      .post<UserResponse>(this.baseLink + 'login', {
        email: mail,
        password: password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
  }

  delete() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._user.token}`,
    });
    let params = new HttpParams();
    params = params.append('userId', this._user.id);
    return this.http
      .delete<any>(this.baseLink + 'delete', {
        headers: headers,
        params: params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
  }

  changePassword(oldPassword: string, newPassword: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._user.token}`,
    });
    return this.http
      .patch<UserResponse>(
        this.baseLink + 'change',
        {
          userId: this._user.id,
          oldPassword: oldPassword,
          newPassword: newPassword,
          mail: this._user.email,
        },
        { headers: headers }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
  }

  handleJwt(userDto: UserResponse) {
    const helper = new JwtHelperService();
    const jwt = userDto.jwt;

    const decodedToken = helper.decodeToken(jwt);

    const expirationDate = new Date(decodedToken.exp * 1000);

    const nameIdentifier =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    const email =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];
    const teamsIds = userDto.teamsIds;
    const leaguesIds = userDto.leaguesIds;

    const user = new User(
      email,
      nameIdentifier,
      role,
      teamsIds,
      leaguesIds,
      jwt,
      expirationDate
    );
    this.user.next(user);
    this._user = user;
    const expirationDuration =
      new Date(expirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    this.favOnly.next(false);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.token) {
      this.user.next(userData);
      this._user = userData;
      this.favOnly.next(true);

      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this._user = null;
    this.favOnly.next(false);

    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.userLoggedOut.next();
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  register(mail: string, password: string) {
    return this.http
      .post(this.baseLink + 'register', {
        email: mail,
        password: password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  toggleFavOnly() {
    console.log(!this.favOnly.value);
    this.favOnly.next(!this.favOnly.value);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

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

  handleJwt(userDto: UserResponse) {
    const helper = new JwtHelperService();
    const jwt = userDto.jwt;

    const decodedToken = helper.decodeToken(jwt);
    // const expirationDate = new Date(
    //   new Date().getTime() + +decodedToken.exp * 1000
    // );
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
    const expirationDuration =
      new Date(expirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    if (userData.token) {
      this.user.next(userData);
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
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
}

import { publishFacade } from '@angular/compiler';

export class User {
  constructor(
    public email: string,
    public id: string,
    public role: string,
    public teamsIds: number[],
    public leaguesIds: number[],
    public token: string,
    public tokenExpirationDate: Date
  ) {}
  // get token() {
  //   // if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
  //   //   return null;
  //   // }
  //   return this._token;
  // }
  // set token(newToken) {
  //   this._token = newToken;
  // }
  // set tokenExpirationDate(newDate: Date) {
  //   this._tokenExpirationDate = newDate;
  // }
}

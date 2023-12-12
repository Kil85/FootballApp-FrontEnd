import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLogged = false;
  private userSub: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((u) => {
      this.user = u;
      this.isLogged = !!u;
    });
  }

  onSettings() {}
  onLogout() {
    this.auth.logout();
  }
  onRegister() {}
  onLogin() {
    let obs = new Observable();
    obs = this.auth.login('string', 'string');
    obs.subscribe((data: string) => {
      this.auth.handleJwt(data);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

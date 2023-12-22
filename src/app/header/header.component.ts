import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLogged = false;
  showButtons = true;
  private userSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((u) => {
      this.isLogged = !!u;
      this.user = u;
      this.showButtons = !(
        this.router.url.match('/login') || this.router.url.match('/register')
      );
    });
  }

  onLogo() {
    this.router.navigate(['/']);
  }
  onSettings() {
    console.log(this.showButtons);
  }
  onLogout() {
    this.auth.logout();
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
  onFavourite() {
    this.router.navigate(['/favourite']);
  }

  private checkPath(url: string) {
    this.showButtons = !(url.match('/login') || url.match('/register'));
    console.log(this.showButtons);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

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
  favOnlySub: Subscription;
  favOnly: boolean;
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
    this.favOnlySub = this.auth.favOnly.subscribe((f) => {
      this.favOnly = f;
    });
  }

  onLogo() {
    this.router.navigate(['/']);
  }
  onSettings() {
    this.router.navigate(['/settings']);
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
  onFavLeague() {
    this.auth.toggleFavOnly();
    this.router.navigate(['/']);
    console.log(this.favOnly);
  }

  private checkPath(url: string) {
    this.showButtons = !(url.match('/login') || url.match('/register'));
    console.log(this.showButtons);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.favOnlySub.unsubscribe();
  }
}

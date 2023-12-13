import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

import { User } from '../shared/user.model';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

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
  private routerSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private path: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((u) => {
      this.isLogged = !!u;
      this.user = u;
    });
    // this.path.queryParams.subscribe((sth: Params) => {
    //   if (sth['login']) {
    //     this.showButtons = false;
    //   } else {
    //     this.showButtons = true;
    //   }
    // });
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath();
      }
    });
  }

  onSettings() {}
  onLogout() {
    this.auth.logout();
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  private checkPath() {
    const currentPath = this.router.url;
    this.showButtons = !(
      currentPath.includes('/login') || currentPath.includes('/register')
    );
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}

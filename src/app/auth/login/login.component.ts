import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserResponse } from '../../../model/user-response-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  errorMessage = null;
  sub: Subscription;
  constructor(private auth: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let obs = new Observable();
    obs = this.auth.login(email, password);
    this.sub = obs.subscribe(
      (data: UserResponse) => {
        this.auth.handleJwt(data);
        this.router.navigate(['']);
      },
      (error: Error) => {
        this.errorMessage = error.message;
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}

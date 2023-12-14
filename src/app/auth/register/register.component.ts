import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  isRegisted = false;
  subscription: Subscription;
  errorMessage = null;
  constructor(private auth: AuthService, private router: Router) {}

  onRegister(form) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (!(password === confirmPassword)) {
      this.errorMessage =
        'Error: Passwords do not match. Please enter matching passwords';
      return;
    }
    let obs = new Observable();
    obs = this.auth.register(email, password);
    this.subscription = obs.subscribe(null, (error: Error) => {
      this.errorMessage = error.message;
    });
    this.isRegisted = true;
  }

  onAccept() {
    console.log('dipa');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage = null;
  constructor(private auth: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let obs = new Observable();
    obs = this.auth.login(email, password);
    obs.subscribe(
      (data: string) => {
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
}

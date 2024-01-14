import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
})
export class UserSettingsComponent implements OnDestroy {
  sub: Subscription;
  changeSub: Subscription;
  errorMessage = null;
  constructor(private auth: AuthService, private router: Router) {}
  onDelete() {
    this.sub = this.auth.delete().subscribe({
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        this.auth.logout();
        this.router.navigate(['/']);
      },
    });
  }

  onChange(form: NgForm) {
    if (!form.valid) {
      console.log(form.valid);
      this.errorMessage = form.errors;
      return;
    }
    const currentPassword = form.value.currentPassword;
    const newPassword = form.value.newPassword;
    const confirmPassword = form.value.confirmPassword;

    if (!(newPassword === confirmPassword)) {
      console.log(newPassword);
      console.log(confirmPassword);
      this.errorMessage =
        'Error: Passwords do not match. Please enter matching passwords';
      return;
    }
    this.changeSub = this.auth
      .changePassword(currentPassword, newPassword)
      .subscribe({
        error: (e) => {
          this.errorMessage = e.message;
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.changeSub) this.changeSub.unsubscribe();
  }
}

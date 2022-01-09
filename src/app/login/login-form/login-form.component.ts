import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../shared/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  loginWithService(service: string = '') {
    this.loading$.next(true);

    this.authService
      .loginWithService(service)
      .then(async (result) => {
        localStorage.setItem('uid', result.user.uid);
        await this.router.navigate(['/']);
      })
      .catch(console.error)
      .finally(() => this.loading$.next(false));
  }

  openLoginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '350px',
    });
  }
}

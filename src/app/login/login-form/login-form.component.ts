import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../shared/auth/authentication.service';
import {
  AuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  EmailAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  login(service: string = '') {
    let provider!: AuthProvider;

    switch (service) {
      case 'google':
        provider = new GoogleAuthProvider();
        break;
      case 'twitter':
        provider = new TwitterAuthProvider();
        break;
      case 'github':
        provider = new GithubAuthProvider();
        break;
      default:
        provider = new EmailAuthProvider();
        break;
    }

    this.authService.login(provider).subscribe(async (result) => {
      await this.router.navigate(['/']);
    });
  }
}

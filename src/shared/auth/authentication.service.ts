import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  AuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  login(provider: AuthProvider): Observable<any> {
    return from(signInWithPopup(this.auth, provider));
  }

  // loginWithGoogle(): Observable<any> {
  //   return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  // }
  //
  // loginWithTwitter(): Observable<any> {
  //   return from(signInWithPopup(this.auth, new TwitterAuthProvider()));
  // }
  //
  // loginWithGithub(): Observable<any> {
  //   return from(signInWithPopup(this.auth, new GithubAuthProvider()));
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  AuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  async loginWithService(service: string) {
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
    }

    return await signInWithPopup(this.auth, provider);
  }

  async loginWitEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  AuthProvider,
  GoogleAuthProvider,
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

  get currentUserId(): string {
    return localStorage.getItem('uid') ?? '';
  }

  getUserToken(): Promise<string> {
    if (this.auth.currentUser)
      return this.auth.currentUser?.getIdToken();

    return new Promise<string>(() => "");
  }

  async loginWithService(service: string) {
    let provider!: AuthProvider;

    switch (service) {
      case 'google':
        provider = new GoogleAuthProvider();
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
    localStorage.removeItem('uid');
    localStorage.removeItem('localEvents');

    return await this.auth.signOut();
  }
}

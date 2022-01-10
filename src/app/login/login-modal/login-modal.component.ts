import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../shared/authentication.service';
import { Router } from '@angular/router';
import { calculateFormValidationErrors } from '../../../utils/FormValidators';
import { LocalizationService } from '../../../shared/localization.service';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginForm!: FormGroup;

  isPasswordWrong: boolean = false;
  formErrors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private router: Router,
    private authService: AuthenticationService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(32),
            Validators.minLength(6),
          ]),
        ],
      },
      {}
    );

    const translation = this.localizationService.getTranslationSection('form');

    this.loginForm.valueChanges.subscribe(() => {
      this.isPasswordWrong = false;

      this.formErrors = calculateFormValidationErrors(
        this.loginForm,
        translation
      );
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading$.next(true);
      const { email, password } = this.loginForm.value;
      this.authService
        .loginWitEmailAndPassword(email, password)
        .then(async (result) => await this.successLogin(result.user.uid))
        .catch((err) => {
          if (err.code == 'auth/wrong-password') {
            this.isPasswordWrong = true;
          }

          if (err.code == 'auth/user-not-found') {
            this.loading$.next(true);

            this.authService
              .createUserWithEmailAndPassword(email, password)
              .then(async (result) => await this.successLogin(result.user.uid))
              .catch(console.error);
          }
        })
        .finally(() => this.loading$.next(false));
    }
  }

  async successLogin(uid: string) {
    localStorage.setItem('uid', uid);

    this.loading$.next(false);
    this.dialogRef.close();

    await this.router.navigate(['/']);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

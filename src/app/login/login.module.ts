import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { LoginEmailComponent } from './login-form/login-email/login-email.component';

@NgModule({
  declarations: [LoginFormComponent, LoginEmailComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    BaseElementsModule,
    TranslocoModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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

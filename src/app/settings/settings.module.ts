import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { TranslocoModule } from '@ngneat/transloco';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [SettingsFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslocoModule,
    BaseElementsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class SettingsModule {}

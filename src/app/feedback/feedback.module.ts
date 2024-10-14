import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslocoModule } from '@ngneat/transloco';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

@NgModule({
  declarations: [FeedbackFormComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseElementsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslocoModule,
  ],
})
export class FeedbackModule {}

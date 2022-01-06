import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';

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
    MatInputModule,
    MatButtonModule,
    TranslocoModule,
  ],
})
export class FeedbackModule {}

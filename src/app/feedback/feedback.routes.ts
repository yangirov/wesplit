import { Routes } from '@angular/router';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

export const feedbackRoutes: Routes = [
  {
    path: '',
    component: FeedbackFormComponent,
    data: {
      scope: 'feedback',
    },
  },
];

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/Feedback';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'feedback',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      message: ['', Validators.required],
      email: [
        '',
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    });
  }

  async onSubmit() {
    if (this.feedbackForm.valid) {
      const form = <Feedback>this.feedbackForm.value;
      this.loading$.next(true);

      await this.dataService.addFeedback(form).then((res) => {
        this.feedbackForm.reset();
        this.loading$.next(false);
        this.location.back();
      });
    }
  }

  onBack() {
    this.location.back();
  }
}

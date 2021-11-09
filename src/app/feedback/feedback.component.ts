import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Feedback } from '../../models/Feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  public feedbackForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      message: '',
      email: new FormControl(
        '',
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  async sendFeedback() {
    if (this.feedbackForm.valid) {
      const form = <Feedback>this.feedbackForm.value;
      await this.dataService.saveFeedback(form).then((res) => {
        this.feedbackForm.reset();
      });
    }
  }
}

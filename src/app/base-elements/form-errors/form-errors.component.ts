import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from '../../../shared/localization.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent implements OnInit {
  @Input() localization!: string;
  @Input() form!: FormGroup;
  @Input() errors!: string[];
  @Input() force: boolean = false;

  constructor(private localizationService: LocalizationService) {}

  ngOnInit(): void {}

  errorText(key: string): string {
    return (
      this.localizationService.translate(`${this.localization}.${key}`) ?? ''
    );
  }

  formHasError(key: string): boolean {
    return this.force || Boolean(this.form.errors && this.form.errors[key]);
  }
}

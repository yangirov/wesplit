import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/theme.service';
import { LocalizationService } from '../../../shared/localization.service';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../../shared/currency.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  settingsForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private localizationService: LocalizationService,
    private themeService: ThemeService,
    private location: Location,
    public currencyService: CurrencyService
  ) {
    this.themeService.initTheme();
  }

  ngOnInit(): void {
    const selectedLanguage = this.localizationService.getActiveLang();
    const selectedTheme = this.themeService.getColorTheme();
    const selectedCurrency = this.currencyService.getCurrency();

    this.settingsForm = this.formBuilder.group({
      language: [selectedLanguage, Validators.required],
      theme: [selectedTheme, Validators.required],
      currency: [selectedCurrency, Validators.required],
    });

    this.settingsForm.valueChanges.subscribe(settings => this.saveSettings(settings));
  }

  onBack() {
    this.location.back();
  }

  saveSettings(form: any) {
    const { language, theme, currency } = this.settingsForm.value;

    this.currencyService.update(currency);

    this.localizationService.setActiveLang(language);

    this.themeService.update(theme);
    this.themeService.setColorTheme(theme);
  }
}

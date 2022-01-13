import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/theme.service';
import { LocalizationService } from '../../../shared/localization.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private localizationService: LocalizationService,
    private themeService: ThemeService,
    private location: Location
  ) {
    this.themeService.initTheme();
  }

  ngOnInit(): void {
    const selectedLanguage = this.localizationService.getActiveLang();
    const selectedTheme = this.themeService.getColorTheme();

    this.settingsForm = this.formBuilder.group({
      language: [selectedLanguage, Validators.required],
      theme: [selectedTheme, Validators.required],
    });

    this.settingsForm.valueChanges.subscribe((settings) =>
      this.saveSettings(settings)
    );
  }

  onBack() {
    this.location.back();
  }

  saveSettings(form: any) {
    const { language, theme } = this.settingsForm.value;

    this.localizationService.setActiveLang(language);

    this.themeService.update(theme);
    this.themeService.setColorTheme(theme);
  }
}

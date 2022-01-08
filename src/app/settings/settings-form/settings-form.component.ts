import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../shared/settings/theme.service';
import { LocalizationService } from '../../../shared/settings/localization.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  selectedLanguage!: string;
  selectedTheme!: string;

  constructor(
    private localizationService: LocalizationService,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
  }

  ngOnInit(): void {
    this.selectedLanguage = this.localizationService.getActiveLang();
    this.selectedTheme = this.themeService.getColorTheme();
  }

  onChangeLanguage(newLang: string) {
    this.localizationService.setActiveLang(newLang);
  }

  onChangeTheme(newTheme: string) {
    this.themeService.update(newTheme);
    this.themeService.setColorTheme(newTheme);
  }
}

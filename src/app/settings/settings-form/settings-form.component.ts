import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  selectedLanguage!: string;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translocoService.getActiveLang();
  }

  onChange(newLang: string) {
    localStorage.setItem('lang', newLang);
    this.translocoService.setActiveLang(newLang);
  }
}

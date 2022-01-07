import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  onChange(event: any) {
    const lang = event.target.value;
    localStorage.setItem('lang', lang);
    this.translocoService.setActiveLang(lang);
  }
}

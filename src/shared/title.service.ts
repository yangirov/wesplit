import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private tabTitle: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  getTitle(): string {
    const title = this.activatedRoute.snapshot.data['title'];
    this.tabTitle.setTitle(`${title} - ${environment.name}`);
    return title;
  }

  getCustomTitle(title: string): string {
    this.tabTitle.setTitle(`${title} - ${environment.name}`);
    return title;
  }
}

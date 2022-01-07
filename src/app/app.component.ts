import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    const lang =
      localStorage.getItem('lang') ?? this.translocoService.getDefaultLang();
    this.translocoService.setActiveLang(lang);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.rootRoute(this.route)),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((data: { [name: string]: any }) => {
        const lang = this.translocoService.getActiveLang();

        this.translocoService.load(lang).subscribe((x) => {
          const title = this.translocoService.translate(
            `${data.scope}.title`,
            {},
            lang
          );

          this.titleService.setTitle(`${title} - ${environment.name}`);
        });
      });
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}

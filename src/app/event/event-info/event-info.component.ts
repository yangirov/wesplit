import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { EventDto } from '../../../models/Event';
import { DataService } from '../../../shared/data.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ShareEventComponent } from './share-event/share-event.component';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthenticationService } from '../../../shared/authentication.service';

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  eventId!: string;
  opened: boolean = false;

  event$!: Observable<EventDto> | Observable<any>;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private title: Title,
    public authService: AuthenticationService
  ) {}

  catchHttpError = () =>
    catchError((error: any) => {
      const msg = `${error.status} ${error.statusText} -  ${error.url}`;

      return of(new Error(msg));
    });

  async ngOnInit() {
    this.eventId = this.activateRoute.snapshot.params['id'];
    this.event$ = this.dataService.getEventById(this.eventId).pipe(
      catchError((err) => {
        this.router.navigate(['/', 'events']);
        return of();
      }),
      take(1)
    );

    // TODO: this hack is disgusting
    if (this.activateRoute.snapshot.queryParams['refresh']) {
      const url: any = new URL(window.location.href.split('?')[0]);
      window.location = url;
    }

    if (history.state.isCreated) {
      this.openShareModal();
    }

    if (!this.dataService.getCurrentUser(this.eventId)) {
      await this.router.navigate(['login'], { relativeTo: this.activateRoute });
    }

    this.loading$.next(true);

    this.event$.subscribe(
      async (event: EventDto | any) => {
        this.title.setTitle(`${event.name} - ${environment.name}`);
      },
      () => console.error,
      () => this.loading$.next(false)
    );
  }

  getNotification(event: any) {
    if (event === 'openShareModal') {
      this.openShareModal();
    }
  }

  openShareModal() {
    this.event$.subscribe((event: EventDto) => {
      const { name: eventName, id: eventId, ownerUserId: userId } = event;

      const eventShareLink = `${window.location.origin}/events/${eventId}/login?uid=${userId}`;

      this.dialog.open(ShareEventComponent, {
        width: '350px',
        data: {
          title: eventName,
          url: eventShareLink,
        },
      });
    });
  }
}

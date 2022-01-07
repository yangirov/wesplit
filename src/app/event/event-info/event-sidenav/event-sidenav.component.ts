import { Component, Input } from '@angular/core';
import { EventDto } from '../../../../models/Event';
import { DataService } from '../../../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ShareEventComponent } from '../share-event/share-event.component';

@Component({
  selector: 'event-sidenav',
  templateUrl: './event-sidenav.component.html',
  styleUrls: ['./event-sidenav.component.scss'],
})
export class EventSidenavComponent {
  @Input() event!: EventDto;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private translocoService: TranslocoService
  ) {}

  get hasRePayedDebts(): boolean {
    return this.event?.rePayedDebts?.length > 0;
  }

  getMemberName(name: string) {
    const lang = this.translocoService.getActiveLang();
    const youText = this.translocoService.translate('common.you', {}, lang);

    let memberName: string = name;

    if (name === this.dataService.getCurrentUser(this.event.id)) {
      memberName += ` (${youText})`;
    }

    if (name === this.event.organizer) {
      memberName += ' ★';
    }

    return memberName;
  }

  openShareModal() {
    this.dialog.open(ShareEventComponent, {
      width: '350px',
      data: this.event.id,
    });
  }
}

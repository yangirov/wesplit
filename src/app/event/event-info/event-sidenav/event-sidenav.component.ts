import { Component, Input } from '@angular/core';
import { EventDto } from '../../../../models/Event';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { DataService } from '../../../../shared/data.service';
import { AddMemberComponent } from '../../event-login/add-member/add-member.component';
import { MatDialog } from '@angular/material/dialog';
import { PwaInstallComponent } from './pwa-install/pwa-install.component';

@Component({
  selector: 'event-sidenav',
  templateUrl: './event-sidenav.component.html',
  styleUrls: ['./event-sidenav.component.scss'],
})
export class EventSidenavComponent {
  @Input() event!: EventDto;

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  get hasRePayedDebts(): boolean {
    return this.event?.rePayedDebts?.length > 0;
  }

  getMemberName(name: string) {
    let memberName: string = name;

    if (name === this.dataService.getCurrentUser(this.event.id)) {
      memberName += ' (Вы)';
    }

    if (name === this.event.organizer) {
      memberName += ' ★';
    }

    return memberName;
  }

  openPwaDialog(): void {
    const dialogRef = this.dialog.open(PwaInstallComponent, {
      width: '80vw',
      height: '60vh',
    });
  }
}

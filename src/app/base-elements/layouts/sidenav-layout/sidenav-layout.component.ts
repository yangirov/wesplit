import { Component, Input } from '@angular/core';
import { PwaInstallComponent } from '../../pwa-install/pwa-install.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../../shared/authentication.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import isPwa from '../../../../utils/PwaExtensions';

@Component({
  selector: 'app-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss'],
})
export class SidenavLayoutComponent {
  @Input() loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  opened: boolean = false;

  user!: User | null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  isPwa() {
    return isPwa();
  }

  closeSidenav() {
    this.opened = false;
  }

  openPwaDialog(): void {
    const dialogRef = this.dialog.open(PwaInstallComponent, {
      width: '80vw',
      height: '60vh',
    });
  }

  logout() {
    this.loading$.next(true);

    this.authService
      .logout()
      .then(async () => {
        await this.router.navigate(['/login']);
      })
      .catch(console.error)
      .finally(() => this.loading$.next(false));
  }
}

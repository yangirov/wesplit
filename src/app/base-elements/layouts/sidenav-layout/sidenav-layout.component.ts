import { Component, Input } from '@angular/core';
import { PwaInstallComponent } from '../../pwa-install/pwa-install.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../../../shared/auth/authentication.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

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
    return ['fullscreen', 'standalone', 'minimal-ui'].some(
      (displayMode) =>
        window.matchMedia('(display-mode: ' + displayMode + ')').matches
    );
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
        this.loading$.next(false);
        await this.router.navigate(['/']);
      })
      .catch((err) => {
        this.loading$.next(false);
      });
  }
}

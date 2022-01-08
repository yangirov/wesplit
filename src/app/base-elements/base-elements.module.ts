import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyItemsComponent } from './empty-items/empty-items.component';
import { GreyTitleComponent } from './grey-title/grey-title.component';
import { SeparatorComponent } from './separator/separator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NumericDirective } from '../../shared/directives/numeric.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SidenavLayoutComponent } from './layouts/sidenav-layout/sidenav-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PortalModule } from '@angular/cdk/portal';
import { LayoutComponent } from './layouts/layout/layout.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    EmptyItemsComponent,
    GreyTitleComponent,
    SeparatorComponent,
    SpinnerComponent,
    FabButtonComponent,
    NumericDirective,
    ConfirmDialogComponent,
    SidenavLayoutComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslocoModule,
    MatSidenavModule,
    MatToolbarModule,
    PortalModule,
    MatListModule,
  ],
  exports: [
    EmptyItemsComponent,
    GreyTitleComponent,
    SeparatorComponent,
    SpinnerComponent,
    FabButtonComponent,
    NumericDirective,
    ConfirmDialogComponent,
    LayoutComponent,
    SidenavLayoutComponent,
  ],
})
export class BaseElementsModule {}

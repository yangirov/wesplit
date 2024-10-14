import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyItemsComponent } from './empty-items/empty-items.component';
import { GreyTitleComponent } from './grey-title/grey-title.component';
import { SeparatorComponent } from './separator/separator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SidenavLayoutComponent } from './layouts/sidenav-layout/sidenav-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PortalModule } from '@angular/cdk/portal';
import { LayoutComponent } from './layouts/layout/layout.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    EmptyItemsComponent,
    GreyTitleComponent,
    SeparatorComponent,
    SpinnerComponent,
    FabButtonComponent,
    ConfirmDialogComponent,
    SidenavLayoutComponent,
    LayoutComponent,
    FormErrorsComponent,
    NotFoundPageComponent,
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
    ConfirmDialogComponent,
    LayoutComponent,
    SidenavLayoutComponent,
    FormErrorsComponent,
    NotFoundPageComponent,
  ],
})
export class BaseElementsModule {}

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
import { NumericDirective } from '../../shared/numeric.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    EmptyItemsComponent,
    GreyTitleComponent,
    SeparatorComponent,
    SpinnerComponent,
    FabButtonComponent,
    NumericDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TranslocoModule,
  ],
  exports: [
    EmptyItemsComponent,
    GreyTitleComponent,
    SeparatorComponent,
    SpinnerComponent,
    FabButtonComponent,
    NumericDirective,
    ConfirmDialogComponent,
  ],
})
export class BaseElementsModule {}

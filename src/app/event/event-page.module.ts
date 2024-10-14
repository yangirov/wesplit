import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventPageRoutingModule } from './event-page-routing.module';
import { EventFormComponent } from './event-form/event-form.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DebtItemComponent } from './event-info/debts-tab/debt-item/debt-item.component';
import { DebtsTabComponent } from './event-info/debts-tab/debts-tab.component';
import { EventCheckComponent } from './event-info/debts-tab/event-check/event-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShareEventComponent } from './event-info/share-event/share-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { ActionsTabComponent } from './event-info/actions-tab/actions-tab.component';
import { ActionItemComponent } from './event-info/actions-tab/action-item/action-item.component';
import { ActionTypeComponent } from './event-info/actions-tab/action-type/action-type.component';
import { PurchasesTabComponent } from './event-info/purchases-tab/purchases-tab.component';
import { PurchaseItemComponent } from './event-info/purchases-tab/purchase-item/purchase-item.component';
import { EventSidenavComponent } from './event-info/event-sidenav/event-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { BaseElementsModule } from '../base-elements/base-elements.module';
import { RepayDebtComponent } from './event-info/debts-tab/repay-debt/repay-debt.component';
import { EventLoginComponent } from './event-login/event-login.component';
import { EventHeaderComponent } from './event-info/event-sidenav/event-header/event-header.component';
import { AddMemberComponent } from './event-login/add-member/add-member.component';
import { PwaInstallComponent } from '../base-elements/pwa-install/pwa-install.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QrCodeComponent } from './event-info/qr-code/qr-code.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    EventFormComponent,
    EventInfoComponent,
    DebtItemComponent,
    DebtsTabComponent,
    EventCheckComponent,
    ShareEventComponent,
    ActionsTabComponent,
    ActionItemComponent,
    ActionTypeComponent,
    PurchasesTabComponent,
    PurchaseItemComponent,
    EventSidenavComponent,
    RepayDebtComponent,
    EventLoginComponent,
    EventHeaderComponent,
    AddMemberComponent,
    PwaInstallComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    EventPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    ClipboardModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    BaseElementsModule,
    TranslocoModule,
    MatCheckboxModule,
    DigitOnlyModule,
  ],
})
export class EventPageModule {}

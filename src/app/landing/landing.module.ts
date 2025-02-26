import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, LandingRoutingModule, MatButtonModule, TranslocoModule],
})
export class LandingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyItemsComponent } from './empty-items.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [EmptyItemsComponent],
  exports: [EmptyItemsComponent],
  imports: [CommonModule, MatIconModule],
  providers: [],
})
export class EmptyItemsModule {}

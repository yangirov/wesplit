import { Meta, Story } from '@storybook/angular/types-6-0';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

export default {
  title: 'Confirm dialog',
  component: ConfirmDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [MatDialogModule, MatIconModule, MatButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 250px;">${story}</div>`
    ),
  ],
} as Meta;

const Template: Story<ConfirmDialogComponent> = (
  args: ConfirmDialogComponent
) => ({
  props: args,
});

export const Default = Template.bind({});

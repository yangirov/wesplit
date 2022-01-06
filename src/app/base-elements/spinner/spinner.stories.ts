import { Meta, Story } from '@storybook/angular/types-6-0';
import { SpinnerComponent } from './spinner.component';
import { moduleMetadata } from '@storybook/angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export default {
  title: 'Spinner',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule],
    }),
  ],
} as Meta;

const Template: Story<SpinnerComponent> = (args: SpinnerComponent) => ({
  props: args,
});

export const Default = Template.bind({});

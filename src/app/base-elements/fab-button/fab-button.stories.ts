import { Story, Meta } from '@storybook/angular/types-6-0';
import { FabButtonComponent } from './fab-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Fab button',
  component: FabButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story<FabButtonComponent> = (args: FabButtonComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  link: '',
  icon: 'add',
};

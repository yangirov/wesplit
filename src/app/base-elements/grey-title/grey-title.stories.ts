import { Story, Meta } from '@storybook/angular/types-6-0';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { moduleMetadata } from '@storybook/angular';
import { GreyTitleComponent } from './grey-title.component';

export default {
  title: 'Grey title',
  component: GreyTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story<GreyTitleComponent> = (args: GreyTitleComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Lorem ipsum dolor sit',
};

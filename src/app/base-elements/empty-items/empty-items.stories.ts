import { Meta, Story } from '@storybook/angular/types-6-0';
import { EmptyItemsComponent } from './empty-items.component';
import { moduleMetadata } from '@storybook/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export default {
  title: 'Empty items',
  component: EmptyItemsComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story<EmptyItemsComponent> = (args: EmptyItemsComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'add_shopping_cart',
  text: 'Баланс появится когда вы заведете покупки',
};

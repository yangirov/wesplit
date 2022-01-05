import { Story, Meta } from '@storybook/angular/types-6-0';
import { SeparatorComponent } from './separator.component';

export default {
  title: 'Separator',
  component: SeparatorComponent,
} as Meta;

const Template: Story<SeparatorComponent> = (args: SeparatorComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  position: '',
};

export const Full = Template.bind({});
Full.args = {
  position: 'outer',
};

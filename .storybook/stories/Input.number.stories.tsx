import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Input, {IInputProps} from "@/components/UI/Input";

export default {
  title: 'UI/Inputs/Number',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'main',
      values: [
        {
          name: 'main',
          value: '#f5f2f2',
        }
      ],
    },
  },
} as Meta;

export const Default: Story<IInputProps> = (args) => <Input {...args} />;
Default.args = {
  type: 'number',
  placeholder: 'Input some numbers'
};

export const Error: Story<IInputProps> = (args) => <Input {...args} />;
Error.args = {
  type: 'number',
  error: true,
  placeholder: 'Input some numbers'
};

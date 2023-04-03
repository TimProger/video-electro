import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Button, {IButtonProps} from "@/components/UI/Button";

export default {
  title: 'Button',
  component: Button,
} as Meta;

export const Default: Story<IButtonProps> = (args) => <Button {...args} />;
Default.args = {
  children: 'Click me',
  size: 'medium',
  onClick: () => {
    console.log('Default click')
  }
};

export const Success: Story<IButtonProps> = (args) => <Button {...args} />;
Success.args = {
  children: 'Click me',
  success: true,
  size: 'medium',
  onClick: () => {
    console.log('Success click')
  }
};

export const Error: Story<IButtonProps> = (args) => <Button {...args} />;
Error.args = {
  children: 'Click me',
  error: true,
  size: 'medium',
  onClick: () => {
    console.log('Error click')
  }
};

export const Disabled: Story<IButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  children: 'Click me',
  disabled: true,
  size: 'medium',
  onClick: () => {
    console.log('Disabled click')
  }
};

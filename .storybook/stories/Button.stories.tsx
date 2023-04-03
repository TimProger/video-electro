import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Button, {IButtonProps} from "@/components/UI/Button";

export default {
  component: Button,
} as Meta;

export const Default: Story<IButtonProps> = (args) => <Button {...args} />;
Default.args = {
  children: 'Click me',
  onClick: () => {}
};

export const Success: Story<IButtonProps> = (args) => <Button {...args} />;
Success.args = {
  children: 'Click me',
  success: true,
  onClick: () => {}
};

export const Error: Story<IButtonProps> = (args) => <Button {...args} />;
Error.args = {
  children: 'Click me',
  error: true,
  onClick: () => {}
};

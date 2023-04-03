import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Text, {ITextProps} from "@/components/UI/Text";

export default {
  title: 'UI/Text',
  component: Text,
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

export const Default: Story<ITextProps> = (args) => <Text {...args} />;
Default.args = {
  children: 'There is some text example'
};

export const Medium: Story<ITextProps> = (args) => <Text {...args} />;
Medium.args = {
  children: 'There is some text example',
  size: "medium"
};

export const Big: Story<ITextProps> = (args) => <Text {...args} />;
Big.args = {
  children: 'There is some text example',
  size: "big"
};

export const Bigger: Story<ITextProps> = (args) => <Text {...args} />;
Bigger.args = {
  children: 'There is some text example',
  size: "bigger"
};
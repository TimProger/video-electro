import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Select, {ISelectProps} from "@/components/UI/Select";
import {useState} from "@storybook/store";

export default {
  title: 'UI/Select',
  component: Select,
} as Meta;

export const Default: Story<ISelectProps> = () => {

  const [value, setValue] = useState('value 1')

  const args = {
    value,
    values: [
      'value 1',
      'value 2',
      'value 3',
    ],
    onClick: (value: string) => {
      setValue(value)
    }
  }

  return (
    <Select {...args} />
  );
}
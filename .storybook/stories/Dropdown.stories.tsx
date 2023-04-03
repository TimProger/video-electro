import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Dropdown, {IDropdownProps} from "@/components/UI/Dropdown";
import {useState} from "@storybook/store";

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
} as Meta;

export const Default: Story<IDropdownProps> = () => {

  const [open, setOpen] = useState(false)

  const args = {
    title: 'Какие бренды продаются на вашем сайте?',
    text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
      'Окно автосклейлиться относительно количетсва текста!!!',
    open,
    onClick: () => {
      setOpen(prev => !prev)
    },
    setDropdowns: () => {
      setOpen(false)
    }
  }

  return (
    <Dropdown {...args} />
  );
}
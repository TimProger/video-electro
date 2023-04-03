import * as React from "react";
import { Meta, Story } from "@storybook/react";
import Card, {ICardProps} from "@/components/Card";

export default {
  title: 'Card',
  component: Card,
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

export const Default: Story<ICardProps> = (args) => <Card {...args} />;
Default.args = {
  product: {
    id: 0,
    name: "Винт M5х8 ДКС (для соединения крышек лотка)",
    discount: 30,
    image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
    is_hit: false,
    is_new: true,
    product_more: [
      {
        id: 0,
        availability: 2,
        price: 1000000
      }
    ]
  }
};

export const Long: Story<ICardProps> = (args) => <Card {...args} />;
Long.args = {
  type: 'long',
  product: {
    id: 0,
    name: "Винт M5х8 ДКС (для соединения крышек лотка)",
    discount: 30,
    image: 'https://sun9-66.userapi.com/impg/z60XzcTSDTO48u4U6k4Nf0fizg5WUhs0-4GyQw/FWhdFXk8P_Y.jpg?size=686x653&quality=96&sign=2367b18bc0afbd885c07b962898d9438&type=album',
    is_hit: false,
    is_new: true,
    product_more: [
      {
        id: 0,
        availability: 2,
        price: 1000000
      }
    ]
  }
};
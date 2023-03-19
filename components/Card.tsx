import React from 'react';
import s from '@/styles/components/Card.module.scss'
import classNames from "classnames";
import Text from "@/components/Text";
import Button from "@/components/Button";
import {IProduct} from "@/types/Product.types";

interface ICardProps {
  product: IProduct;
  className?: string;
  type?: 'link' | 'btn';
  key?: number | string | null;
}

const Card: React.FC<ICardProps> = ({
                                      product,
                                      className,
                                      type,
                                      key = null,
                                    }) => {

  switch (type){
    default:
      return (
        <div className={classNames(s.card, className)} key={key}>
          <div className={s.card__image}>
            <img src="" alt=""/>
            <div className={s.card__image__discount}>-100%</div>
          </div>
          <Text>
            {product.name}
          </Text>
          <div className={s.card__price}>
            <Text className={s.card__price__old} size={'small'}>
              1 000 000 Р.
            </Text>
            <Text colored={true} size={'medium'}>
              1 000 000 Р.
            </Text>
          </div>
          <div className={s.card__btns}>
            <Button icon={true} style={'outlined'}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.00019C8.20058 0.903175 5.19377 0.255098 2.93923 2.17534C0.68468 4.09558 0.367271 7.30612 2.13778 9.5772C3.60984 11.4654 8.06479 15.4479 9.52489 16.7369C9.68824 16.8811 9.76992 16.9532 9.86519 16.9815C9.94834 17.0062 10.0393 17.0062 10.1225 16.9815C10.2178 16.9532 10.2994 16.8811 10.4628 16.7369C11.9229 15.4479 16.3778 11.4654 17.8499 9.5772C19.6204 7.30612 19.3417 4.07538 17.0484 2.17534C14.7551 0.275296 11.7994 0.903175 10 3.00019Z" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Button>
            <Button size={'medium'} style={'filled'}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              В корзину
            </Button>
          </div>
        </div>
      )
  }
};

export default Card;
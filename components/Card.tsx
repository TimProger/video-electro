import React from 'react';
import s from '@/styles/components/Card.module.scss'
import classNames from "classnames";
import Text from "@/components/Text";
import Button from "@/components/Button";

interface ICardProps {
  className?: string;
  type?: 'link' | 'btn';
  key?: number | string | null;
}

const Card: React.FC<ICardProps> = ({
                                          className,
                                          type,
                                          key = null,
                                        }) => {
  const cn = classNames(
    s.card,
    className)

  switch (type){
    default:
      return (
        <div className={cn} key={key}>
          <div className={s.card__image}>
            <img src="" alt=""/>
            <div className={s.card__image__discount}>-100%</div>
          </div>
          <Text>
            Заголовок на 3 строчки растянутый и сокращается 3мя точка...
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
              В корзину
            </Button>
          </div>
        </div>
      )
  }
};

export default Card;
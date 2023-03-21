import React from 'react';
import s from '@/styles/components/Container.module.scss'

interface ICardProps {
  children?: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({
                                      children,
                                    }) => {

  return (
    <main className={s.container}>
      <div className={s.container__wrapper}>
        {children}
      </div>
    </main>
  )
};

export default Card;
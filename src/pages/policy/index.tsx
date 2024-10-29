import React from "react";
import Text from "@/components/UI/Text/Text";
import Container from '@/components/UI/Container/Container';
import s from './styles.module.scss'

interface IPolicyProps {
  policy: {
    name: string;
    text: string;
  }[]
}

const Policy: React.FC<IPolicyProps> = ({policy}) => {
  
  return (
    <Container>
      <div className={s.policy}>
        <Text type={'h1'} size={'bigger'}>Политика конфиденциальности</Text>
          <div className={s.content}>
            {policy.map((el, index) => {
              return <div key={index} className={s.content__block}>
                <Text type={'h2'} size={'big+'}>{index+1}. {el.name}</Text>
                <Text type={'p'} size={'small'}>{el.text}</Text>
              </div>
            })}
        </div>
      </div>
    </Container>
  )
}

export default Policy
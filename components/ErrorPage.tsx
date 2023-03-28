import React from "react";
import Container from '@/components/UI/Container';
import s from '@/styles/components/ErrorPage.module.scss'
import Text from "@/components/UI/Text";

interface IErrorPageProps {
  code: number | string;
  text: string;
}

const ErrorPage: React.FC<IErrorPageProps> = ({code, text}) => {

  return (
    <Container>
      <div className={s.not_found}>
        <div className={s.not_found__content}>
          <Text className={s.not_found__content__404} type={'h2'} colored size={'bigger'}>
            {code}
          </Text>
          <Text type={'h1'} size={'big'}>
            {text}
          </Text>
        </div>
      </div>
    </Container>
  )
}


export default ErrorPage
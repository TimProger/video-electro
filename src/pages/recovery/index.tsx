import React from "react";
import Text from "@/components/UI/Text/Text";
import Container from '@/components/UI/Container/Container';
import s from './styles.module.scss'
import recovery_one from "../../../public/images/pages/recovery/1.png"
import recovery_two from "../../../public/images/pages/recovery/2.png"
import recovery_three from "../../../public/images/pages/recovery/3.png"
import Image from "next/image";
import classNames from "classnames";

interface IRecoveryProps {
}

const Recovery: React.FC<IRecoveryProps> = () => {

  return (
    <Container>
      <div className={s.recovery}>
        <Text type={'h1'} size={'bigger'}>Возврат и обмен</Text>
        <div className={s.recovery__content}>
          <div className={s.recovery__content__left}>
            <div className={s.recovery__content__left__block}>
              <Text type={'h2'} size={'big+'}>Как это сделать?</Text>
              <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            </div>
            <div className={s.recovery__content__left__block}>
              <Text type={'h2'} size={'big+'}>Когда это сделать?</Text>
              <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            </div>
            <div className={s.recovery__content__left__block}>
              <Text type={'h2'} size={'big+'}>Этапы возврата</Text>
              <div className={s.recovery__content__left__block__numbers}>
                <div className={s.recovery__content__left__block__numbers__container}>
                  <Image unoptimized width={33} height={77} src={recovery_one.src} alt=""/>
                  <Text>Оплатите ваш заказ, нажав на кнопку слева и проверьте статус в личном кабинете.</Text>
                </div>
                <div className={classNames(s.recovery__content__left__block__numbers__container)}>
                  <Image unoptimized width={33} height={77} src={recovery_two.src} alt=""/>
                  <Text>С вами свяжеться наш менеджер и заключит с вами договор.</Text>
                </div>
                <div className={s.recovery__content__left__block__numbers__container}>
                  <Image unoptimized width={33} height={77} src={recovery_three.src} alt=""/>
                  <Text>По согласованному времени, вы получите товары. Не забудьте оставить отзывы на товары. Спасибо, что выбрали нас!</Text>
                </div>
              </div>
            </div>
          </div>
          <div className={s.recovery__content__right}>
            <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Recovery
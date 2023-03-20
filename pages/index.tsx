import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Head from "next/head";
import s from '@/styles/pages/Main.module.scss'
import Text from "@/components/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card";
import Button from "@/components/Button";
import team__ivan from "@/public/images/pages/main/team/ivan_vlad.png"
import team__petrov from "@/public/images/pages/main/team/petrov_oleg.png"
import team__aranian from "@/public/images/pages/main/team/aranian_viktorya.png"
import team__belov from "@/public/images/pages/main/team/belov_arseniy.png"
import about from "@/public/images/pages/main/about.jpg"
import Image from "next/image";

interface IMainProps {
}

const Main: React.FC<IMainProps> = () => {

  const { products } = useTypedSelector(state => state.product)

  return (
    <Layout>
      <Head>
        <title>Главная</title>
      </Head>
      <Container>
        <div className={s.main}>
          <div className={s.main__catalog}>
            <div className={s.main__catalog__header}>
              <Text size={'bigger'} type={'h2'}>Каталог</Text>
              <Button type={'link'} href={'/catalog'} size={'bigger'}>Смотреть все</Button>
            </div>
            <div className={s.main__catalog__cards}>
              {products.map((el)=>{
                return <Card product={el} />
              })}
            </div>
          </div>
          <div className={s.main__about}>
            <div className={s.main__about__info}>
              <Text size={'bigger'} type={'h2'}>О компании</Text>
              <Text size={'small'} type={'p'}>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
              <Button type={'link'} href={'/about'} size={'bigger'}>Подробнее</Button>
            </div>
            <div className={s.main__about__image}>
              <Image unoptimized width={225} height={225} src={about.src} alt=""/>
            </div>
          </div>
          <div className={s.main__team}>
            <div className={s.main__team__title}>
              <Text size={'bigger'} type={'h2'}>Наша команда</Text>
            </div>
            <div className={s.main__team__list}>
              <div className={s.main__team__list__teammate}>
                <Image unoptimized width={225} height={225} src={team__ivan.src} alt="Иванов Владислав Валерьевич"/>
                <Text bold size={'medium'}>Иванов Владислав Валерьевич</Text>
                <Text className={s.main__team__list__teammate__job} size={'small'}>Генеральный директор</Text>
              </div>
              <div className={s.main__team__list__teammate}>
                <Image unoptimized width={225} height={225} src={team__petrov.src} alt="Иванов Владислав Валерьевич"/>
                <Text bold size={'medium'}>Петров Олег Андреевич</Text>
                <Text className={s.main__team__list__teammate__job} size={'small'}>Заведующий складом</Text>
              </div>
              <div className={s.main__team__list__teammate}>
                <Image unoptimized width={225} height={225} src={team__aranian.src} alt="Иванов Владислав Валерьевич"/>
                <Text bold size={'medium'}>Араньян Виктория Сергеевна</Text>
                <Text className={s.main__team__list__teammate__job} size={'small'}>Менеджер</Text>
              </div>
              <div className={s.main__team__list__teammate}>
                <Image unoptimized width={225} height={225} src={team__belov.src} alt="Иванов Владислав Валерьевич"/>
                <Text bold size={'medium'}>Белов Арсений Аркадьевич</Text>
                <Text className={s.main__team__list__teammate__job} size={'small'}>Бухгалтер</Text>
              </div>
            </div>
            <Button type={'link'} href={'/coop'} size={'bigger'}>Сотрудничать</Button>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default Main
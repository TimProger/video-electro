import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text/Text";
import Layout from '@/components/Layout/Layout';
import Container from '@/components/UI/Container/Container';
import Head from "next/head";
import s from './styles.module.scss'
// import about from "@/public/images/pages/main/about.jpg"
import Image from "next/image";

interface IDeliveryProps {
}

const Delivery: React.FC<IDeliveryProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Доставка | Video-Electro</title>
        <meta name={"og:title"} content={"Доставка | Video-Electro"} />
        <meta property="description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta property="og:description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta property="og:url" content={'https://video-electro.ru/delivery'} />
      </Head>
        <Container>
          <div className={s.delivery}>
            <div className={s.content}>
              <div className={s.content__left}>
                <Text type={'h1'} size={'bigger'}>Доставка</Text>
                <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
                <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
                <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>
              </div>
              <div className={s.content__right}>
                <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>
                <Text type={'h2'} size={'big+'}>Сроки доставки</Text>
                <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
                <Text type={'h2'} size={'big+'}>Куда можете доставить?</Text>
                <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
              </div>
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

export default Delivery
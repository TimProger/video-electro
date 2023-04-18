import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Recovery.module.scss'
import about from "@/public/images/pages/main/about.jpg"
import Image from "next/image";

interface IRecoveryProps {
}

const Recovery: React.FC<IRecoveryProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Возврат и обмен</title>
        <meta name={"og:title"} content={"Доставка"} />
      </Head>
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
                  <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
                </div>
              </div>
              <div className={s.recovery__content__right}>
                <Image unoptimized width={225} height={225} src={about.src} alt=""/>
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

export default Recovery
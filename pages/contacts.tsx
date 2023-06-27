import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Contacts.module.scss'

interface IDeliveryProps {
}

const Delivery: React.FC<IDeliveryProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Контакты | Video-Electro</title>
        <meta name={"og:title"} content={"Контакты | Video-Electro"} />
      </Head>
        <Container>
          <div className={s.contacts}>
            <div className={s.contacts__content}>
              <Text type={'h1'} size={'bigger'}>Контакты</Text>
              <div className={s.contacts__content__blocks}>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Контактный телефон</Text>
                  <Text type={'link'} href={'tel:+79990880105'} bold size={'big+'}>+7 999 088 01 05</Text>
                </div>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Юридический адрес</Text>
                  <Text type={'link'} href={'https://yandex.ru/maps/213/moscow/house/ulitsa_novy_arbat_15/Z04Ycw5iTUcHQFtvfXt0c31nZQ==/?ll=37.592455%2C55.752155&z=17.55'} external bold size={'big+'}>Москва, ул. Новый Арбат 15, офис 317</Text>
                </div>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Email</Text>
                  <Text type={'link'} href={'mailto:video-electro@help.ru'} bold size={'big+'}>video-electro@help.ru</Text>
                </div>
              </div>
              <div className={s.contacts__content__more}>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Реквизиты</Text>
                  <Text type={'p'} size={'medium'}>ООО “Видео-электро”</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ИНН</Text>
                  <Text type={'p'} size={'medium'}>131245345943599646</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ОГРНИП</Text>
                  <Text type={'p'} size={'medium'}>2341432554523123</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Расчётный счёт</Text>
                  <Text type={'p'} size={'medium'}>4080 4353 3453 4535 6757</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Фактический адрес</Text>
                  <Text type={'p'} size={'medium'}>Москва, ул. Новый Арбат 15, офис 317</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Дополнительный телефон</Text>
                  <Text type={'link'} href={'tel:+78887771122'} size={'medium'}>+7 888 777 11 22</Text>
                </div>
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
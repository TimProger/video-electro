import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Contacts.module.scss'

interface IProfileProps {
}

const Profile: React.FC<IProfileProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Контакты</title>
        <meta name={"og:title"} content={"Контакты"} />
      </Head>
        <Container>
          <div className={s.contacts}>
            <div className={s.contacts__content}>
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

export default Profile
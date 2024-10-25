import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text/Text";
import Layout from '@/components/Layout/Layout';
import Container from '@/components/UI/Container/Container';
import Head from "next/head";
import s from './styles.module.scss'

interface IContactsProps {
}

const Contacts: React.FC<IContactsProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Контакты | Video-Electro</title>
        <meta name={"og:title"} content={"Контакты | Video-Electro"} />
        <meta property="description" content={'Телефон, почта, адрес и реквизиты компании.'} />
        <meta property="og:description" content={'Телефон, почта, адрес и реквизиты компании.'} />
        <meta property="og:url" content={'https://video-electro.ru/contacts'} />
      </Head>
        <Container>
          <div className={s.contacts}>
            <div className={s.content}>
              <Text type={'h1'} size={'bigger'}>Контакты</Text>
              <div className={s.content__more}>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Полное наименование организации</Text>
                  <Text type={'p'} size={'medium'}>Общество с ограниченной ответственностью «СТРОЙИНЖЕНЕРМОНТАЖ»</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Сокращенное наименование организации</Text>
                  <Text type={'p'} size={'medium'}>ООО «СИМ»</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Юридический адрес</Text>
                  <Text type={'link'} href={"https://yandex.ru/maps/geo/avtozavodskaya_ulitsa_23bk2_podyezd_4/3830013200/?ll=37.650343,55.700786&z=18"} external size={'medium'}>115280, г. Москва, ул. Автозаводская, д.23Б, К2, кв.675</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Конт. лицо</Text>
                  <Text type={'p'} size={'medium'}>Нагаев Н.В.</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Контактный телефон</Text>
                  <Text type={'link'} href={'tel:+79803718016'} size={'medium'}>+7 980 371 8016</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Банк</Text>
                  <Text type={'p'} size={'medium'}>АО «Тинькофф Банк»</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Р/С</Text>
                  <Text type={'p'} size={'medium'}>40702810502860014001</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>К/с №</Text>
                  <Text type={'p'} size={'medium'}>30101810200000000593</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>БИК</Text>
                  <Text type={'p'} size={'medium'}>044525225</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ИНН</Text>
                  <Text type={'p'} size={'medium'}>5024221061</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>КПП</Text>
                  <Text type={'p'} size={'medium'}>772501001</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ОГРН</Text>
                  <Text type={'p'} size={'medium'}>1225000042189</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Код по ОКВЭД</Text>
                  <Text type={'p'} size={'medium'}>41.20</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Код по ОКПО</Text>
                  <Text type={'p'} size={'medium'}>80611686</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Идентификатор ЭДО</Text>
                  <Text type={'p'} size={'medium'}>2BE94cd8db300a44ca0919224d8d6941317</Text>
                </div>
                <div className={s.content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Адрес электронной почты</Text>
                  <Text type={'link'} href={'mailto:sim_msk@bk.ru'} size={'medium'}>sim_msk@bk.ru</Text>
                </div>
              </div>
              <Text type={'h3'} size={'big'}>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ПРОГРЕСС-ЭЛЕКТРО"</Text>
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

export default Contacts
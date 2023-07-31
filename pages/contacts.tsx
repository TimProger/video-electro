import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Contacts.module.scss'

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
            <div className={s.contacts__content}>
              <Text type={'h1'} size={'bigger'}>Контакты</Text>
              <div className={s.contacts__content__blocks}>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Контактный телефон</Text>
                  <Text type={'link'} href={'tel:+79990880105'} bold size={'big+'}>+7 999 088 01 05</Text>
                </div>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Юридический адрес</Text>
                  <Text type={'link'} href={"https://www.google.com/maps/place/Ulitsa+Rotmistrova,+Prokhorovka,+Belgorodskaya+oblast',+Russia,+309000/data=!4m2!3m1!1s0x4125fa5557e90d8b:0x723ee168040e27aa?sa=X&ved=2ahUKEwiaoomvormAAxUnQ_EDHf0FAuEQ8gF6BAgWEAA&ved=2ahUKEwiaoomvormAAxUnQ_EDHf0FAuEQ8gF6BAgXEAI"} external bold size={'big+'}>309000,РФ,Белгородская обл. Прохоровский р-н, пгт.
Прохоровка, ул Ротмистрова д6/1</Text>
                </div>
                <div className={s.contacts__content__blocks__block}>
                  <Text type={'h2'} size={'small'} colored>Email</Text>
                  <Text type={'link'} href={'mailto:videoelectroru@gmail.com'} bold size={'big+'}>videoelectroru@gmail.com</Text>
                </div>
              </div>
              <div className={s.contacts__content__more}>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Реквизиты</Text>
                  <Text type={'p'} size={'medium'}>ООО «ПРОГРЕСС-ЭЛЕКТРО»</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ИНН</Text>
                  <Text type={'p'} size={'medium'}>3123341662</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>КПП</Text>
                  <Text type={'p'} size={'medium'}>311501001</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Банк</Text>
                  <Text type={'p'} size={'medium'}>МОСКОВСКИЙ ФИЛИАЛ АО КБ "МОДУЛЬБАНК"</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>БИК</Text>
                  <Text type={'p'} size={'medium'}>044525092</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>К/с №</Text>
                  <Text type={'p'} size={'medium'}>30101810645250000092</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Р/С</Text>
                  <Text type={'p'} size={'medium'}>40702810770010387761</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ОГРН</Text>
                  <Text type={'p'} size={'medium'}>1143123005486</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Почтовый адрес</Text>
                  <Text  type={'link'} href={"https://www.google.com/maps/place/Ulitsa+Rotmistrova,+Prokhorovka,+Belgorodskaya+oblast',+Russia,+309000/@51.0438241,36.7296713,17z/data=!3m1!4b1!4m6!3m5!1s0x4125fa5557e90d8b:0x723ee168040e27aa!8m2!3d51.0438241!4d36.7296713!16s%2Fg%2F1jkxl3wx0?entry=ttu"} external size={'medium'}>309000,РФ,Белгородская обл. Прохоровский р-н, пгт.
Прохоровка, ул Ротмистрова д6/</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Фактический адрес</Text>
                  <Text  type={'link'} href={'https://yandex.ru/maps/213/moscow/house/ulitsa_novy_arbat_15/Z04Ycw5iTUcHQFtvfXt0c31nZQ==/?ll=37.592455%2C55.752155&z=17.55'} external size={'medium'}>Москва, ул. Новый Арбат 15, офис 317</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Дополнительный телефон</Text>
                  <Text type={'link'} href={'tel:+78887771122'} size={'medium'}>+7 888 777 11 22</Text>
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
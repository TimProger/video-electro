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
                  <Text type={'link'} href={"https://yandex.ru/maps/geo/bulvar_kosmonavtov_17_podyezd_1/3812421530/?ll=37.285798%2C55.837788&z=18.79"} external bold size={'big+'}>143408, РОССИЯ, МОСКОВСКАЯ ОБЛ., Г. КРАСНОГОРСК, БУЛЬВАР КОСМОНАВТОВ, Д 17, КВ 232</Text>
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
                  <Text type={'p'} size={'medium'}>5024221061</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>КПП</Text>
                  <Text type={'p'} size={'medium'}>502401001</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Банк</Text>
                  <Text type={'p'} size={'medium'}>АО «Тинькофф Банк»</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Банк</Text>
                  <Text type={'p'} size={'medium'}>127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>БИК</Text>
                  <Text type={'p'} size={'medium'}>044525974</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ИНН банка</Text>
                  <Text type={'p'} size={'medium'}>7710140679</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>К/с №</Text>
                  <Text type={'p'} size={'medium'}>30101810145250000974</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>Р/С</Text>
                  <Text type={'p'} size={'medium'}>40702810310001489552</Text>
                </div>
                <div className={s.contacts__content__more__block}>
                  <Text type={'h3'} size={'small'} colored>ОГРН</Text>
                  <Text type={'p'} size={'medium'}>1225000042189</Text>
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
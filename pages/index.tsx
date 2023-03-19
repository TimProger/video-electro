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
                return <Card className={s.main__catalog__cards__card} product={el} />
              })}
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

export default Main
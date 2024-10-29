import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import Basket from '@/pages/basket';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Корзина | Video-Electro</title>
        <meta name={"og:title"} content={"Корзина | Video-Electro"} />
        <meta property="description" content={'Список ваших товаров, добавленных в корзину.'} />
        <meta property="og:description" content={'Список ваших товаров, добавленных в корзину.'} />
        <meta property="og:url" content={'https://video-electro.ru/basket'} />
      </Head>
      <Basket />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default page
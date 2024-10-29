import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Favs from '@/pages/favs';
import Head from "next/head";

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Избранное | Video-Electro</title>
        <meta name={"og:title"} content={"Избранное | Video-Electro"} />
        <meta property="description" content={'Список ваших товаров, добавленных в список избранных.'} />
        <meta property="og:description" content={'Список ваших товаров, добавленных в список избранных.'} />
        <meta property="og:url" content={'https://video-electro.ru/favs'} />
      </Head>
      <Favs />
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
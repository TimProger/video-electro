import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import Recovery from '@/pages/recovery';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Возврат и обмен | Video-Electro</title>
        <meta name={"og:title"} content={"Возврат и обмен | Video-Electro"} />
        <meta property="description" content={'Этапы возврата товара.'} />
        <meta property="og:description" content={'Этапы возврата товара.'} />
        <meta property="og:url" content={'https://video-electro.ru/recovery'} />
      </Head>
      <Recovery />
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
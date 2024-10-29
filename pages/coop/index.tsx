import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import Coop from '@/pages/coop';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Сотрудничество | Video-Electro</title>
        <meta name={"og:title"} content={"Сотрудничество | Video-Electro"} />
        <meta property="description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta property="og:description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta property="og:url" content={'https://video-electro.ru/coop'} />
      </Head>
      <Coop />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  // return {
  //   notFound: true
  // }

  return {
    props: {},
    revalidate: 10,
  }
}

export default page
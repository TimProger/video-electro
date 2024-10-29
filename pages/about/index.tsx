import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import About from '@/pages/about';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {


  return (
    <Layout>
      <Head>
        <title>О нас | Video-Electro</title>
        <meta property="og:title" content={'О нас | Video-Electro'} />
        <meta property="description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta property="og:description" content={'Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику.'} />
        <meta/>
      </Head>
      <About />
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
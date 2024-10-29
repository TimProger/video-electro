import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import Faq from '@/pages/faq';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>FAQ | Video-Electro</title>
        <meta name={"og:title"} content={"FAQ | Video-Electro"} />
        <meta property="description" content={'Ответы на все вопросы касаемо нашей компании.'} />
        <meta property="og:description" content={'Ответы на все вопросы касаемо нашей компании.'} />
        <meta property="og:url" content={'https://video-electro.ru/faq'} />
      </Head>
      <Faq />
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
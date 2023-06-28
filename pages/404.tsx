import { GetStaticProps } from 'next'
import React from "react";
import ErrorPage from "@/components/ErrorPage";
import Head from "next/head";
import Layout from "@/components/Layout";

interface INotFoundProps {
  code: number;
  text: string;
}

const NotFound: React.FC<INotFoundProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Не найдено | Video-Electro</title>
        <meta name={"og:title"} content={"Страница не найдена | Video-Electro"} />
        <meta property="description" content={'Страница не найдена.'} />
        <meta property="og:description" content={'Страница не найдена.'} />
      </Head>
      <ErrorPage code={404} text={'Страница не найдена'} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default NotFound
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
        <title>404 | Not Found</title>
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
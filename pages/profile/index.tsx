import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import Profile from '@/pages/profile';

interface IPageProps {
}

const page: React.FC<IPageProps> = () => {

  return (
    <Layout>
      <Head>
        <title>Профиль | Video-Electro</title>
        <meta name={"og:title"} content={"Профиль | Video-Electro"} />
      </Head>
      <Profile />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      
    },
    revalidate: 10,
  }
}

export default page
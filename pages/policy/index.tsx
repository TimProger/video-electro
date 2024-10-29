import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import { API_BASE_URL } from '@/http/axios';
import Policy from '@/pages/policy';

interface IPageProps {
  policy: {
    name: string;
    text: string;
  }[]
}

const page: React.FC<IPageProps> = ({policy}) => {
  
  return (
    <Layout>
      <Head>
        <title>Политика конфиденциальности | Video-Electro</title>
        <meta name={"og:title"} content={"Политика конфиденциальности | Video-Electro"} />
        <meta property="description" content={'Политика конфиденциальности компании.'} />
        <meta property="og:description" content={'Политика конфиденциальности компании.'} />
        <meta property="og:url" content={'https://video-electro.ru/policy'} />
      </Head>
      <Policy policy={policy} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const policyData: {
    name: string;
    text: string;
  }[] = await fetch(`${API_BASE_URL}/Politics`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return []
    })

  return {
    props: {
      policy: policyData
    },
    revalidate: 10,
  }
}

export default page
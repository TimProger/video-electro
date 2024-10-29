import { GetStaticProps } from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Main from '@/pages/home';
import Head from "next/head";
import {IProductShort} from "@/types/Product.types";
import {API_BASE_URL} from "@/http/axios";

interface IPageProps {
  products: IProductShort[]
}

const page: React.FC<IPageProps> = ({products}) => {

  return (
    <Layout>
      <Head>
        <title>Главная | Video-Electro</title>
        <meta name={"og:title"} content={"Главная | Video-Electro"} />
        <meta property="description" content={'Время приобрести электрику в Video-Electro.'} />
        <meta property="og:description" content={'Время приобрести электрику в Video-Electro.'} />
        <meta property="og:url" content={'https://video-electro.ru/'} />
      </Head>
      <Main products={products} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const productsData: IProductShort[] = await fetch(`${API_BASE_URL}/product`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return []
    })

  return {
    props: {
      products: productsData.length > 8 ? productsData.splice(0, 8) : productsData
    },
    revalidate: 10,
  }
}

export default page
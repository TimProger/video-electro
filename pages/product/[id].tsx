import { GetStaticProps } from 'next'
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import {API_BASE_URL} from "@/http/axios";
import Product from '@/pages/product';
import { IProduct } from '@/types/Product.types';

interface IPageProps {
  info: IProduct
}

const page: React.FC<IPageProps> = ({info}) => {

  const {product} = info

  return (
    <Layout>
      <Head>
        <title>{product.ProductName} | Video-Electro</title>
        <meta name={"og:title"} content={`${product.ProductName} — купить в Video-Electro`} />
        <meta property="description" content={product.ProductDescription ? `${product.ProductDescription}` : `Купить товар по оптимальной цене в Video-Electro!`} />
        <meta property="og:description" content={product.ProductDescription ? `${product.ProductDescription}` : `Купить товар по оптимальной цене в Video-Electro!`} />
        <meta property="og:url" content={`https://video-electro.ru/product/${product.id}`} />
      </Head>
      <Product info={info} />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '2' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const productData: IProduct | null = await fetch(`${API_BASE_URL}/product/${params?.id}`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return null
    })

  if (!productData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      info: productData
    },
    revalidate: 10
  }
}

export default page
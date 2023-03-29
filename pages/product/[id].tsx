import { GetStaticProps } from 'next'
import React from "react";
import Head from "next/head";
import Container from "@/components/UI/Container";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import s from '@/styles/pages/Product.module.scss'
import Layout from "@/components/Layout";

interface IProductProps {
  id: string
}

const Product: React.FC<IProductProps> = ({id}) => {

  const {products} = useTypedSelector(state => state.product)

  const product = products.find((el) => el.id === +id)

  if(!product){
    return <div>
      none
    </div>
  }

  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name={"og:title"} content={product.name} />
      </Head>
      <Container>
        <div className={s.product}>
          <div className={s.product__content}>
            {product.name}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const request  = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const movies = await request.json()

  const paths = movies.map((_: any, index: number) =>({
    params: {id: `${index}`},
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  return {
    props: {
      id: params?.id
    },
    revalidate: 10
  }
}

export default Product
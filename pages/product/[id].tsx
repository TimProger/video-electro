import { GetStaticProps } from 'next'
import React from "react";
import Head from "next/head";
import Container from "@/components/UI/Container";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import s from '@/styles/pages/Product.module.scss'
import Layout from "@/components/Layout";
import Text from "@/components/UI/Text";
import {Storage} from "@/utils/storage";

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
          <Text no_td
                className={s.product__back}
                type={'link'}
                href={(()=>{
                  if (typeof window !== 'undefined') {
                    return Storage.get('prevPage')
                  }
                })()}
                colored>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Назад</Text>
          <div className={s.product__content}>
            <Text type={'h1'} size={'bigger'}>{product.name}</Text>
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
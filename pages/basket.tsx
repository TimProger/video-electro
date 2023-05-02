import { GetStaticProps } from 'next'
import React, {useEffect} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Basket.module.scss'
import Text from "@/components/UI/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card";
import Button from "@/components/UI/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setBasketProducts} from "@/store/Slices/Basket.slice";
import {animated, useTrail} from "react-spring";

interface IFavsProps {
}

const Basket: React.FC<IFavsProps> = () => {

  const dispatch = useAppDispatch()
  const { products } = useTypedSelector(state => state.basket)

  const trailProducts = useTrail(products.length, {
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
  });

  const onClear = () => {
    dispatch(setBasketProducts([]))
  }

  useEffect(()=>{
  }, [])

  return (
    <Layout>
      <Head>
        <title>Корзина</title>
        <meta name={"og:title"} content={"Корзина"} />
      </Head>
      <Container>
        <div className={s.basket}>
          <div className={s.basket__container}>
            <div className={s.basket__container__header}>
              <Text size={'bigger'} type={'h1'}>Корзина</Text>
              {products.length > 0 && <Button onClick={onClear}
                                              style={'borderless'}
                                              size={'medium'}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Удалить все</Button>}
            </div>
            <div className={s.basket__container__cards}>
              {trailProducts.length > 0 ? trailProducts.map((styles, index)=>{
                return <animated.div className={s.basket__container__cards__animated} key={products[index].id} style={styles}>
                  <Card basket type={'long'} product={products[index]} />
                </animated.div>
              }) : <div className={s.basket__container__noCards}>
                <Text size={'small'} type={'p'}>В избранном нет товаров</Text>
                <Button size={'medium'}
                        type={'link'}
                        href={'catalog'}
                >В каталог</Button>
              </div>}
            </div>
          </div>
          <div className={s.basket__info}>
            <Text type={'h2'} size={'big+'}>Ваша корзина</Text>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default Basket
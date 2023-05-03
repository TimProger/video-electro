import { GetStaticProps } from 'next'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import Container from "@/components/UI/Container";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import s from '@/styles/pages/Product.module.scss'
import Layout from "@/components/Layout";
import Text from "@/components/UI/Text";
import {Storage} from "@/utils/storage";
import Button from "@/components/UI/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {toggleFavsProduct} from "@/store/Slices/Favs.slice";

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

  const dispatch = useAppDispatch()
  const favsState = useTypedSelector(state => state.favs)
  const [isFav, setIsFav] = useState<boolean>(false)

  useEffect(()=>{
    const includes = favsState.products.find(el => el.id === product.id)
    if(includes){
      setIsFav(true)
    }else{
      setIsFav(false)
    }
  },[favsState.products])

  const onToggleFavs = () => {
    dispatch(toggleFavsProduct(product))
  }

  const [width, setWidth] = useState<string>('desktop')

  const resize = () => {
    if(window){
      if(window.innerWidth > 1150){
        setWidth('desktop')
      }else if(window.innerWidth <= 1150 && window.innerWidth > 700) {
        setWidth('tablet')
      }else if(window.innerWidth <= 700) {
        setWidth('mobile')
      }else{
        setWidth('desktop')
      }
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', resize)
    if(window){
      if(window.innerWidth > 1150){
        setWidth('desktop')
      }else if(window.innerWidth <= 1150 && window.innerWidth > 700) {
        setWidth('tablet')
      }else if(window.innerWidth <= 700) {
        setWidth('mobile')
      }else{
        setWidth('desktop')
      }
    }

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

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
            <div className={s.product__content__images}>
              <div className={s.product__content__images__image}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={s.product__content__images__list}>
                <img src={product.image} alt={product.name} />
                <img src={product.image} alt={product.name} />
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className={s.product__content__info}>
              <div className={s.product__content__info__header}>
                <div className={s.product__content__info__header__statuses}>
                  {product.availability <= 0 && <div className={s.product__content__info__header__statuses__not}>Нет в наличии</div>}
                  {product.is_hit && <div>Хит продаж</div>}
                  {product.is_new && <div>Новинка</div>}
                  {product.discount && <div>-${product.discount}%</div>}
                </div>
                <div className={s.product__content__info__header__article}>
                  <div>Артикул: {product.article}</div>
                </div>
              </div>
              <Text type={'h1'}
                    size={'big+'}>{product.name}</Text>
              <div className={s.product__content__info__price}>
                {product.discount && <Text type={'span'}
                                           className={s.product__content__info__price__old}
                                           size={'medium'}>
                  {`${product.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text>}
                <Text bold
                      colored={true}
                      size={'big+'}>
                  {`${product.discount ? product.price-(product.price / 100 * product.discount) : product.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text>
              </div>
              <div className={s.product__content__info__btns}>
                <Button disabled={product.availability <= 0}
                        size={width === 'desktop' ? 'bigger' : 'medium'}
                        style={'filled'}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Добавить в корзину
                </Button>
                <Button icon={true}
                        onClick={onToggleFavs}
                        size={'icon_bigger'}
                        style={isFav ? 'filled' : 'outlined'}>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.00019C8.20058 0.903175 5.19377 0.255098 2.93923 2.17534C0.68468 4.09558 0.367271 7.30612 2.13778 9.5772C3.60984 11.4654 8.06479 15.4479 9.52489 16.7369C9.68824 16.8811 9.76992 16.9532 9.86519 16.9815C9.94834 17.0062 10.0393 17.0062 10.1225 16.9815C10.2178 16.9532 10.2994 16.8811 10.4628 16.7369C11.9229 15.4479 16.3778 11.4654 17.8499 9.5772C19.6204 7.30612 19.3417 4.07538 17.0484 2.17534C14.7551 0.275296 11.7994 0.903175 10 3.00019Z" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </Button>
              </div>
              <div className={s.product__content__info__desc}>
                <Text size={'medium'}>Описание:</Text>
                <Text className={s.product__content__info__desc__text}>В случае если у товара есть описание то первые 4 строчки можно вывести сюда, для удобства пользователя. Соответственно следуя этому правилу я добавлю кнопку ниже, просто так!...</Text>
              </div>
            </div>
          </div>
          <div className={s.product__info}>
            <div className={s.product__info__details}>
              <Text size={'big+'} type={'h2'}>Характеристики</Text>
              <div>
                <Text bold>Брэнд</Text>
                <Text>CHINT</Text>
              </div>
              <div>
                <Text bold>Серия</Text>
                <Text>NXC</Text>
              </div>
              <div>
                <Text bold>Наименование товара производителя</Text>
                <Text>Пылезащитный кожух AXC-2 для NXC-25-38 (CHINT)</Text>
              </div>
              <div>
                <Text bold>Артикул производителя</Text>
                <Text>Промэлектроснаб</Text>
              </div>
              <div>
                <Text bold>Штрих код</Text>
                <Text>6901800822493</Text>
              </div>
              <div>
                <Text bold>Гарантийный срок</Text>
                <Text>18 месяцев</Text>
              </div>
              <div>
                <Text bold>Произведено</Text>
                <Text>Китай</Text>
              </div>
              <div>
                <Text bold>Исполнение</Text>
                <Text>Поверхностный</Text>
              </div>
              <div>
                <Text bold>Материал корпуса</Text>
                <Text>Пластик</Text>
              </div>
              <div>
                <Text bold>С прозрачной крышкой</Text>
                <Text>Да</Text>
              </div>
            </div>
            <div className={s.product__info__desc}>
              <Text size={'big+'} type={'h2'}>Описание</Text>
              <Text className={s.product__info__desc__text}>В случае если у товара есть описание то первые 4 строчки можно вывести сюда, для удобства пользователя. Соответственно следуя этому правилу я добавлю кнопку ниже, просто так!... В случае если у товара есть описание то первые 4 строчки можно вывести сюда, для удобства пользователя. Соответственно следуя этому правилу я добавлю кнопку ниже, просто так!...В случае если у товара есть описание то первые 4 строчки можно вывести сюда, для удобства пользователя. Соответственно следуя этому правилу я добавлю кнопку ниже, просто так!...</Text>
            </div>
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
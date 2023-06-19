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
import {IProduct} from "@/types/Product.types";
import {API_BASE_URL} from "@/http/axios";
import classNames from "classnames";

interface IProductProps {
  info: IProduct
}

const Product: React.FC<IProductProps> = ({info}) => {

  const {product, images, feature} = info

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

  const {width} = useTypedSelector(state => state.profile)

  const [image, setImage] = useState<string>(product.image)

  return (
    <Layout>
      <Head>
        <title>{product.ProductName}</title>
        <meta name={"og:title"} content={product.ProductName} />
      </Head>
      <Container>
        <div className={s.product}>
          {width !== 'mobile' && <Text no_td
                 className={s.product__back}
                 type={'link'}
                 href={(() => {
                   if (typeof window !== 'undefined') {
                     return Storage.get('prevPage')
                   }
                 })()}
                 colored>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад</Text>}
          <div className={s.product__content}>
            <div className={s.product__content__images}>
              <div className={s.product__content__images__image}>
                {image && <img src={image} alt={product.ProductName}/>}
              </div>
              <div className={s.product__content__images__list}>
                <img className={classNames({[s.product__content__images__list_active]: image === product.image})} onClick={() => setImage(product.image)} src={product.image} alt={product.ProductName} />
                {images && images.length > 0 && images.map((el) => {
                  return <img onClick={() => setImage(el.imageURL)}
                              className={classNames({[s.product__content__images__list_active]: image === el.imageURL})}
                              src={el.imageURL}
                              alt={product.ProductName} />
                })}
              </div>
            </div>
            <div className={s.product__content__info}>
              {width !== 'mobile' && <div className={s.product__content__info__header}>
                <div className={s.product__content__info__header__statuses}>
                  {/*{product.availability <= 0 && <div className={s.product__content__info__header__statuses__not}>Нет в наличии</div>}*/}
                  {product.is_hit && <div>Хит продаж</div>}
                  {product.is_new && <div>Новинка</div>}
                  {product.discount && <div>-${product.discount}%</div>}
                </div>
                <div className={s.product__content__info__header__article}>
                  <div>Артикул: {product.ProductCode}</div>
                </div>
              </div>}
              <Text type={'h1'}
                    size={'big+'}>{product.ProductName}</Text>
              <div className={s.product__content__info__price}>
                {product.RetailPrice !== null ? product.discount && <Text type={'span'}
                                           className={s.product__content__info__price__old}
                                           size={'medium'}>
                  {`${product.RetailPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text> : <Text type={'span'}
                                className={s.product__content__info__price__old}
                                size={'medium'}>
                  Цена по договорённости
                </Text>}
                <Text bold
                      colored={true}
                      size={'big+'}>
                  {`${product.RetailPrice !== null && product.discount ? product.RetailPrice-(product.RetailPrice / 100 * product.discount) : product.RetailPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text>
              </div>
              <div className={s.product__content__info__btns}>
                <Button
                        // disabled={product.availability <= 0}
                        size={width === 'desktop' ? 'bigger' : 'medium'}
                        style={'filled'}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Добавить в корзину
                </Button>
                <Button icon={true}
                        onClick={onToggleFavs}
                        size={'icon_bigger'}
                        style={isFav ? 'filled' : 'outlined'}>
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 3.00019C8.20058 0.903175 5.19377 0.255098 2.93923 2.17534C0.68468 4.09558 0.367271 7.30612 2.13778 9.5772C3.60984 11.4654 8.06479 15.4479 9.52489 16.7369C9.68824 16.8811 9.76992 16.9532 9.86519 16.9815C9.94834 17.0062 10.0393 17.0062 10.1225 16.9815C10.2178 16.9532 10.2994 16.8811 10.4628 16.7369C11.9229 15.4479 16.3778 11.4654 17.8499 9.5772C19.6204 7.30612 19.3417 4.07538 17.0484 2.17534C14.7551 0.275296 11.7994 0.903175 10 3.00019Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
              {product.ProductDescription && product.ProductDescription.length > 0 && <div className={s.product__content__info__desc}>
                <Text size={'medium'}>Описание:</Text>
                <Text className={s.product__content__info__desc__text}>{(() => {
                  return product.ProductDescription.length > 170 ? `${product.ProductDescription.slice(0, 160)}...` : product.ProductDescription
                })()} <Text onClick={() => window.scrollTo({top: 900, behavior: 'smooth'})} type={'span'}
                            colored>Подробнее</Text>
                </Text>
              </div>}
            </div>
          </div>
          <div className={s.product__info}>
            <div className={s.product__info__details}>
              <Text size={'big+'} type={'h2'}>Характеристики</Text>
              {feature.map((el) => {
                if(!el.featureValue || !el.featureName) return
                return <div>
                  <Text bold>{el.featureName}</Text>
                  <Text>{el.featureValue}{el.featureUom ? el.featureUom : ''}</Text>
                </div>
              })}
            </div>
            {product.ProductDescription && product.ProductDescription.length > 0 && <div className={s.product__info__desc}>
              <Text size={'big+'} type={'h2'}>Описание</Text>
              <Text className={s.product__info__desc__text}>
                {product.ProductDescription}
              </Text>
            </div>}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  // const request  = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  // const movies = await request.json()

  // const paths = movies.map((_: any, index: number) =>({
  //   params: {id: `${index}`},
  // }))
  return {
    paths: [
      { params: { id: '2' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const product = await fetch(`${API_BASE_URL}/product/${params?.id}`)
    .catch(() => {
      return undefined
    })

  if (!product) {
    return {
      notFound: true,
    }
  }

  const productData: IProduct = await product.json()

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

export default Product
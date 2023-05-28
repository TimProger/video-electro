import React, {useEffect, useState} from 'react';
import s from '@/styles/components/Card.module.scss'
import classNames from "classnames";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import {IProductShort} from "@/types/Product.types";
import Link from "next/link";
import {Storage} from "@/utils/storage";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {removeFavsProduct, toggleFavsProduct} from "@/store/Slices/Favs.slice";
import {useTypedSelector} from "@/hooks/useTypedSelector";
// import {removeBasketProducts} from "@/store/Slices/Basket.slice";

export interface ICardProps {
  product: IProductShort;
  className?: string;
  type?: 'short' | 'long';
  key?: number | string | null;
  favs?: boolean;
  basket?: boolean;
}

const Card: React.FC<ICardProps> = ({
                                      product,
                                      className,
                                      type = 'short',
                                      key = null,
                                      favs,
                                      basket,
                                    }) => {

  const dispatch = useAppDispatch()
  const favsState = useTypedSelector(state => state.favs)
  // const basketState = useTypedSelector(state => state.basket)
  const [isFav, setIsFav] = useState<boolean>(false)
  // const [inBasket, setInBasket] = useState<IBasketProduct | null>(null)

  useEffect(()=>{
    const includes = favsState.products.find(el => el.id === product.id)
    if(includes){
      setIsFav(true)
    }else{
      setIsFav(false)
    }
  },[favsState.products])

  // useEffect(()=>{
  //   const includes = basketState.products.find(el => el.id === product.id)
  //   if(includes){
  //     setInBasket(includes)
  //   }else{
  //     setInBasket(null)
  //   }
  // },[basketState.products])

  // const onClick = (e: React.MouseEvent) => {
  //   e.stopPropagation()
  // }

  const onRemoveFavs = (id: number) => {
    dispatch(removeFavsProduct(id))
  }

  const onToggleFavs = () => {
    dispatch(toggleFavsProduct(product))
  }

  switch (type){
    case 'long':
      return (
        <div className={classNames(s.cardLong, {[s.cardLong_catalog]: !favs && !basket}, className)} key={key}>
          <Link href={`/product/${product.id}`}
                onClick={()=>{
                  Storage.set('prevPage', `${window.location.pathname}${window.location.search}`)
                }}
                className={s.cardLong__image}>
            <img src={product.image} alt={product.ProductName}/>
          </Link>
          <div className={s.cardLong__info}>
            <Text type={'link'}
                  onClick={()=>{
                    Storage.set('prevPage', `${window.location.pathname}${window.location.search}`)
                  }}
                  href={`/product/${product.id}`}
                  no_td bold className={s.cardLong__info__name}>
              {product.ProductName}
            </Text>
            <div className={s.cardLong__info__statuses}>
              {/*{product.availability <= 0 && <div className={s.cardLong__info__statuses__not}>Нет в наличии</div>}*/}
              {product.is_hit && <div>Хит продаж</div>}
              {product.is_new && <div>Новинка</div>}
              {product.discount && <div>-${product.discount}%</div>}
            </div>
          </div>
          <div className={s.cardLong__content}>
            {!favs && !basket ? <Button icon={true}
                             onClick={onToggleFavs}
                             style={isFav ? 'filled' : 'outlined'}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M10 3.00019C8.20058 0.903175 5.19377 0.255098 2.93923 2.17534C0.68468 4.09558 0.367271 7.30612 2.13778 9.5772C3.60984 11.4654 8.06479 15.4479 9.52489 16.7369C9.68824 16.8811 9.76992 16.9532 9.86519 16.9815C9.94834 17.0062 10.0393 17.0062 10.1225 16.9815C10.2178 16.9532 10.2994 16.8811 10.4628 16.7369C11.9229 15.4479 16.3778 11.4654 17.8499 9.5772C19.6204 7.30612 19.3417 4.07538 17.0484 2.17534C14.7551 0.275296 11.7994 0.903175 10 3.00019Z"
                      stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button> : <span></span>}
            <div className={s.cardLong__content__bottom}>
              <div className={s.cardLong__content__bottom__price}>
                {product.discount && <Text type={'span'} className={s.cardLong__content__bottom__price__old} size={'small'}>
                  {`${product.discount/product.RetailPrice*100}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text>}
                <Text bold colored={true} size={'medium'}>
                  {`${product.discount ? product.RetailPrice-product.discount : product.RetailPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                </Text>
              </div>
              <div className={s.cardLong__content__bottom__btns}>
                {favs ? <Button onClick={()=>onRemoveFavs(product.id)}
                                size={'medium'}
                                style={'borderless'}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                      stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Удалить
                </Button> : ''}
                {basket ? <Button onClick={()=>{
                  // dispatch(removeBasketProducts(product.id))
                }}
                                size={'medium'}
                                style={'borderless'}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                      stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Удалить
                </Button> : ''}
                {!basket ? <Button
                      // disabled={product.availability <= 0}
                                     onClick={() => {
                                       // dispatch(addProductToBasket(product))
                                     }}
                                     size={'medium'}
                                     style={'filled'}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                      stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  В корзину
                </Button> : <Button onClick={() => {
                                      // dispatch(removeBasketProducts(product.id))
                                    }}
                                    size={'medium'}
                                    style={'outlined'}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                      stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Удалить
                </Button>}
              </div>
            </div>
          </div>
        </div>
      )
    case 'short':
      return (
        <div className={classNames(s.card, className)} key={key}>
          <Link href={`/product/${product.id}`}
                onClick={()=>{
                  Storage.set('prevPage', `${window.location.pathname}${window.location.search}`)
                }}
          >
            <div className={s.card__image}>
              <div className={s.card__image__statuses}>
                {/*{product.availability <= 0 && <div className={s.cardLong__info__statuses__not}>Нет в наличии</div>}*/}
                {product.is_hit && <div>Хит продаж</div>}
                {product.is_new && <div>Новинка</div>}
                {product.discount && <div>-${product.discount/product.RetailPrice*100}%</div>}
              </div>
              <img src={product.image} alt={product.ProductName}/>
            </div>
          </Link>
          <div className={s.card__name}>
            <Text type={'link'}
                  onClick={()=>{
                    Storage.set('prevPage', `${window.location.pathname}${window.location.search}`)
                  }}
                  href={`/product/${product.id}`} no_td bold>
              {product.ProductName}
            </Text>
          </div>
          <div className={s.card__price}>
            {product.discount && <Text type={'span'} className={s.card__price__old} size={'small'}>
              {`${product.discount}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
            </Text>}
            <Text bold colored={true} size={'medium'}>
              {`${product.discount ? product.RetailPrice-product.discount : product.RetailPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
            </Text>
          </div>
          <div className={s.card__btns}>
            <Button icon={true}
                    onClick={onToggleFavs}
                    style={isFav ? 'filled' : 'outlined'}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.00019C8.20058 0.903175 5.19377 0.255098 2.93923 2.17534C0.68468 4.09558 0.367271 7.30612 2.13778 9.5772C3.60984 11.4654 8.06479 15.4479 9.52489 16.7369C9.68824 16.8811 9.76992 16.9532 9.86519 16.9815C9.94834 17.0062 10.0393 17.0062 10.1225 16.9815C10.2178 16.9532 10.2994 16.8811 10.4628 16.7369C11.9229 15.4479 16.3778 11.4654 17.8499 9.5772C19.6204 7.30612 19.3417 4.07538 17.0484 2.17534C14.7551 0.275296 11.7994 0.903175 10 3.00019Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            {true ? <Button
              // disabled={product.availability <= 0}
                     onClick={() => {
                       // dispatch(addProductToBasket(product))
                     }}
                     size={'medium'}
                     style={'filled'}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                  stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              В корзину
            </Button> : <Button onClick={() => {
                                  // dispatch(removeBasketProducts(product.id))
                                }}
                                size={'medium'}
                                style={'outlined'}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                  stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Удалить
            </Button>}
          </div>
        </div>
      )
  }
};

export default Card;
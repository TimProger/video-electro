import { GetStaticProps } from 'next'
import React, {useEffect, useState} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Basket.module.scss'
import Text from "@/components/UI/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card";
import Button from "@/components/UI/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {
  selectBasketProduct,
  setBasketProducts,
  setBasketProductsShort,
  setTotalPrice,
} from "@/store/Slices/Basket.slice";
import {animated, useTrail} from "react-spring";
import Image from "next/image";
import recovery_one from "@/public/images/pages/recovery/1.png";
import classNames from "classnames";
import recovery_two from "@/public/images/pages/recovery/2.png";
import recovery_three from "@/public/images/pages/recovery/3.png";
import {IBasketProduct} from "@/types/Product.types";
import Checkbox from "@/components/UI/Checkbox";
import {$api} from "@/http/axios";
import { setAuthShow, setHeader } from '@/store/Slices/Profile.slice';

interface IBasketProps {
}

// const Basket = () => {
//   return <div></div>
// }

const Basket: React.FC<IBasketProps> = () => {

  const dispatch = useAppDispatch()
  const { products, totalPrice, discountedPrice } = useTypedSelector(state => state.basket)
  const [selected, setSelected] = useState<IBasketProduct[]>(products.filter((el) => el.buy_now))

  useEffect(()=>{
    setSelected(products.filter((el) => el.buy_now))
  },[products])

  const trailProducts = useTrail(products.length, {
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
  });

  const onClear = () => {
    dispatch(setBasketProductsShort([]))
  }

  const [page, setPage] = useState<number>(0)

  const changeBuyNow = (product: IBasketProduct) => {
    const includes = selected.find((el) => el.id === product.id)
    if(includes){
      const index = selected.indexOf(includes)
      selected.splice(index, 1)
      $api.patch(`/basket/${product.id}/`, {
        buy_now: false
      })
        .then(() => {
          dispatch(selectBasketProduct({id: product.id, buy_now: false}))
        })
    }else{
      selected.push(product)
      $api.patch(`/basket/${product.id}/`, {
        buy_now: true
      })
        .then(() => {
          dispatch(selectBasketProduct({id: product.id, buy_now: true}))
        })
    }
    setSelected(prev => [...prev])
  }

  // const selectAll = () => {
  //   if(selected.length !== products.length){
  //     dispatch(selectAllBasketProducts({products, buy_now: true}))
  //   }else{
  //     dispatch(selectAllBasketProducts({products, buy_now: false}))
  //   }
  // }

  const profile = useTypedSelector(state => state.profile)

  useEffect(() => {
    window.scrollTo({top: 200, behavior: 'smooth'})
  },[page])

  const buyHandler = () => {
    $api.post('/order/buy/', {
      address: 'Moscow',
      delivery: 'cdek'
    })
      .then((res) => {
        console.log(res)
        $api.get('/basket/')
          .then((res) => {
            if(res.data.detail === 'Нет товаров'){
              dispatch(setBasketProducts([]))
              dispatch(setTotalPrice(0))
            }else{
              dispatch(setBasketProducts(res.data.service.map((el: any) => {
                return {
                  id: el.id,
                  id_user: el.id_user,
                  product_id: el.product_id,
                  ProductName: el.product__ProductName,
                  discount: el.product__discount,
                  image: el.product__image,
                  RetailPrice: el.product__RetailPrice,
                  count: el.count,
                  buy_now: el.buy_now
                }
              })))
              dispatch(setTotalPrice(res.data.total_price))
            }
          })
      })
      .catch((res) => {
        console.log(res)
      })
  }

  const displayPages = () => {
    switch (page){
      case 0:
        return (
          <div className={s.basket__products}>
            <div className={s.basket__products__container}>
              <div className={s.basket__products__container__header}>
                <Text size={'bigger'} type={'h1'}>Корзина</Text>
                {products.length > 0 && <Button onClick={onClear}
                                                style={'borderless'}
                                                filled
                                                size={'medium'}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                      stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Удалить все</Button>}
              </div>
              {/*{products.length > 0 && <Checkbox colored label={'Выбрать все'} onChange={() => selectAll()}*/}
              {/*           isChecked={selected.length === products.length}/>}*/}
              <div className={s.basket__products__container__cards}>
                {trailProducts.length > 0 ? trailProducts.map((styles, index)=>{
                  return <animated.div className={s.basket__products__container__cards__animated} key={products[index].id} style={styles}>
                    <Checkbox label={''} onChange={()=>changeBuyNow(products[index])} isChecked={selected.includes(products[index])} />
                    {/* @ts-ignore */}
                    <Card basket type={'long'} product={products[index]} />
                  </animated.div>
                }) : <div className={s.basket__products__container__noCards}>
                  <Text size={'small'} type={'p'}>В корзине нет товаров</Text>
                  <Button size={'medium'}
                          onClick={() => {
                            dispatch(setHeader(!profile.headerShow))
                          }}
                  >В каталог</Button>
                </div>}
              </div>
            </div>
            <div className={s.basket__products__info}>
              <div className={s.basket__products__info__placeholder}></div>
              <div className={s.basket__products__info__container}>
                <Text type={'h2'} size={'big+'}>Ваша корзина</Text>
                <div className={s.basket__products__info__container__content}>
                  <div className={s.basket__products__info__container__content__price}>
                    <Text bold>Товары ({selected.length})</Text>
                    <Text size={'medium'} bold>{`${totalPrice.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</Text>
                  </div>
                  <div className={s.basket__products__info__container__content__price}>
                    <Text bold>Скидка</Text>
                    <Text error size={'medium'} bold>-{`${discountedPrice.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</Text>
                  </div>
                </div>
                <div className={s.basket__products__info__container__total}>
                  <div className={s.basket__products__info__container__total__price}>
                    <Text bold>Итоговая стоимость</Text>
                    <Text colored size={'medium'} bold>{`${(+totalPrice.toFixed(2)-+discountedPrice.toFixed(2)).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</Text>
                  </div>
                </div>
                <Button size={'bigger'}
                        onClick={()=>{
                          if(!profile.isAuth){
                            dispatch(setAuthShow(true))
                          }
                          if(selected.length > 0){
                            setPage(1)
                          }else{

                          }
                        }}
                        full>Оформить заказ</Button>
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className={s.basket__order}>
            <div className={s.basket__order__header}>
              <Text size={'bigger'} type={'h1'}>Оформить заказ</Text>
            </div>
            <Text className={s.basket__order__back}
                  onClick={()=>setPage(0)}
                  colored>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад в корзину</Text>
            <div className={s.basket__order__main}>
              <div className={s.basket__order__main__left}>
                <Text size={'big+'} type={'h2'}>Оплата</Text>
                <Text className={s.basket__order__main__left__text}>Мы принимаем оплату, как юр. лицо, а так же по карте. Информацию об оплате вы можете прочитать ниже.</Text>
                <div className={s.basket__order__main__left__icons}>
                  <svg width="84" height="24" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80.828 14.9773C82.0714 14.2291 83.0367 12.3415 83.3639 11.4913L60.0496 11.4062V24.0751H67.5756V17.103H75.5925C77.474 17.103 79.2737 15.9126 80.828 14.9773Z" fill="#5B74F9"/>
                    <path d="M41.0035 0.145508H33.2306L33.2046 24.0756H40.2431C41.595 24.0756 42.8905 22.7836 43.3692 22.1376L48.9455 9.91976H49.4524V24.0756H57.2254L57.1409 0.145508H49.8749C48.3203 0.145508 47.1994 1.77455 46.8333 2.58907L41.426 14.3013H40.8346L41.0035 0.145508Z" fill="#5B74F9"/>
                    <path d="M0 24.0756H7.72071L7.63679 10.0883H8.14031L12.3035 24.0756H17.959L22.1551 9.91976H22.6586L22.5056 24.0756H30.3793V0.145508H22.1551C19.7382 0.145508 18.5185 3.1789 18.2108 4.69559L15.2736 14.3013H14.9379C14.3784 12.4195 13.0413 7.8638 12.1685 4.69559C11.2957 1.52739 9.39912 0.342116 8.55991 0.145508H0V24.0756Z" fill="#5B74F9"/>
                    <path d="M76.553 0.145508H59.3433C59.3433 1.21298 59.7651 3.10158 61.621 5.97553C63.1058 8.2747 67.1889 9.61587 69.0448 9.99907H84.0611V9.67062C84.0611 8.2747 84.3142 6.13976 82.2052 3.2658C80.5179 0.966638 77.734 0.227621 76.553 0.145508Z" fill="#5B74F9"/>
                  </svg>
                  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_102_7162)">
                      <path d="M5.45392 23.8807V22.2922C5.45392 21.6832 5.09368 21.2861 4.47622 21.2861C4.16755 21.2861 3.8331 21.392 3.60153 21.7362C3.42153 21.445 3.16431 21.2861 2.77841 21.2861C2.52106 21.2861 2.26396 21.3655 2.05806 21.6567V21.3391H1.51782V23.8807H2.05806V22.4775C2.05806 22.0275 2.28962 21.8156 2.64985 21.8156C3.00985 21.8156 3.19009 22.0539 3.19009 22.4775V23.8807H3.73032V22.4775C3.73032 22.0275 3.98743 21.8156 4.32188 21.8156C4.68212 21.8156 4.86212 22.0539 4.86212 22.4775V23.8807H5.45392ZM13.4544 21.3391H12.5799V20.5713H12.0396V21.3391H11.5508V21.842H12.0395V23.007C12.0395 23.5895 12.2711 23.9336 12.8885 23.9336C13.1201 23.9336 13.3772 23.8543 13.5574 23.7484L13.403 23.2717C13.2486 23.3776 13.0686 23.4042 12.94 23.4042C12.6827 23.4042 12.5799 23.2453 12.5799 22.9805V21.842H13.4544V21.3391ZM18.0336 21.286C17.725 21.286 17.5192 21.445 17.3905 21.6567V21.3391H16.8503V23.8807H17.3905V22.451C17.3905 22.0275 17.5705 21.7892 17.905 21.7892C18.0079 21.7892 18.1365 21.8157 18.2394 21.8421L18.3938 21.3127C18.2909 21.2861 18.1365 21.2861 18.0336 21.2861V21.286ZM11.1135 21.5509C10.8561 21.3655 10.496 21.2861 10.1101 21.2861C9.49278 21.2861 9.08122 21.6038 9.08122 22.1068C9.08122 22.5305 9.38989 22.7687 9.93013 22.8482L10.1874 22.8747C10.4704 22.9275 10.6247 23.007 10.6247 23.1394C10.6247 23.3247 10.4189 23.4571 10.0587 23.4571C9.69856 23.4571 9.41556 23.3247 9.23544 23.1924L8.97821 23.6159C9.26122 23.8277 9.64712 23.9336 10.0329 23.9336C10.7533 23.9336 11.1649 23.5895 11.1649 23.1129C11.1649 22.6628 10.8305 22.4245 10.3159 22.3451L10.0587 22.3186C9.82712 22.2921 9.64712 22.2393 9.64712 22.0804C9.64712 21.8951 9.82712 21.7892 10.1101 21.7892C10.4189 21.7892 10.7276 21.9215 10.8819 22.0009L11.1135 21.5509ZM25.4684 21.2861C25.1596 21.2861 24.9538 21.445 24.8251 21.6567V21.3391H24.2849V23.8807H24.8251V22.451C24.8251 22.0275 25.0052 21.7892 25.3396 21.7892C25.4426 21.7892 25.5713 21.8157 25.6741 21.8421L25.8285 21.3127C25.7256 21.2861 25.5713 21.2861 25.4684 21.2861ZM18.5739 22.6099C18.5739 23.3776 19.0883 23.9336 19.8859 23.9336C20.246 23.9336 20.5033 23.8543 20.7605 23.6425L20.5033 23.1924C20.2975 23.3512 20.0917 23.4306 19.8601 23.4306C19.4228 23.4306 19.1141 23.1129 19.1141 22.6099C19.1141 22.1334 19.4228 21.8156 19.8601 21.7892C20.0917 21.7892 20.2975 21.8685 20.5033 22.0275L20.7605 21.5774C20.5033 21.3655 20.246 21.2861 19.8859 21.2861C19.0883 21.2861 18.5739 21.8421 18.5739 22.6099ZM23.5647 22.6099V21.3391H23.0244V21.6567C22.8443 21.4186 22.5871 21.2861 22.2526 21.2861C21.5581 21.2861 21.0178 21.8421 21.0178 22.6099C21.0178 23.3776 21.5581 23.9336 22.2526 23.9336C22.6127 23.9336 22.8701 23.8013 23.0244 23.563V23.8807H23.5647V22.6099ZM21.5837 22.6099C21.5837 22.1598 21.8667 21.7892 22.3297 21.7892C22.7671 21.7892 23.0759 22.1334 23.0759 22.6099C23.0759 23.06 22.7671 23.4306 22.3297 23.4306C21.8667 23.404 21.5837 23.06 21.5837 22.6099ZM15.1267 21.2861C14.4063 21.2861 13.8918 21.8156 13.8918 22.6099C13.8918 23.4042 14.4062 23.9336 15.1524 23.9336C15.5125 23.9336 15.8727 23.8277 16.1557 23.5895L15.8984 23.1924C15.6926 23.3512 15.4354 23.4571 15.1781 23.4571C14.8437 23.4571 14.5092 23.2983 14.432 22.8481H16.2586V22.6364C16.2844 21.8156 15.8213 21.2861 15.1266 21.2861H15.1267ZM15.1267 21.7626C15.461 21.7626 15.6927 21.9745 15.744 22.3717H14.4578C14.5092 22.0275 14.7408 21.7626 15.1267 21.7626ZM28.5297 22.6099V20.333H27.9894V21.6567C27.8093 21.4186 27.5521 21.2861 27.2176 21.2861C26.5231 21.2861 25.9828 21.8421 25.9828 22.6099C25.9828 23.3776 26.5231 23.9336 27.2176 23.9336C27.5779 23.9336 27.8351 23.8013 27.9894 23.563V23.8807H28.5297V22.6099ZM26.5488 22.6099C26.5488 22.1598 26.8317 21.7892 27.2949 21.7892C27.7322 21.7892 28.0409 22.1334 28.0409 22.6099C28.0409 23.06 27.7322 23.4306 27.2949 23.4306C26.8317 23.404 26.5488 23.06 26.5488 22.6099ZM8.48942 22.6099V21.3391H7.94919V21.6567C7.76907 21.4186 7.51185 21.2861 7.17739 21.2861C6.48282 21.2861 5.94259 21.8421 5.94259 22.6099C5.94259 23.3776 6.48282 23.9336 7.17739 23.9336C7.53763 23.9336 7.79485 23.8013 7.94919 23.563V23.8807H8.48942V22.6099ZM6.48282 22.6099C6.48282 22.1598 6.76583 21.7892 7.22884 21.7892C7.66618 21.7892 7.97497 22.1334 7.97497 22.6099C7.97497 23.06 7.66618 23.4306 7.22884 23.4306C6.76583 23.404 6.48282 23.06 6.48282 22.6099Z" fill="black"/>
                      <path d="M10.9333 2.03809H19.0369V17.0231H10.9333V2.03809Z" fill="#FF5F00"/>
                      <path d="M11.4479 9.53114C11.4479 6.48651 12.8371 3.78597 14.9722 2.03855C13.4031 0.767759 11.4223 0 9.26133 0C4.14176 0 0 4.26247 0 9.53114C0 14.7997 4.14176 19.0623 9.26121 19.0623C11.4221 19.0623 13.403 18.2945 14.9722 17.0236C12.8371 15.3027 11.4479 12.5758 11.4479 9.53114Z" fill="#EB001B"/>
                      <path d="M29.9703 9.53114C29.9703 14.7997 25.8285 19.0623 20.7091 19.0623C18.5481 19.0623 16.5673 18.2945 14.998 17.0236C17.159 15.2763 18.5225 12.5758 18.5225 9.53114C18.5225 6.48651 17.1332 3.78597 14.998 2.03855C16.5672 0.767759 18.5481 0 20.7091 0C25.8285 0 29.9704 4.28901 29.9704 9.53114H29.9703Z" fill="#F79E1B"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_102_7162">
                        <rect width="30" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.52 3.46916C45.0305 2.93073 43.4578 2.65924 41.874 2.66716C36.76 2.66716 33.146 5.25116 33.124 8.94916C33.082 11.6672 35.686 13.1992 37.654 14.1152C39.676 15.0532 40.352 15.6372 40.342 16.4692C40.332 17.7512 38.726 18.3232 37.248 18.3232C35.194 18.3232 34.08 18.0432 32.362 17.3232L31.724 17.0212L30.996 21.2932C32.246 21.8032 34.486 22.2512 36.798 22.2932C42.246 22.2932 45.798 19.7312 45.838 15.7812C45.88 13.6152 44.486 11.9712 41.516 10.6152C39.724 9.74116 38.602 9.14516 38.602 8.24916C38.602 7.45716 39.56 6.62516 41.56 6.62516C42.8873 6.59191 44.2068 6.83648 45.434 7.34316L45.924 7.56116L46.642 3.44716L46.52 3.46916ZM59.814 3.02116H55.814C54.564 3.02116 53.636 3.35516 53.084 4.59516L45.396 22.0212H50.834L51.93 19.1672L58.564 19.1772C58.73 19.8432 59.198 22.0192 59.198 22.0192H64L59.814 3.02116ZM25.76 2.86516H30.938L27.698 21.8732H22.52L25.76 2.85516V2.86516ZM12.594 13.3332L13.124 15.9792L18.196 3.02116H23.686L15.518 21.9892H10.052L5.572 5.92716C5.53768 5.79374 5.47653 5.66871 5.39228 5.55971C5.30803 5.4507 5.20246 5.36001 5.082 5.29316C3.47277 4.45618 1.76566 3.82265 0 3.40716L0.062 3.00916H8.416C9.542 3.05116 10.458 3.40716 10.77 4.61516L12.594 13.3432V13.3332ZM53.406 15.2812L55.48 9.95916C55.448 10.0092 55.906 8.86516 56.166 8.14516L56.52 9.77916L57.72 15.2692H53.406V15.2812Z" fill="#5B74F9"/>
                  </svg>
                  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_102_7155)">
                      <path d="M30 19.081C30 21.7364 27.9095 23.8987 25.3423 23.8987H0V4.8177C0 2.1623 2.09051 0 4.65773 0H30V19.081Z" fill="white"/>
                      <path d="M21.748 14.1871H23.6734C23.7285 14.1871 23.8568 14.1682 23.9119 14.1682C24.2787 14.0923 24.5904 13.7508 24.5904 13.2766C24.5904 12.8215 24.2787 12.48 23.9119 12.3852C23.8568 12.3662 23.7469 12.3662 23.6736 12.3662H21.7482V14.1871H21.748Z" fill="url(#paint0_linear_102_7155)"/>
                      <path d="M23.4534 1.6123C21.6197 1.6123 20.1159 3.14879 20.1159 5.06443V8.64927H24.8287C24.9388 8.64927 25.0671 8.64927 25.1587 8.66818C26.2223 8.72515 27.0109 9.29412 27.0109 10.2803C27.0109 11.058 26.4791 11.7219 25.4889 11.8547V11.8925C26.5707 11.9684 27.396 12.5944 27.396 13.5616C27.396 14.6049 26.4791 15.2877 25.2688 15.2877H20.0977V22.3056H24.9937C26.8275 22.3056 28.3312 20.7693 28.3312 18.8535V1.6123H23.4534Z" fill="url(#paint1_linear_102_7155)"/>
                      <path d="M24.352 10.5075C24.352 10.0522 24.0402 9.74873 23.6734 9.69176C23.6369 9.69176 23.5451 9.67285 23.4902 9.67285H21.748V11.3419H23.4902C23.5452 11.3419 23.6552 11.3419 23.6736 11.323C24.0404 11.2661 24.3521 10.9627 24.3521 10.5074L24.352 10.5075Z" fill="url(#paint2_linear_102_7155)"/>
                      <path d="M5.00617 1.6123C3.17242 1.6123 1.66867 3.14879 1.66867 5.06443V13.5808C2.60395 14.0549 3.57578 14.3584 4.54773 14.3584C5.70297 14.3584 6.32641 13.6376 6.32641 12.6513V8.63024H9.18707V12.6323C9.18707 14.1876 8.25191 15.4585 5.07953 15.4585C3.15414 15.4585 1.65039 15.0221 1.65039 15.0221V22.2866H6.54648C8.38023 22.2866 9.88398 20.7502 9.88398 18.8345V1.61255H5.00605L5.00617 1.6123Z" fill="url(#paint3_linear_102_7155)"/>
                      <path d="M14.2298 1.6123C12.3961 1.6123 10.8923 3.14879 10.8923 5.06443V9.57861C11.736 8.83885 13.2029 8.36467 15.5685 8.47849C16.8337 8.53546 18.1907 8.89582 18.1907 8.89582V10.3563C17.5121 9.99594 16.7054 9.6734 15.6601 9.59752C13.863 9.46479 12.7812 10.3752 12.7812 11.9684C12.7812 13.5807 13.863 14.4911 15.6601 14.3393C16.7054 14.2635 17.5123 13.9221 18.1907 13.5807V15.0412C18.1907 15.0412 16.852 15.4015 15.5685 15.4585C13.2029 15.5722 11.736 15.098 10.8925 14.3584V22.3245H15.7885C17.6223 22.3245 19.1259 20.7882 19.1259 18.8724V1.61255H14.2298V1.6123Z" fill="url(#paint4_linear_102_7155)"/>
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_102_7155" x1="20.1129" y1="13.2789" x2="28.3535" y2="13.2789" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#007940"/>
                        <stop offset="0.2285" stop-color="#00873F"/>
                        <stop offset="0.7433" stop-color="#40A737"/>
                        <stop offset="1" stop-color="#5CB531"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_102_7155" x1="20.1127" y1="11.9507" x2="28.3537" y2="11.9507" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#007940"/>
                        <stop offset="0.2285" stop-color="#00873F"/>
                        <stop offset="0.7433" stop-color="#40A737"/>
                        <stop offset="1" stop-color="#5CB531"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear_102_7155" x1="20.1127" y1="10.505" x2="28.3537" y2="10.505" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#007940"/>
                        <stop offset="0.2285" stop-color="#00873F"/>
                        <stop offset="0.7433" stop-color="#40A737"/>
                        <stop offset="1" stop-color="#5CB531"/>
                      </linearGradient>
                      <linearGradient id="paint3_linear_102_7155" x1="1.66488" y1="11.9507" x2="10.0328" y2="11.9507" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#1F286F"/>
                        <stop offset="0.4751" stop-color="#004E94"/>
                        <stop offset="0.8261" stop-color="#0066B1"/>
                        <stop offset="1" stop-color="#006FBC"/>
                      </linearGradient>
                      <linearGradient id="paint4_linear_102_7155" x1="10.8449" y1="11.9506" x2="18.9722" y2="11.9506" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#6C2C2F"/>
                        <stop offset="0.1735" stop-color="#882730"/>
                        <stop offset="0.5731" stop-color="#BE1833"/>
                        <stop offset="0.8585" stop-color="#DC0436"/>
                        <stop offset="1" stop-color="#E60039"/>
                      </linearGradient>
                      <clipPath id="clip0_102_7155">
                        <rect width="30" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={s.basket__order__main__left__price}>
                  <Text bold>К оплате</Text>
                  <Text colored bold size={'medium'}>{`${+totalPrice.toFixed(2)-+discountedPrice.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</Text>
                </div>
                <Button onClick={() => buyHandler()} size={'bigger'} full>Оплатить</Button>
              </div>
              <div className={s.basket__order__main__right}>
                <Text size={'big+'} type={'h2'}>Этапы сотрудничества</Text>
                <div className={s.basket__order__main__right__numbers}>
                  <div className={s.basket__order__main__right__numbers__container}>
                    <Image unoptimized width={33} height={77} src={recovery_one.src} alt=""/>
                    <Text>Оплатите ваш заказ, нажав на кнопку слева и проверьте статус в личном кабинете.</Text>
                  </div>
                  <div className={classNames(s.basket__order__main__right__numbers__container)}>
                    <Image unoptimized width={33} height={77} src={recovery_two.src} alt=""/>
                    <Text>С вами свяжеться наш менеджер и заключит с вами договор.</Text>
                  </div>
                  <div className={s.basket__order__main__right__numbers__container}>
                    <Image unoptimized width={33} height={77} src={recovery_three.src} alt=""/>
                    <Text>По согласованному времени, вы получите товары. Не забудьте оставить отзывы на товары. Спасибо, что выбрали нас!</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.basket__order__info}>
              <div className={s.basket__order__info__left}>
                <Text type='h3' size='medium' bold>Проведение оплаты:</Text>
                <Text>Получив доступ в Интернет-магазин, Покупатель осуществляет выбор товаров/услуг и оформляет заказ на покупку товаров/предоставление услуг (далее – заказ). После успешного оформления заказа покупатель выбирает способ оплаты заказа при помощи карты и переадресуется из Интернет-магазина в систему Интернет-платежей Модульбанка(pay.modulbank.ru) для осуществления ввода реквизитов карты. При этом, из Интернет-магазина в систему Интернет-платежей Банка передается информация о заказе, определяемая «Протоколом». Каждому оформляемому через Интернет-магазин заказу присваивается уникальный номер (код), являющийся идентификатором заказа (далее – номер заказа). Порядок его формирования определяется «Протоколом». При этом:</Text>
                <ul>
                  <li>
                    <Text>при положительном результате авторизации операции (получении от эмитента карты кода авторизации) Покупатель получает извещение об успешной оплате заказа;</Text>
                  </li>
                  <li>
                    <Text>при отрицательном результате авторизации операции (поступлении от эмитента карты отказа в проведении авторизации операции) Покупатель получает извещение о невозможности оплаты заказа с использованием данной карты.</Text>
                  </li>
                </ul>
                <Text>Информация о результатах авторизации также передается из Системы Интернет-платежей Банка в Интернет магазин Клиента.</Text>
              </div>
              <div className={s.basket__order__info__right}>
                <div>
                  <Text type='h3' size='medium' bold>Информация о мерах по обеспечению безопасности Операций с использованием Карт:</Text>
                  <Text>Перечень реквизитов карты, вводимых Покупателем в системе Интернет-платежей Банка при проведении платежей через Интернет, устанавливается Банком в соответствии с Правилами Платежных систем. После успешного ввода Покупателем в Системе Интернет-платежей Банка реквизитов карты, необходимых для осуществления платежа через Интернет, Банк обеспечивает проведение авторизации операции и предоставляет информацию о ее результатах. Вводимая покупателем персональная информация на сайте pay.modulbank.ru хранится исключительно в банковской системе. Сайт банка поддерживает 128-битное SSL-шифрование для большей безопасности. Любая информация, переданная на платёжную страницу банка, в безопасности и защищена специальными средствами.</Text>
                </div>
                <div>
                  <Text type='h3' size='medium' bold>Проведение возврата:</Text>
                  <Text>Возврат денежных средств Покупателю при возврате товаров/отказе от услуг обеспечивается Банком (в соответствии с Правилами Платежных систем). Возврат производится эмитенту карты, безналичным образом, по реквизитам карты, с использованием которой проводилась исходная операция. Вышеуказанные действия производятся Банком на основании информации об операциях возврата товаров/отказа от услуг, имеющейся в Информационных системах Банка и ПЦ. Порядок перечисления эмитентом карты денежных средств держателю карты определяется внутренними правилами эмитента и/или договором между эмитентом и держателем карты. В случае возникновения ошибки при оплате покупатель может обратиться в техническую поддержку Модульбанка по телефону 8 800 444 0550 или на почту int.acquiring@modulbank.ru.</Text>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <div>daw</div>
    }
  }

  return (
    <Layout>
      <Head>
        <title>Корзина | Video-Electro</title>
        <meta name={"og:title"} content={"Корзина | Video-Electro"} />
        <meta property="description" content={'Список ваших товаров, добавленных в корзину.'} />
        <meta property="og:description" content={'Список ваших товаров, добавленных в корзину.'} />
        <meta property="og:url" content={'https://video-electro.ru/basket'} />
      </Head>
      <Container>
        <div className={s.basket}>
          {displayPages()}
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
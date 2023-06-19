import React, {FC, useEffect} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "@/store";
import '@/styles/_globals.scss'
import ErrorBoundary from "@/components/ErrorBoundary";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setUser, setWidth} from "@/store/Slices/Profile.slice";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {Storage} from "@/utils/storage";
import {$api} from "@/http/axios";
import {IUser} from "@/types/Profile.types";
import {AxiosResponse} from "axios";
import {useRouter} from "next/router";
import {setBasketProducts, setTotalPrice} from "@/store/Slices/Basket.slice";

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {

  const dispatch = useAppDispatch()

  const resize = () => {
    if(window){
      if(window.innerWidth > 1150){
        dispatch(setWidth('desktop'))
      }else if(window.innerWidth <= 1150 && window.innerWidth > 820) {
        dispatch(setWidth('tablet'))
      }else if(window.innerWidth <= 820) {
        dispatch(setWidth('mobile'))
      }else{
        dispatch(setWidth('desktop'))
      }
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', resize)
    if(window){
      if(window.innerWidth > 1150){
        dispatch(setWidth('desktop'))
      }else if(window.innerWidth <= 1150 && window.innerWidth > 820) {
        setWidth('tablet')
      }else if(window.innerWidth <= 820) {
        dispatch(setWidth('mobile'))
      }else{
        dispatch(setWidth('desktop'))
      }
    }

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const profile = useTypedSelector(state => state.profile)
  const {push} = useRouter()

  useEffect(()=>{
    if(!profile.isAuth){
      if(Storage.get('accessToken')){
        $api.get(`/profile/`)
          .then((res: AxiosResponse<IUser>) => {
            dispatch(setUser(res.data))
          })
          .catch(() => {
            push('/')
          })
      }
    }
  },[])

  const basket = useTypedSelector(state => state.basket)

  useEffect(() => {
    if(profile.isAuth){
      $api.get('/basket/')
        .then((res) => {
          dispatch(setBasketProducts(res.data.data.map((el: any) => {
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
        })
    }
  },[profile])

  useEffect(() => {
    if(profile.isAuth){
      $api.get('/basket/')
        .then((res) => {
          dispatch(setTotalPrice(res.data.total_price))
        })
    }
  }, [basket.products])

  return <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
};

export default wrapper.withRedux(WrappedApp);
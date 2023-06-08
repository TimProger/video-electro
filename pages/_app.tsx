import React, {FC, useEffect} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "@/store";
import '@/styles/_globals.scss'
import ErrorBoundary from "@/components/ErrorBoundary";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setWidth} from "@/store/Slices/Profile.slice";

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

  return <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
};

export default wrapper.withRedux(WrappedApp);
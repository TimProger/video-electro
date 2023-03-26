import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "@/store";
import '@/styles/_globals.scss'
import ErrorBoundary from "@/components/ErrorBoundary";

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {

  return <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
};

export default wrapper.withRedux(WrappedApp);
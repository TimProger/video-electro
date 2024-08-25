// @ts-nocheck
import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {

  
  return (
    <Html>
      <Head>
        <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
        <meta httpEquiv={'Content-Type'} content={"text/html; charset=utf-8"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
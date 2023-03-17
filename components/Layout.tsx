import React from 'react';
import Header from "./Header";
import Head from "next/head";
import s from '../styles/components/Layout.module.scss'

interface ILayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: React.FC<ILayoutProps>
  = ({
       children,
       title,
       keywords
     }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords || "Video-Electro Video Electro"} />
      </Head>
      <div className={s.container}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
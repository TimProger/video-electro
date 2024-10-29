import React from 'react';
import Header from "../Header/Header";
import Head from "next/head";
import s from './Layout.module.scss'
import Footer from "@/components/Footer/Footer";
import icon_16 from "../../../public/images/icons/favicon-16x16.png"
import icon_32 from "../../../public/images/icons/favicon-32x32.png"

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
        <link rel="icon" type="image/png" sizes="16x16" href={icon_16.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={icon_32.src} />
      </Head>
      <div className={s.container}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
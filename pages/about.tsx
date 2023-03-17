import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/Text";
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Head from "next/head";
import s from '@/styles/pages/Main.module.scss'

interface IAboutProps {
}

const About: React.FC<IAboutProps> = () => {

  return (
    <Layout>
      <Head>
        <title>О нас</title>
      </Head>
      <div className={s.about}>
        <Container>
          <Text>О нас</Text>
        </Container>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default About
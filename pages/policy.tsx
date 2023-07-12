import { GetStaticProps } from 'next'
import React from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Policy.module.scss'
import { API_BASE_URL } from '@/http/axios';

interface IPolicyProps {
  policy: {
    name: string;
    text: string;
  }[]
}

const Policy: React.FC<IPolicyProps> = ({policy}) => {
  
  return (
    <Layout>
      <Head>
        <title>Политика конфиденциальности | Video-Electro</title>
        <meta name={"og:title"} content={"Политика конфиденциальности | Video-Electro"} />
        <meta property="description" content={'Политика конфиденциальности компании.'} />
        <meta property="og:description" content={'Политика конфиденциальности компании.'} />
        <meta property="og:url" content={'https://video-electro.ru/policy'} />
      </Head>
        <Container>
          <div className={s.policy}>
            <Text type={'h1'} size={'bigger'}>Политика конфиденциальности</Text>
              <div className={s.policy__content}>
                {policy.map((el, index) => {
                  return <div key={index} className={s.policy__content__block}>
                    <Text type={'h2'} size={'big+'}>{index+1}. {el.name}</Text>
                    <Text type={'p'} size={'small'}>{el.text}</Text>
                  </div>
                })}
            </div>
          </div>
        </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const policyData: {
    name: string;
    text: string;
  }[] = await fetch(`${API_BASE_URL}/Politics`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return []
    })

  return {
    props: {
      policy: policyData
    },
    revalidate: 10,
  }
}

export default Policy
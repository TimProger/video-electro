import { GetStaticProps } from 'next'
import React, {useState} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Catalog.module.scss'
import Text from "@/components/UI/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card";
import Button from "@/components/UI/Button";
import Select from "@/components/UI/Select";

interface ICatalogProps {
}

const Catalog: React.FC<ICatalogProps> = () => {

  const { products } = useTypedSelector(state => state.product)

  const [values, _setValues] = useState<string[]>(['yo','yo1','yo2','yo3','yo4'])
  const [value, setValue] = useState<string>(values[0])

  const onSelectClick = (value: string) => {
    setValue(value)
  }

  return (
    <Layout>
      <Head>
        <title>Главная</title>
      </Head>
      <Container>
        <div className={s.catalog}>
          <div className={s.catalog__catalog}>
            <div className={s.catalog__catalog__header}>
              <Text size={'bigger'} type={'h2'}>Кабели и провода силовые на 2
                строчки максимум а дальше...</Text>
              <Button size={'bigger'}>Фильтры</Button>
            </div>
            <div className={s.catalog__catalog__settings}>
              <div className={s.catalog__catalog__settings__selects}>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>Сортировать по</Text>
                  <Select value={value} values={values} onClick={onSelectClick} />
                </div>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>Кол-во товаров на странице</Text>
                  <Select value={value} values={values} onClick={onSelectClick} />
                </div>
              </div>
            </div>
            <div className={s.catalog__catalog__cards}>
              {products.map((el)=>{
                return <Card product={el} />
              })}
            </div>
          </div>
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

export default Catalog
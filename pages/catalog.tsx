import { GetStaticProps } from 'next'
import React, {useEffect, useState} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Catalog.module.scss'
import Text from "@/components/UI/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card";
import Button from "@/components/UI/Button";
import Select from "@/components/UI/Select";
import {Storage} from "@/utils/storage";
import Modal from "@/components/UI/Modal";
import Checkbox from "@/components/UI/Checkbox";
import {animated, useTrail} from "react-spring";
import classNames from "classnames";

interface ICatalogProps {
}

const Catalog: React.FC<ICatalogProps> = () => {

  const { products } = useTypedSelector(state => state.product)

  const trailProducts = useTrail(products.length, {
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' }
  });

  const [sortTypes, _setSortTypes] = useState<string[]>(['убыванию цены','возрастанию цены','популярности'])
  const [sortType, setSortType] = useState<string>(sortTypes[0])

  const onSortChange = (value: string) => {
    setSortType(value)
  }

  const [counts, _setCounts] = useState<string[]>(['20','32','48','60','Не ограничено'])
  const [count, setCount] = useState<string>(counts[0])

  const onCountChange = (value: string) => {
    setCount(value)
  }

  const [viewStyle, setViewStyle] = useState<number>(0)

  const onViewStyleChange = (val: number) => {
    setViewStyle(val)
    Storage.set('catalog_view', val)
  }

  useEffect(()=>{
    const storageView = Storage.get('catalog_view')
    if(storageView){
      setViewStyle(storageView)
    }
  }, [])

  const [isFilters, setIsFilters] = useState<boolean>(false)

  return (
    <Layout>
      <Head>
        <title>Каталог</title>
        <meta name={"og:title"} content={"Каталог"} />
      </Head>
      <Container>
        <Modal showModal={isFilters} closeHandler={()=>setIsFilters(false)}>
          <div className={s.filters}>
            <div className={s.filters__header}>
              <Text size={'bigger'} bold>Фильтры</Text>
              <Button
                size={'medium'}
                style={'borderless'}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Сбросить
              </Button>
            </div>
            <div className={s.filters__content}>
              <Text>Подкатегории</Text>
              <Checkbox colored label={'Выбрать все'} />
              <Checkbox label={'Провода'} />
              <Checkbox label={'Розетки'} />
              <Checkbox label={'Подкатегория 3'} />
              <Checkbox label={'Провода'} />
              <Checkbox label={'Розетки'} />
              <Checkbox label={'Подкатегория 3'} />
            </div>
          </div>
        </Modal>
        <div className={s.catalog}>
          <div className={s.catalog__catalog}>
            <div className={s.catalog__catalog__header}>
              <Text size={'bigger'} type={'h2'}>Кабели и провода силовые на 2
                строчки максимум а дальше...</Text>
              <Button onClick={()=>setIsFilters(true)}
                      size={'bigger'}>Фильтры</Button>
            </div>
            <div className={s.catalog__catalog__settings}>
              <div className={s.catalog__catalog__settings__selects}>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>Сортировать по</Text>
                  <Select sort value={sortType} values={sortTypes} onClick={onSortChange} />
                </div>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>Кол-во товаров на странице</Text>
                  <Select value={count} values={counts} onClick={onCountChange} />
                </div>
              </div>
              <div className={s.catalog__catalog__settings__btns}>
                <Text>Вид каталога</Text>
                <div className={s.catalog__catalog__settings__btns__container}>
                  <Button icon
                          onClick={()=>onViewStyleChange(0)}
                          style={viewStyle === 0 ? 'filled' : 'outlined'}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 2.6C11 2.03995 11 1.75992 11.109 1.54601C11.2049 1.35785 11.3578 1.20487 11.546 1.10899C11.7599 1 12.0399 1 12.6 1H15.4C15.9601 1 16.2401 1 16.454 1.10899C16.6422 1.20487 16.7951 1.35785 16.891 1.54601C17 1.75992 17 2.03995 17 2.6V5.4C17 5.96005 17 6.24008 16.891 6.45399C16.7951 6.64215 16.6422 6.79513 16.454 6.89101C16.2401 7 15.9601 7 15.4 7H12.6C12.0399 7 11.7599 7 11.546 6.89101C11.3578 6.79513 11.2049 6.64215 11.109 6.45399C11 6.24008 11 5.96005 11 5.4V2.6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1H5.4C5.96005 1 6.24008 1 6.45399 1.10899C6.64215 1.20487 6.79513 1.35785 6.89101 1.54601C7 1.75992 7 2.03995 7 2.6V5.4C7 5.96005 7 6.24008 6.89101 6.45399C6.79513 6.64215 6.64215 6.79513 6.45399 6.89101C6.24008 7 5.96005 7 5.4 7H2.6C2.03995 7 1.75992 7 1.54601 6.89101C1.35785 6.79513 1.20487 6.64215 1.10899 6.45399C1 6.24008 1 5.96005 1 5.4V2.6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1 12.6C1 12.0399 1 11.7599 1.10899 11.546C1.20487 11.3578 1.35785 11.2049 1.54601 11.109C1.75992 11 2.03995 11 2.6 11H5.4C5.96005 11 6.24008 11 6.45399 11.109C6.64215 11.2049 6.79513 11.3578 6.89101 11.546C7 11.7599 7 12.0399 7 12.6V15.4C7 15.9601 7 16.2401 6.89101 16.454C6.79513 16.6422 6.64215 16.7951 6.45399 16.891C6.24008 17 5.96005 17 5.4 17H2.6C2.03995 17 1.75992 17 1.54601 16.891C1.35785 16.7951 1.20487 16.6422 1.10899 16.454C1 16.2401 1 15.9601 1 15.4V12.6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 12.6C11 12.0399 11 11.7599 11.109 11.546C11.2049 11.3578 11.3578 11.2049 11.546 11.109C11.7599 11 12.0399 11 12.6 11H15.4C15.9601 11 16.2401 11 16.454 11.109C16.6422 11.2049 16.7951 11.3578 16.891 11.546C17 11.7599 17 12.0399 17 12.6V15.4C17 15.9601 17 16.2401 16.891 16.454C16.7951 16.6422 16.6422 16.7951 16.454 16.891C16.2401 17 15.9601 17 15.4 17H12.6C12.0399 17 11.7599 17 11.546 16.891C11.3578 16.7951 11.2049 16.6422 11.109 16.454C11 16.2401 11 15.9601 11 15.4V12.6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </Button>
                  <Button icon
                          onClick={()=>onViewStyleChange(1)}
                          style={viewStyle === 1 ? 'filled' : 'outlined'}>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2L19 2.00078M6 8L19 8.00078M6 14L19 14.0007M1 2.5H2V1.5H1V2.5ZM1 8.5H2V7.5H1V8.5ZM1 14.5H2V13.5H1V14.5Z" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div className={s.catalog__catalog__cards}>
              {trailProducts.map((styles, index)=>{
                return <animated.div className={classNames(s.catalog__catalog__cards__animated, {[s.catalog__catalog__cards__animated_float]: viewStyle === 1})} key={products[index].id} style={styles}>
                  <Card type={viewStyle === 0 ? 'short' : 'long'} product={products[index]} />
                </animated.div>
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
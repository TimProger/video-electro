import {GetStaticProps} from 'next'
import React from "react";
import Layout from '@/components/Layout/Layout';
import Head from "next/head";
import {IProductShort} from "@/types/Product.types";
import {API_BASE_URL} from "@/http/axios";
import Catalog from '@/pages/catalog';

interface IFilterFeatureValue {
  featureValue: string;
  count: number;
  disable?: boolean;
}

interface IFiltersFeature {
  id: number,
  featureCode: string,
  featureName: string,
  featureUom: string,
  Count: number,
  featureValue: IFilterFeatureValue[]
}

interface IPageProps {
  filtersArray: IFiltersFeature[],
  products: IProductShort[];
  count_pages: number;
  info: string[];
  levels: string[];
}

const page: React.FC<IPageProps> = ({
                                            filtersArray,
                                            products,
                                            info = [],
                                            levels = [],
                                            count_pages}) => {

  return (
    <Layout>
      <Head>
        <title>Каталог</title>
        <meta name={"og:title"} content={"Каталог"} />
        <meta property="description" content={`Купить товары из категории ${info[0]}${info[1] ? ` в разделе ${info[1]}` : ``}`} />
        <meta property="og:description" content={`Купить товары из категории ${info[0]}${info[1] ? ` в разделе ${info[1]}` : ``}`} />
        <meta property="og:url" content={`https://video-electro.ru/catalog/${levels.join('/')}`} />
      </Head>
      <Catalog filtersArray={filtersArray} products={products} info={info} levels={levels} count_pages={count_pages} />
    </Layout>
  )
}

export const getStaticPaths = async () => {

  const catalog = await fetch(`${API_BASE_URL}/product/catalog/`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return []
    })

  const level4 = catalog.map((el: any) => {
    let arr = []
    arr.push(`${el.Level4ID}`)

    if(arr[0] === 'null'){
      return
    }
    return { params: { levels: arr } }
  })

  const level3 = catalog.map((el: any) => {
    let arr = []

    arr.push(`${el.Level4ID}`)

    if(arr[0] === 'null'){
      return
    }
    el.Level3.map((elem: any) => {
      arr.push(`${elem.Level3ID}`)
    })

    if(arr.length !== 2){
      return
    }
    return { params: { levels: arr } }
  })

  const level2 = catalog.map((el: any) => {
    let arr = []

    arr.push(`${el.Level4ID}`)

    if(arr[0] === 'null'){
      return
    }
    el.Level3.map((elem: any) => {
      arr.push(`${elem.Level3ID}`)
      elem.Level2.map((element: any) => {
        arr.push(`${element.Level2ID}`)
      })
    })

    if(arr.length !== 3){
      return
    }
    return { params: { levels: arr } }
  })

  return {
    paths: [
      ...level4.filter((el: any) => !!el),
      ...level3.filter((el: any) => !!el),
      ...level2.filter((el: any) => !!el),
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  let obj: any = {
    sort: 'descending'
  }

  if(params?.levels){
    switch (params?.levels.length){
      case 3:
        obj.level2 = params?.levels[2]
        break;
      case 2:
        obj.level3 = params?.levels[1]
        break;
      case 1:
        obj.level4 = params?.levels[0]
        break;

      default:
        return {
          notFound: true,
        }
    }
  }

  const filters = await fetch(`${API_BASE_URL}/product/catalog/getFilters/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
    .then((res) => {
      return res.json()
    })
    .catch(()=>{
      return {filters: []}
    })

  const products = await fetch(`${API_BASE_URL}/product/catalog/values/20/1/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  })
    .then((res) => {
      return res.json()
    })
    .catch(()=>{
      return {
        service: [],
        count_pages: 0
      }
    })

  const catalog = await fetch(`${API_BASE_URL}/product/catalog/`)
    .then((res) => {
      return res.json()
    })
    .catch(() => {
      return []
    })

  let info: string[] = []

  catalog.map((l4: any) => {
    // @ts-ignore
    if (l4.Level4ID !== +params?.levels[0]) return;
    info.push(l4.Level4Name)
    // @ts-ignore
    if (params?.levels.length === 1) return;
    l4.Level3.map((l3: any) => {
      // @ts-ignore
      if (l3.Level3ID !== +params?.levels[1]) return;
      info.push(l3.Level3Name)
      // @ts-ignore
      if (params?.levels.length === 2) return;
      l3.Level2.map((l2: any) => {
        // @ts-ignore
        if (l2.Level2ID !== +params?.levels[2]) return;
        info.push(l2.Level2Name)
      })
    })
  })

  return {
    props: {
      filtersArray: filters.filters,
      products: products.service,
      count_pages: products.count_pages,
      info: info,
      levels: params?.levels,
    },
    revalidate: 10
  }
}

export default page;
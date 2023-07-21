import {GetStaticProps} from 'next'
import React, {useEffect, useState} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Catalog.module.scss'
import Text from "@/components/UI/Text";
import Card from "@/components/Card";
import Button from "@/components/UI/Button";
import Select from "@/components/UI/Select";
import {Storage} from "@/utils/storage";
import Modal from "@/components/UI/Modal";
import Checkbox from "@/components/UI/Checkbox";
import Dropdown from "@/components/UI/Dropdown";
import {ICatalogQuery, IFilter, IProductShort} from "@/types/Product.types";
import {$api, API_BASE_URL} from "@/http/axios";
import {useRouter} from "next/router";
import {isScrollAtBottom} from "@/utils/isScrollAtBottom";
import {useTypedSelector} from "@/hooks/useTypedSelector";

interface ISelectElement {
  name: string;
  key: string
}

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

interface ICatalogProps {
  filtersArray: IFiltersFeature[],
  products: IProductShort[];
  count_pages: number;
  info: string[];
  levels: string[];
}

const Catalog: React.FC<ICatalogProps> = ({
                                            filtersArray,
                                            products,
                                            info = [],
                                            levels = [],
                                            count_pages}) => {

  const [newProducts, setNewProducts] = useState<IProductShort[]>([...products])
  const [loading, setLoading] = useState<boolean>(false)

  const { push } = useRouter()

  const [sortTypes, _setSortTypes] = useState<ISelectElement[]>([
    {
      name: 'убыванию цены',
      key: 'descending'
    },
    {
      name: 'возрастанию цены',
      key: 'ascending'
    },
    {
      name: 'популярности',
      key: 'popularity'
    },
    {
      name: 'убыванию цены (группой)',
      key: 'descendingGroup'
    },
    {
      name: 'возрастанию цены (группой)',
      key: 'ascendingGroup'
    }
  ])

  const [sortType, setSortType] = useState<ISelectElement>(sortTypes[0])

  const [counts, _setCounts] = useState<ISelectElement[]>([
    {
      name: '20',
      key: '20'
    },
    {
      name: '32',
      key: '32'
    },
    {
      name: '48',
      key: '48'
    },
    {
      name: '60',
      key: '60'
    },
    {
      name: 'Не ограничено',
      key: 'null'
    }
  ])
  const [count, setCount] = useState<ISelectElement>(counts[0])

  const onCountChange = (value: ISelectElement) => {
    setCount(value)
    if(value.key !== 'null'){
      updateCatalog(value.key, page)
    }
  }

  const onSortChange = (value: ISelectElement) => {
    setSortType(value)
    updateCatalog(count.key === 'null' ? '20' : `${count.key}`, 1)
  }

  const [viewStyle, setViewStyle] = useState<number>(0)

  const onViewStyleChange = (val: number) => {
    if(viewStyle === val) return
    setViewStyle(val)
    Storage.set('catalog_view', val)
  }

  useEffect(()=>{
    const storageView = Storage.get('catalog_view')
    if(storageView){
      setViewStyle(storageView)
    }
  }, [])

  const [countPages, setCountPages] = useState<number>(count_pages)
  const [page, setPage] = useState<number>(1)

  const { query } = useRouter()

  let loadedPage = 1

  const loadProducts = () => {

    if(isScrollAtBottom()){
      const obj: ICatalogQuery = {
        sort: sortType.key,
      }

      if(levels.length === 3){
        obj.level2 = +levels[2]
      }else if(levels.length === 2){
        obj.level3 = +levels[1]
      }else {
        obj.level4 = +levels[0]
      }

      window.removeEventListener('scroll', loadProducts)
      if(page + loadedPage > countPages) return
      setLoading(true)
      $api.post(`/product/catalog/values/20/${page+loadedPage}/`, obj)
        .then((res) => {
          loadedPage += 1
          setNewProducts(prev => [...prev, ...res.data.service])
          setTimeout(()=>{
            window.addEventListener('scroll', loadProducts)
          }, 1500)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    if(count.key === 'null'){
      window.addEventListener('scroll', loadProducts)
    }else{
      window.removeEventListener('scroll', loadProducts)
    }

    return () => {
      window.removeEventListener('scroll', loadProducts)
    }
  },[count])

  const [usedFilters, setUsedFilters] = useState<IFilter[]>([])

  const updateCatalog = (count: string, page: number) => {

    const obj: ICatalogQuery = {
      sort: sortType.key,
    }

    if(usedFilters.length > 0) {
      obj.feature = JSON.stringify(usedFilters)
    }

    if(levels.length === 3){
      obj.level2 = +levels[2]
    }else if(levels.length === 2){
      obj.level3 = +levels[1]
    }else {
      obj.level4 = +levels[0]
    }

    setLoading(true)
    setTimeout(()=>{
      $api.post(`/product/catalog/values/${count}/${page}/`, obj)
        .then((res) => {
          setNewProducts(res.data.service)
          setCountPages(res.data.count_pages)
        })
        .catch(() => {
          setNewProducts([])
        })
        .finally(() => {
          setLoading(false)
        })
    },500)
  }

  useEffect(() => {
    if(query.page){
      setPage(+`${query.page}`)
    }

    if(query.feature) {
      usedFilters.splice(0, usedFilters.length)
      tempFilters.splice(0, tempFilters.length)
      JSON.parse(`${query.feature}`).map((el: IFilter) => {
        usedFilters.push(el)

        let obj: ICatalogQuery = {}

        if(usedFilters.length > 0){
          obj.feature = JSON.stringify(usedFilters)
        }

        if(levels.length === 3){
          obj.level2 = +levels[2]
        }else if(levels.length === 2){
          obj.level3 = +levels[1]
        }else {
          obj.level4 = +levels[0]
        }

        $api.post(`/product/catalog/getFilters/${el.feature_id}`,  obj)
          .then((res) => {
            const elem = newFiltersArray.find(elem => elem.id === el.feature_id)
            if(elem){
              const index = newFiltersArray.indexOf(elem)
              newFiltersArray[index].featureValue = res.data.service.sort((el: IFilterFeatureValue) => !el.disable)
              dropdownsOpen[index] = true
              setDropdownsOpen([...dropdownsOpen])
              setNewFiltersArray([...newFiltersArray])
            }
          })
          .finally(() => {
          })
      })
      setUsedFilters([...usedFilters])
      setTempFilters([...JSON.parse(JSON.stringify(usedFilters))])
    }else{
      usedFilters.splice(0, usedFilters.length)
      tempFilters.splice(0, tempFilters.length)
    }

    if(query.page || query.feature){
      updateCatalog(count.key, query.page ? +`${query.page}` : 1)
    }
  },[query])

  const [isFilters, setIsFilters] = useState<boolean>(false)

  const [tempFilters, setTempFilters] = useState<IFilter[]>([])

  const acceptFilters = () => {
    push(`/catalog/${levels.join('/')}?page=1${tempFilters.length > 0 ? `&feature=${JSON.stringify(tempFilters)}` : ``}`)
  }

  const [timeoutId, setTimeoutId] = useState<number>(0)
  const toggleFilter = (feature_id: number, value: string) => {
    const includes = tempFilters.find((el) => el.feature_id === feature_id)
    if(!includes){
      tempFilters.push({feature_id: feature_id, data: [value]})
    }else{
      const index = tempFilters.indexOf(includes)
      const usedValue = tempFilters[index].data.find((el) => el === value)
      if(!usedValue){
        tempFilters[index].data.push(value)
      }else{
        const indexOfValue = tempFilters[index].data.indexOf(usedValue)
        tempFilters[index].data.splice(indexOfValue, 1)
        if(tempFilters[index].data.length === 0){
          tempFilters.splice(index, 1)
        }
      }
    }
    setTempFilters([...tempFilters])
    window.clearTimeout(timeoutId)
    let id = window.setTimeout(acceptFilters, 1000)
    setTimeoutId(id)
  }

  // const declineFilters = () => {
  //   setTempFilters(JSON.parse(JSON.stringify(usedFilters)))
  // }

  const clearFilters = () => {
    tempFilters.splice(0, tempFilters.length)
    window.clearTimeout(timeoutId)
    let id = window.setTimeout(acceptFilters, 500)
    setTimeoutId(id)
  }

  const [newFiltersArray, setNewFiltersArray] = useState<IFiltersFeature[]>([])
  const [dropdownsOpen, setDropdownsOpen] = useState<boolean[]>([])

  useEffect(()=>{
    setNewFiltersArray([...filtersArray])
    filtersArray.map((elem, index) => {
      if(query.feature){
        const includes = JSON.parse(`${query.feature}`).find((el: IFilter) => el.feature_id === elem.id)
        dropdownsOpen[index] = !!includes;
      }else{
        dropdownsOpen[index] = false
      }
    })
    setDropdownsOpen([...dropdownsOpen])
    if(query.feature) {
      usedFilters.splice(0, usedFilters.length)
      JSON.parse(`${query.feature}`).map((el: IFilter) => {
        usedFilters.push(el)
      })
    }
    setTempFilters([...JSON.parse(JSON.stringify(usedFilters))])
    setNewProducts([...products])
  },[filtersArray])

  const togglePageHandler = (el: number) =>{
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    push(`/catalog/${levels.join('/')}?page=${el}${usedFilters.length > 0 ? `&feature=${JSON.stringify(usedFilters)}` : ``}`)
  }

  const displayPages = () => {
    const arr = []
    if(countPages > 5){
      arr[0] = 1
      if(page === 1){
        for(let i=0;i<4;i++) {
          arr.push(page + i + 1)
        }
      }else{
        if (page + 1 === countPages) {
          arr[3] = page
          arr[2] = page - 1
          arr[1] = page - 2
        }else if (page + 1 >= countPages) {
          arr[3] = page - 1
          arr[2] = page - 2
          arr[1] = page - 3
        } else if(page - 1 !== 1) {
          arr[3] = page + 1
          arr[2] = page
          arr[1] = page - 1
        }else {
          arr[3] = page + 2
          arr[2] = page + 1
          arr[1] = page
        }
      }
      arr[4] = countPages
    }else{
      for(let i=0;i<countPages;i++){
        arr.push(i+1)
      }
    }

    return arr.map((el)=>{
      return <Button
        onClick={()=>togglePageHandler(el)}
        style={page === el ? 'filled' : 'outlined'}
        className={s.catalog__catalog__pages__container__page}
        icon>{el}</Button>
    })
  }

  const {width} = useTypedSelector(state => state.profile)

  const displayPlaceholders = (count: number) => {

    const placeholderArr = Array(count).fill(null);
    return placeholderArr.map((_, index: number) => <div key={index} className={s.catalog__placeholder_container}>
      <div className={s.catalog__placeholder}></div>
    </div>)
  }

  return (
    <Layout>
      <Head>
        <title>Каталог</title>
        <meta name={"og:title"} content={"Каталог"} />
        <meta property="description" content={`Купить товары из категории ${info[0]}${info[1] ? ` в разделе ${info[1]}` : ``}`} />
        <meta property="og:description" content={`Купить товары из категории ${info[0]}${info[1] ? ` в разделе ${info[1]}` : ``}`} />
        <meta property="og:url" content={`https://video-electro.ru/catalog/${levels.join('/')}`} />
      </Head>
      <Container>
        <Modal showModal={isFilters} closeHandler={()=>{
          setIsFilters(false)
          // if(JSON.stringify(tempFilters) !== JSON.stringify(usedFilters)){
          //   acceptFilters()
          // }
        }}>
          <div className={s.filters}>
            <div className={s.filters__header}>
              <Text size={'big+'} bold>Фильтры</Text>
              <Button
                onClick={clearFilters}
                size={'medium'}
                style={'borderless'}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Сбросить
              </Button>
            </div>
            <div className={s.filters__content}>
              {newFiltersArray.map((el, index)=>{
                return <div key={index} className={s.filters__content__filter}>
                  <Dropdown type={'inside'}
                            open={dropdownsOpen[index]}
                            onClick={() => {
                              if(!dropdownsOpen[index]){
                                if(newFiltersArray[index].featureValue && newFiltersArray[index].featureValue.length > 0){
                                  dropdownsOpen[index] = !dropdownsOpen[index]
                                  setDropdownsOpen(prev => [...prev])
                                  return;
                                }

                                let obj: ICatalogQuery = {}

                                if(usedFilters.length > 0){
                                  obj.feature = JSON.stringify(usedFilters)
                                }

                                if(levels.length === 3){
                                  obj.level2 = +levels[2]
                                }else if(levels.length === 2){
                                  obj.level3 = +levels[1]
                                }else {
                                  obj.level4 = +levels[0]
                                }

                                $api.post(`/product/catalog/getFilters/${el.id}`,  obj)
                                  .then((res) => {
                                    newFiltersArray[index].featureValue = res.data.service.sort((el: IFilterFeatureValue) => !el.disable)
                                    setNewFiltersArray(prev => [...prev])
                                    dropdownsOpen[index] = !dropdownsOpen[index]
                                    setDropdownsOpen(prev => [...prev])
                                  })
                              }else{
                                dropdownsOpen[index] = !dropdownsOpen[index]
                                setDropdownsOpen(prev => [...prev])
                              }
                            }}
                            setDropdowns={setDropdownsOpen}
                            title_inside={
                              <Text className={s.filters__content__filter__name} bold>{el.featureName}
                                {(()=>{
                                  const used = tempFilters.find((elem) => elem.feature_id === el.id)
                                  if(used && used.data.length > 0){
                                    let text = used.data.map(elem => `${elem} ${el.featureUom ? el.featureUom : ''}`).join(', ')
                                    if(text.length > 20) {
                                      if(el.featureName.length > 20){
                                        text = `${text.slice(0,14)}...`
                                      }else{
                                        text = `${text.slice(0,24)}...`
                                      }
                                    }
                                    return <Text type={'span'} colored>{`${text}`}</Text>
                                  }
                                  return <></>
                                })()}
                              </Text>
                            }
                  >
                    {el.featureValue && <Checkbox disabled={(()=>{
                                  const isAllDisabled = el.featureValue.filter((el) => el.disable)
                                  return isAllDisabled.length === el.featureValue.length
                                })()}
                                isChecked={(() => {
                                    const used = tempFilters.find((used) => used.feature_id === el.id)
                                    if (used) {
                                      const allThatNotDisabled = el.featureValue.filter((el) => !el.disable)
                                      return used.data.length === allThatNotDisabled.length
                                    }
                                    return false
                                  }
                                )()}
                               className={s.filters__content__filter__options__option}
                               onChange={() => {
                                 const allThatNotDisabled = el.featureValue.filter((el) => !el.disable)
                                 const used = tempFilters.find((used) => used.feature_id === el.id)
                                 if (used) {
                                   const index = tempFilters.indexOf(used)
                                   if (used.data.length === allThatNotDisabled.length) {
                                     tempFilters[index].data = []
                                     tempFilters.splice(index, 1)
                                   } else {
                                     tempFilters[index].data = allThatNotDisabled.map((value) => {
                                       return value.featureValue
                                     })
                                   }
                                 } else {
                                   tempFilters.push({
                                     feature_id: el.id,
                                     data: allThatNotDisabled.map((value) => {
                                       return value.featureValue
                                     })
                                   })
                                 }
                                 setTempFilters([...tempFilters])
                                 window.clearTimeout(timeoutId)
                                 let id = window.setTimeout(acceptFilters, 1000)
                                 setTimeoutId(id)
                               }} colored label={'Выбрать все'}/>}
                    {el.featureValue && el.featureValue.map((elem, index) => {
                      return <Checkbox key={index}
                                       className={s.filters__content__filter__options__option}
                                       disabled={!!elem.disable}
                                       isChecked={(() => {
                                         const used = tempFilters.find((used) => used.feature_id === el.id)
                                         if(used){
                                           const index = tempFilters.indexOf(used)
                                           const usedValue = tempFilters[index].data.find((usedString) => usedString === elem.featureValue)
                                           return !!usedValue
                                         }else{
                                           return false
                                         }
                                       })()}
                                       onChange={()=>toggleFilter(el.id, elem.featureValue)}
                                       label={`${elem.featureValue} ${el.featureUom ? el.featureUom : ''} (${elem.count})`} />
                    })}
                  </Dropdown>
                </div>
              })}
            </div>
            {/*<div className={s.filters__btns}>*/}
            {/*  <Button*/}
            {/*    style={'outlined'}*/}
            {/*    onClick={declineFilters}*/}
            {/*    size={'bigger'}>Отмена</Button>*/}
            {/*  <Button*/}
            {/*    onClick={acceptFilters}*/}
            {/*    size={'bigger'}>Применить</Button>*/}
            {/*</div>*/}
          </div>
        </Modal>
        <div className={s.catalog}>
          <div className={s.catalog__catalog}>
            <div className={s.catalog__catalog__header}>
              <Text size={'big+'} type={'h1'}>{info.join(' / ')}</Text>
              {width !== 'mobile' && <Button onClick={() => setIsFilters(true)}
                       size={'bigger'}>Фильтры</Button>}
            </div>
            <div className={s.catalog__catalog__settings}>
              <div className={s.catalog__catalog__settings__selects}>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>{width === 'mobile' ? 'Сортировать по' :'Сортировать по'}</Text>
                  <Select sort value={sortType} values={sortTypes} onClick={onSortChange} />
                </div>
                <div className={s.catalog__catalog__settings__selects__select}>
                  <Text>{width === 'mobile' ? 'Кол-во на странице'.slice(0, 14) + '...' :'Кол-во товаров на странице'}</Text>
                  <Select value={count} values={counts} onClick={onCountChange} />
                </div>
              </div>
              {width !== 'mobile' && <div className={s.catalog__catalog__settings__btns}>
                <Text>Вид каталога</Text>
                <div className={s.catalog__catalog__settings__btns__container}>
                  <Button icon
                          onClick={() => onViewStyleChange(0)}
                          style={viewStyle === 0 ? 'filled' : 'outlined'}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11 2.6C11 2.03995 11 1.75992 11.109 1.54601C11.2049 1.35785 11.3578 1.20487 11.546 1.10899C11.7599 1 12.0399 1 12.6 1H15.4C15.9601 1 16.2401 1 16.454 1.10899C16.6422 1.20487 16.7951 1.35785 16.891 1.54601C17 1.75992 17 2.03995 17 2.6V5.4C17 5.96005 17 6.24008 16.891 6.45399C16.7951 6.64215 16.6422 6.79513 16.454 6.89101C16.2401 7 15.9601 7 15.4 7H12.6C12.0399 7 11.7599 7 11.546 6.89101C11.3578 6.79513 11.2049 6.64215 11.109 6.45399C11 6.24008 11 5.96005 11 5.4V2.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M1 2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1H5.4C5.96005 1 6.24008 1 6.45399 1.10899C6.64215 1.20487 6.79513 1.35785 6.89101 1.54601C7 1.75992 7 2.03995 7 2.6V5.4C7 5.96005 7 6.24008 6.89101 6.45399C6.79513 6.64215 6.64215 6.79513 6.45399 6.89101C6.24008 7 5.96005 7 5.4 7H2.6C2.03995 7 1.75992 7 1.54601 6.89101C1.35785 6.79513 1.20487 6.64215 1.10899 6.45399C1 6.24008 1 5.96005 1 5.4V2.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M1 12.6C1 12.0399 1 11.7599 1.10899 11.546C1.20487 11.3578 1.35785 11.2049 1.54601 11.109C1.75992 11 2.03995 11 2.6 11H5.4C5.96005 11 6.24008 11 6.45399 11.109C6.64215 11.2049 6.79513 11.3578 6.89101 11.546C7 11.7599 7 12.0399 7 12.6V15.4C7 15.9601 7 16.2401 6.89101 16.454C6.79513 16.6422 6.64215 16.7951 6.45399 16.891C6.24008 17 5.96005 17 5.4 17H2.6C2.03995 17 1.75992 17 1.54601 16.891C1.35785 16.7951 1.20487 16.6422 1.10899 16.454C1 16.2401 1 15.9601 1 15.4V12.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M11 12.6C11 12.0399 11 11.7599 11.109 11.546C11.2049 11.3578 11.3578 11.2049 11.546 11.109C11.7599 11 12.0399 11 12.6 11H15.4C15.9601 11 16.2401 11 16.454 11.109C16.6422 11.2049 16.7951 11.3578 16.891 11.546C17 11.7599 17 12.0399 17 12.6V15.4C17 15.9601 17 16.2401 16.891 16.454C16.7951 16.6422 16.6422 16.7951 16.454 16.891C16.2401 17 15.9601 17 15.4 17H12.6C12.0399 17 11.7599 17 11.546 16.891C11.3578 16.7951 11.2049 16.6422 11.109 16.454C11 16.2401 11 15.9601 11 15.4V12.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                  <Button icon
                          onClick={() => onViewStyleChange(1)}
                          style={viewStyle === 1 ? 'filled' : 'outlined'}>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 2L19 2.00078M6 8L19 8.00078M6 14L19 14.0007M1 2.5H2V1.5H1V2.5ZM1 8.5H2V7.5H1V8.5ZM1 14.5H2V13.5H1V14.5Z"
                        stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>}
            </div>
            {width === 'mobile' && <div className={s.catalog__catalog__settings__mobile}>
              <div className={s.catalog__catalog__settings__btns}>
                <Text>Вид каталога</Text>
                <div className={s.catalog__catalog__settings__btns__container}>
                  <Button icon
                          onClick={() => onViewStyleChange(0)}
                          style={viewStyle === 0 ? 'filled' : 'outlined'}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11 2.6C11 2.03995 11 1.75992 11.109 1.54601C11.2049 1.35785 11.3578 1.20487 11.546 1.10899C11.7599 1 12.0399 1 12.6 1H15.4C15.9601 1 16.2401 1 16.454 1.10899C16.6422 1.20487 16.7951 1.35785 16.891 1.54601C17 1.75992 17 2.03995 17 2.6V5.4C17 5.96005 17 6.24008 16.891 6.45399C16.7951 6.64215 16.6422 6.79513 16.454 6.89101C16.2401 7 15.9601 7 15.4 7H12.6C12.0399 7 11.7599 7 11.546 6.89101C11.3578 6.79513 11.2049 6.64215 11.109 6.45399C11 6.24008 11 5.96005 11 5.4V2.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M1 2.6C1 2.03995 1 1.75992 1.10899 1.54601C1.20487 1.35785 1.35785 1.20487 1.54601 1.10899C1.75992 1 2.03995 1 2.6 1H5.4C5.96005 1 6.24008 1 6.45399 1.10899C6.64215 1.20487 6.79513 1.35785 6.89101 1.54601C7 1.75992 7 2.03995 7 2.6V5.4C7 5.96005 7 6.24008 6.89101 6.45399C6.79513 6.64215 6.64215 6.79513 6.45399 6.89101C6.24008 7 5.96005 7 5.4 7H2.6C2.03995 7 1.75992 7 1.54601 6.89101C1.35785 6.79513 1.20487 6.64215 1.10899 6.45399C1 6.24008 1 5.96005 1 5.4V2.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M1 12.6C1 12.0399 1 11.7599 1.10899 11.546C1.20487 11.3578 1.35785 11.2049 1.54601 11.109C1.75992 11 2.03995 11 2.6 11H5.4C5.96005 11 6.24008 11 6.45399 11.109C6.64215 11.2049 6.79513 11.3578 6.89101 11.546C7 11.7599 7 12.0399 7 12.6V15.4C7 15.9601 7 16.2401 6.89101 16.454C6.79513 16.6422 6.64215 16.7951 6.45399 16.891C6.24008 17 5.96005 17 5.4 17H2.6C2.03995 17 1.75992 17 1.54601 16.891C1.35785 16.7951 1.20487 16.6422 1.10899 16.454C1 16.2401 1 15.9601 1 15.4V12.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path
                        d="M11 12.6C11 12.0399 11 11.7599 11.109 11.546C11.2049 11.3578 11.3578 11.2049 11.546 11.109C11.7599 11 12.0399 11 12.6 11H15.4C15.9601 11 16.2401 11 16.454 11.109C16.6422 11.2049 16.7951 11.3578 16.891 11.546C17 11.7599 17 12.0399 17 12.6V15.4C17 15.9601 17 16.2401 16.891 16.454C16.7951 16.6422 16.6422 16.7951 16.454 16.891C16.2401 17 15.9601 17 15.4 17H12.6C12.0399 17 11.7599 17 11.546 16.891C11.3578 16.7951 11.2049 16.6422 11.109 16.454C11 16.2401 11 15.9601 11 15.4V12.6Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                  <Button icon
                          onClick={() => onViewStyleChange(1)}
                          style={viewStyle === 1 ? 'filled' : 'outlined'}>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 2L19 2.00078M6 8L19 8.00078M6 14L19 14.0007M1 2.5H2V1.5H1V2.5ZM1 8.5H2V7.5H1V8.5ZM1 14.5H2V13.5H1V14.5Z"
                        stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
              </div>
              <Button onClick={() => setIsFilters(true)}
                      size={'bigger'}>Фильтры</Button>
            </div>}
            <div className={s.catalog__catalog__cards}>
              {(count.key !== 'null' && loading) ? displayPlaceholders(+count.key) : newProducts.length > 0 ? newProducts.map((el, _index)=>{
                return <Card type={viewStyle === 0 ? 'short' : 'long'} product={el} />
              }) : <Text className={s.catalog__catalog__cards__notFound}>Товары не найдены</Text>}
            </div>
            <div>
              {count.key !== 'null' && countPages > 1 && <div className={s.catalog__catalog__pages}>
                <div className={s.catalog__catalog__pages__container}>
                  {displayPages()}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </Container>
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

export default Catalog;
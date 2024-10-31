import { ICatalogQuery, IFilter, IProductShort } from "@/types/Product.types"
import { useEffect, useState } from "react"
import {useRouter} from "next/router";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Storage } from "@/utils/storage";
import { $api } from "@/http/axios";
import { isScrollAtBottom } from "@/utils/isScrollAtBottom";

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
    products: IProductShort[];
    count_pages: number;
    filtersArray: IFiltersFeature[];
    levels: string[];
}

const useCatalog = ({products, count_pages, filtersArray, levels}: ICatalogProps) => {

    const [newProducts, setNewProducts] = useState<IProductShort[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [timeoutId, setTimeoutId] = useState<number>(0)
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
    const [viewStyle, setViewStyle] = useState<number>(0)
    const [countPages, setCountPages] = useState<number>(count_pages)
    const [page, setPage] = useState<number>(1)
    const [usedFilters, setUsedFilters] = useState<IFilter[]>([])
    const [isFilters, setIsFilters] = useState<boolean>(false)
    const [tempFilters, setTempFilters] = useState<IFilter[]>([])
    const [newFiltersArray, setNewFiltersArray] = useState<IFiltersFeature[]>([])
    const [dropdownsOpen, setDropdownsOpen] = useState<boolean[]>([])
    let loadedPage = 1

    const { push, query } = useRouter()
  
    const {width} = useTypedSelector(state => state.profile)

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
            setLoading(true)
        }

        if(query.feature) {
            setLoading(true)
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
  
    const acceptFilters = () => {
        push(`/catalog/${levels.join('/')}?page=1${tempFilters.length > 0 ? `&feature=${JSON.stringify(tempFilters)}` : ``}`)
    }

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

    const clearFilters = () => {
        tempFilters.splice(0, tempFilters.length)
        window.clearTimeout(timeoutId)
        let id = window.setTimeout(acceptFilters, 500)
        setTimeoutId(id)
    }
    
    
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
            setLoading(true)
            usedFilters.splice(0, usedFilters.length)
            JSON.parse(`${query.feature}`).map((el: IFilter) => {
                usedFilters.push(el)
            })
        }
        setTempFilters([...JSON.parse(JSON.stringify(usedFilters))])
    },[filtersArray])


    useEffect(() => {
        if(window && !!products.length){
            if(window.location.search.length > 0){
                setLoading(true)
            }else{
                setNewProducts([...products])
            }
        }
    }, [])

    const togglePageHandler = (el: number) =>{
        push(`/catalog/${levels.join('/')}?page=${el}${usedFilters.length > 0 ? `&feature=${JSON.stringify(usedFilters)}` : ``}`)
    }
    
    return {
        countPages,
        page,
        togglePageHandler,
        isFilters,
        setIsFilters,
        clearFilters,
        newFiltersArray,
        setNewFiltersArray,
        dropdownsOpen,
        setDropdownsOpen,
        usedFilters,
        tempFilters,
        setTempFilters,
        setTimeoutId,
        toggleFilter,
        width,
        sortType,
        sortTypes,
        onSortChange,
        count,
        counts,
        onCountChange,
        viewStyle,
        onViewStyleChange,
        loading,
        newProducts,
        timeoutId,
        acceptFilters
    }
}

export default useCatalog
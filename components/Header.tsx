import React, {useEffect, useState} from 'react';
import s from '@/styles/components/Header.module.scss'
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import {useRouter} from "next/router";
import Link from "next/link";
import Input from "@/components/UI/Input";
import Auth from "@/components/Auth";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";
import {useMeasure} from "react-use";
import {animated, useSpring} from "react-spring";
import {$api, API_BASE_URL} from "@/http/axios";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setAuthShow, setHeader} from "@/store/Slices/Profile.slice";
import { IProductShort } from '@/types/Product.types';

interface IHeaderProps {
}

const Header: React.FC<IHeaderProps> = () => {

  const [data, setData] = useState<any>([])

  useEffect(() => {
    $api.get('/product/catalog/')
        .then((res) => {
          const newData = [...res.data]
          newData.pop()
          setData(newData)
        })
        .catch(() => {
          setData([])
        })
  }, [])

  const { pathname } = useRouter();

  const favs = useTypedSelector(state => state.favs)
  const profile = useTypedSelector(state => state.profile)
  const basket = useTypedSelector(state => state.basket)

  const [searchValue, setSearchValue] = useState('')
  const [searchProducts, setSearchProducts] = useState<IProductShort[]>([])
  const [showSearchProducts, setShowSearchProducts] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState(0)

  const searchGetProducts = () => {
    $api.post<IProductShort[]>('/product/search/', {
      find: searchValue
    })
      .then(res => {
        if(res.data && res.data.length > 0){
          setSearchProducts(res.data.slice(0, 5))
          setTimeout(() => setShowSearchProducts(true), 200)
        }else{
          setSearchProducts([])
          setTimeout(() => setShowSearchProducts(true), 200)
        }
      })
      .catch(() => {

      })
  }

  useEffect(() => {
    window.clearTimeout(timeoutId)
    if(searchValue === ''){
      setShowSearchProducts(false)
      setTimeout(() => setSearchProducts([]), 500)
    }else{
      let id = window.setTimeout(searchGetProducts, 1000)
      setTimeoutId(id)
    }
  }, [searchValue])

  const [menuContent, setMenuContent] = useState<any[]>([])
  const [menuContentShow, setMenuContentShow] = useState<number>(0)

  const dispatch = useAppDispatch()

  const ref = useOnclickOutside((e: any) => {
    setMenuContentShow(0)
    setTimeout(()=>{
      setMenuContent([])
    },300)
    if(e.target.classList && e.target.classList.length > 0 && (e.target.classList[1] === s.header__bottom__btn || e.target.parentElement.classList[1] === s.header__bottom__btn)) return
    if((e.target.classList && e.target.classList[1] === 'btn_') || (e.target.parentElement && e.target.parentElement.classList[1] === 'btn_')) return;
    if(profile.headerShow) {
      dispatch(setHeader(false))
    }
  });

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [contentRightHeight, setContentRightHeight] = useState<number>(0);
  const [refMenuLeft, menuLeftParams] = useMeasure<HTMLDivElement>();
  const [refMenuRight, menuRightParams] = useMeasure<HTMLDivElement>();

  const expand__left = useSpring({
    config: {
      friction: profile.headerShow ? 25 : 30,
      tension: profile.headerShow ? 200 : 300
    },
    height: profile.headerShow ? `${contentHeight < contentRightHeight ? contentRightHeight + 30 : contentHeight + 10}px` : '0px',
    width: profile.width === 'mobile' ? '100%' : (menuContentShow ? (profile.width === 'desktop' ? `1112px` : `810px`) : (profile.width === 'desktop' ? `444px` : `350px`)),
    overflow: 'hidden'
  });

  const expand__right = useSpring({
    config: {
      friction: menuContentShow ? 30 : 50,
      tension: menuContentShow ? 200 : 500
    },
    width: menuContentShow ? (profile.width === 'desktop' ? `688px` : `470px`) : '0px',
    height: `${contentRightHeight + 30}px`,
    overflow: 'hidden'
  });

  useEffect(() => {
    setContentHeight(menuLeftParams.height);
    setContentRightHeight(menuRightParams.height);

    window.addEventListener("resize", () => {
      setContentHeight(menuLeftParams.height)
      setContentRightHeight(menuRightParams.height);
    });

    return window.removeEventListener("resize", ()=>{
      setContentHeight(menuLeftParams.height)
      setContentRightHeight(menuRightParams.height);
    });
  }, [menuLeftParams.height, menuRightParams.height, profile.headerShow]);

  const onMenuClick = (content: any) => {
    setMenuContent(content)
  }

  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  const [refBlock, { height }] = useMeasure<HTMLDivElement>();
  
  const expand = useSpring({
    config: {
      friction: showSearchProducts ? 17 : 40,
      tension: showSearchProducts ? 200 : 300
    },
    height: showSearchProducts ? `${contentHeight+5}px` : `0px`,
    opacity: showSearchProducts ? 1 : 0,
    marginTop: `15px`,
    overflow: 'hidden'
  });

  useEffect(() => {
    setContentHeight(height);

    window.addEventListener("resize", ()=>setContentHeight(height));

    return window.removeEventListener("resize", ()=>setContentHeight(height));
  }, [height, searchProducts]);

  const refSearchProducts = useOnclickOutside((e: any) => {
    if(e.target.classList && e.target.classList.length > 0 
      && (e.target.classList[1] === s.header__bottom__search__products 
        || (e.target.parentElement && e.target.parentElement.classList[1] === s.header__bottom__search__input)
        )
      ) return
    setShowSearchProducts(false)

  });

  return (
    <>
      <Auth show={profile.authShow} setShow={(value: boolean) => dispatch(setAuthShow(value))} />
      <div className={s.header}>
        <div className={s.header__top}>
          <div className={s.header__top__left}>
            <Link href={'/'}>
              <svg width="176" height="22" viewBox="0 0 176 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2487 20.7508H6.54551L0.0820312 1.57944H4.20766L8.91087 16.314L13.5866 1.57944H17.7397L11.2487 20.7508Z" fill="#2D303B"/>
                <path d="M20.6532 5.41371C20.0665 5.41371 19.5531 5.20374 19.113 4.7838C18.6913 4.34559 18.4804 3.83436 18.4804 3.25009C18.4804 2.66582 18.6913 2.15458 19.113 1.71638C19.5531 1.27818 20.0665 1.05908 20.6532 1.05908C21.2583 1.05908 21.7717 1.27818 22.1935 1.71638C22.6335 2.15458 22.8536 2.66582 22.8536 3.25009C22.8536 3.83436 22.6335 4.34559 22.1935 4.7838C21.7717 5.20374 21.2583 5.41371 20.6532 5.41371ZM22.441 20.7508H18.893V7.05697H22.441V20.7508Z" fill="#2D303B"/>
                <path d="M36.1125 8.67284V1.57944H39.6605V20.7508H36.1125V19.1349C35.0674 20.4678 33.5821 21.1342 31.6568 21.1342C29.8049 21.1342 28.2188 20.4404 26.8986 19.0528C25.5967 17.6469 24.9458 15.9306 24.9458 13.9039C24.9458 11.8955 25.5967 10.1883 26.8986 8.78239C28.2188 7.37649 29.8049 6.67354 31.6568 6.67354C33.5821 6.67354 35.0674 7.33998 36.1125 8.67284ZM29.5665 16.6974C30.3183 17.4095 31.2351 17.7655 32.3169 17.7655C33.4171 17.7655 34.3247 17.4095 35.0398 16.6974C35.755 15.9671 36.1125 15.0359 36.1125 13.9039C36.1125 12.7719 35.755 11.8498 35.0398 11.1377C34.3247 10.4074 33.4171 10.0422 32.3169 10.0422C31.2168 10.0422 30.3 10.4074 29.5665 11.1377C28.8514 11.8498 28.4939 12.7719 28.4939 13.9039C28.4939 15.0359 28.8514 15.9671 29.5665 16.6974Z" fill="#2D303B"/>
                <path d="M56.2724 15.3554H45.9034C46.3618 17.0717 47.6545 17.9299 49.7814 17.9299C51.1383 17.9299 52.1651 17.4734 52.8619 16.5605L55.7224 18.2037C54.3655 20.1574 52.3668 21.1342 49.7264 21.1342C47.4528 21.1342 45.6283 20.4495 44.2531 19.0801C42.8779 17.7108 42.1903 15.9853 42.1903 13.9039C42.1903 11.8589 42.8687 10.1426 44.2256 8.755C45.5641 7.36736 47.3061 6.67354 49.4514 6.67354C51.4867 6.67354 53.1461 7.36736 54.4297 8.755C55.7499 10.1426 56.41 11.8589 56.41 13.9039C56.41 14.2873 56.3641 14.7712 56.2724 15.3554ZM45.8483 12.6167H52.8619C52.6602 11.722 52.2477 11.0373 51.6242 10.5626C51.0191 10.0879 50.2949 9.85051 49.4514 9.85051C48.4979 9.85051 47.7095 10.097 47.086 10.59C46.4626 11.0647 46.05 11.7403 45.8483 12.6167Z" fill="#2D303B"/>
                <path d="M70.4962 19.0528C69.1026 20.4404 67.379 21.1342 65.3254 21.1342C63.2717 21.1342 61.5481 20.4404 60.1546 19.0528C58.7611 17.6651 58.0643 15.9488 58.0643 13.9039C58.0643 11.8772 58.7611 10.17 60.1546 8.78239C61.5665 7.37649 63.2901 6.67354 65.3254 6.67354C67.3607 6.67354 69.0843 7.37649 70.4962 8.78239C71.9081 10.1883 72.614 11.8955 72.614 13.9039C72.614 15.9306 71.9081 17.6469 70.4962 19.0528ZM62.6575 16.6153C63.3726 17.3273 64.2619 17.6834 65.3254 17.6834C66.3889 17.6834 67.2782 17.3273 67.9933 16.6153C68.7084 15.9032 69.066 14.9994 69.066 13.9039C69.066 12.8084 68.7084 11.9046 67.9933 11.1925C67.2782 10.4804 66.3889 10.1244 65.3254 10.1244C64.2619 10.1244 63.3726 10.4804 62.6575 11.1925C61.9607 11.9228 61.6123 12.8266 61.6123 13.9039C61.6123 14.9811 61.9607 15.8849 62.6575 16.6153Z" fill="#2D303B"/>
                <path d="M85.5891 14.1778H75.275V10.7817H85.5891V14.1778Z" fill="#2D303B"/>
                <path d="M93.7063 12.8358V17.1356H101.82V20.7508H89.9107V1.57944H101.682V5.19461H93.7063V9.27537H100.995V12.8358H93.7063Z" fill="#5B74F9"/>
                <path d="M107.878 20.7508H104.33V0.757812H107.878V20.7508Z" fill="#5B74F9"/>
                <path d="M124.493 15.3554H114.124C114.582 17.0717 115.875 17.9299 118.002 17.9299C119.359 17.9299 120.386 17.4734 121.082 16.5605L123.943 18.2037C122.586 20.1574 120.587 21.1342 117.947 21.1342C115.673 21.1342 113.849 20.4495 112.474 19.0801C111.098 17.7108 110.411 15.9853 110.411 13.9039C110.411 11.8589 111.089 10.1426 112.446 8.755C113.785 7.36736 115.527 6.67354 117.672 6.67354C119.707 6.67354 121.367 7.36736 122.65 8.755C123.97 10.1426 124.63 11.8589 124.63 13.9039C124.63 14.2873 124.585 14.7712 124.493 15.3554ZM114.069 12.6167H121.082C120.881 11.722 120.468 11.0373 119.845 10.5626C119.24 10.0879 118.515 9.85051 117.672 9.85051C116.718 9.85051 115.93 10.097 115.307 10.59C114.683 11.0647 114.271 11.7403 114.069 12.6167Z" fill="#5B74F9"/>
                <path d="M133.546 21.1342C131.474 21.1342 129.741 20.4404 128.348 19.0528C126.972 17.6651 126.285 15.9488 126.285 13.9039C126.285 11.8589 126.972 10.1426 128.348 8.755C129.741 7.36736 131.474 6.67354 133.546 6.67354C134.884 6.67354 136.104 6.99307 137.204 7.63211C138.304 8.27115 139.138 9.1293 139.707 10.2065L136.654 11.9867C136.379 11.4207 135.957 10.9734 135.389 10.6448C134.839 10.3161 134.215 10.1518 133.518 10.1518C132.455 10.1518 131.575 10.5078 130.878 11.2199C130.181 11.9137 129.833 12.8084 129.833 13.9039C129.833 14.9629 130.181 15.8575 130.878 16.5879C131.575 17.2817 132.455 17.6286 133.518 17.6286C134.233 17.6286 134.866 17.4734 135.416 17.163C135.985 16.8344 136.406 16.387 136.681 15.821L139.762 17.5738C139.157 18.6693 138.295 19.5366 137.176 20.1756C136.076 20.8147 134.866 21.1342 133.546 21.1342Z" fill="#5B74F9"/>
                <path d="M149.505 7.05697V10.453H146.397V16.1497C146.397 16.6244 146.516 16.9713 146.754 17.1904C146.992 17.4095 147.341 17.5373 147.799 17.5738C148.258 17.5921 148.826 17.583 149.505 17.5464V20.7508C147.102 21.0247 145.388 20.8056 144.361 20.0935C143.353 19.3631 142.849 18.0485 142.849 16.1497V10.453H140.456V7.05697H142.849V4.29082L146.397 3.2227V7.05697H149.505Z" fill="#5B74F9"/>
                <path d="M155.769 7.05697V9.41231C156.081 8.55416 156.612 7.90599 157.364 7.46778C158.116 7.01132 158.978 6.78309 159.95 6.78309V10.7269C158.868 10.5808 157.896 10.7999 157.034 11.3842C156.191 11.9502 155.769 12.8905 155.769 14.2051V20.7508H152.221V7.05697H155.769Z" fill="#5B74F9"/>
                <path d="M173.231 19.0528C171.838 20.4404 170.114 21.1342 168.06 21.1342C166.007 21.1342 164.283 20.4404 162.89 19.0528C161.496 17.6651 160.799 15.9488 160.799 13.9039C160.799 11.8772 161.496 10.17 162.89 8.78239C164.301 7.37649 166.025 6.67354 168.06 6.67354C170.096 6.67354 171.819 7.37649 173.231 8.78239C174.643 10.1883 175.349 11.8955 175.349 13.9039C175.349 15.9306 174.643 17.6469 173.231 19.0528ZM165.392 16.6153C166.108 17.3273 166.997 17.6834 168.06 17.6834C169.124 17.6834 170.013 17.3273 170.728 16.6153C171.443 15.9032 171.801 14.9994 171.801 13.9039C171.801 12.8084 171.443 11.9046 170.728 11.1925C170.013 10.4804 169.124 10.1244 168.06 10.1244C166.997 10.1244 166.108 10.4804 165.392 11.1925C164.696 11.9228 164.347 12.8266 164.347 13.9039C164.347 14.9811 164.696 15.8849 165.392 16.6153Z" fill="#5B74F9"/>
              </svg>
            </Link>
            <div className={s.header__top__left__links}>
              <Text type={'link'} no_td={true} href={'/'} colored={pathname === "/"}>Главная</Text>
              <Text type={'link'} no_td={true} href={'/about'} colored={pathname === "/about"}>О нас</Text>
              <Text type={'link'} no_td={true} href={'/coop'} colored={pathname === "/coop"}>Сотрудничество</Text>
              <Text type={'link'} no_td={true} href={'/contacts'} colored={pathname === "/contacts"}>Контакты</Text>
            </div>
          </div>
          <div className={s.header__top__right}>
            {profile.width !== 'mobile' && <div
              className={classNames(s.header__top__right__link, {[s.header__top__right__link_active]: pathname === '/favs'})}>
              <Link href={'/favs'}>
                {favs.products.length > 0 && <div
                  className={s.header__top__right__link__count}>{favs.products.length > 9 ? '9+' : favs.products.length}</div>}
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M13 4.00018C10.6008 1.20415 6.59169 0.340049 3.58563 2.90037C0.579573 5.46069 0.156361 9.74142 2.51704 12.7695C4.47978 15.2872 10.4197 20.5971 12.3665 22.3157C12.5843 22.508 12.6932 22.6042 12.8203 22.6419C12.9311 22.6749 13.0524 22.6749 13.1633 22.6419C13.2903 22.6042 13.3992 22.508 13.617 22.3157C15.5638 20.5971 21.5038 15.2872 23.4665 12.7695C25.8272 9.74142 25.4557 5.43376 22.3979 2.90037C19.3402 0.366981 15.3992 1.20415 13 4.00018Z"
                        stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>}
            <div className={classNames(s.header__top__right__link, {[s.header__top__right__link_active]: pathname === '/basket'})}>
              <Link href={'/basket'}>
                {basket.products.length > 0 && <div
                  className={s.header__top__right__link__count}>{basket.products.length > 9 ? '9+' : basket.products.length}</div>}
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {basket.products.length > 0 && <div
                  className={s.header__top__right__link__price}>{`${(basket.totalPrice-basket.discountedPrice).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</div>}
              </Link>
            </div>
            <div className={s.header__top__right__link}>
              {profile.user ? <Link href={'/profile'}>
                <img
                  className={classNames(s.header__top__right__link__image, {[s.header__top__right__link__image_active]: pathname === '/profile'})}
                  src={profile.user?.user_image ? (typeof profile.user.user_image !== 'string' ? URL.createObjectURL(profile.user.user_image) : `${API_BASE_URL}${profile.user?.user_image}`) : ''} alt='user'/>
              </Link> : <div onClick={()=>{
                dispatch(setAuthShow(true))
                document.body.classList.toggle('no-scroll', profile.authShow);
              }} className={s.header__top__right__link__svg}>
                <svg width="35" height="35" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_11_163)">
                    <rect width="200" height="200" fill="#F9F9FF"/>
                    <ellipse cx="100" cy="173.5" rx="82" ry="46.5" fill="#5B74F9"/>
                    <circle cx="100.5" cy="63.5" r="46.5" fill="#5B74F9"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_11_163">
                      <rect width="200" height="200" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              }
            </div>
          </div>
        </div>
        <div className={s.header__bottom}>
          <Button size={'big'}
                  className={s.header__bottom__btn}
                  onClick={()=>dispatch(setHeader(!profile.headerShow))}
                  style={profile.headerShow ? 'outlined' : 'filled'}
          >
            {profile.headerShow ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17M17 1L1 17" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              : <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1H17.5M1.5 7H17.5M1.5 13H17.5" stroke="white" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>}
            Каталог
          </Button>
          {profile.width === 'mobile' && <div className={s.header__top__right}>
            <div
              className={classNames(s.header__top__right__link, {[s.header__top__right__link_active]: pathname === '/favs'})}>
              <Link href={'/favs'}>
                {favs.products.length > 0 && <div
                  className={s.header__top__right__link__count}>{favs.products.length > 9 ? '9+' : favs.products.length}</div>}
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M13 4.00018C10.6008 1.20415 6.59169 0.340049 3.58563 2.90037C0.579573 5.46069 0.156361 9.74142 2.51704 12.7695C4.47978 15.2872 10.4197 20.5971 12.3665 22.3157C12.5843 22.508 12.6932 22.6042 12.8203 22.6419C12.9311 22.6749 13.0524 22.6749 13.1633 22.6419C13.2903 22.6042 13.3992 22.508 13.617 22.3157C15.5638 20.5971 21.5038 15.2872 23.4665 12.7695C25.8272 9.74142 25.4557 5.43376 22.3979 2.90037C19.3402 0.366981 15.3992 1.20415 13 4.00018Z"
                        stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div
              onClick={() => setSearchOpen(prev => !prev)}
              className={classNames(s.header__top__right__link, {[s.header__top__right__link_active]: searchOpen})}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0607 18.0814L25 25M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>}
          <div className={s.header__bottom__search}>
            {profile.width !== 'mobile' && <Input value={searchValue}
                                                  className={s.header__bottom__search__input}
                                                  onChange={(e) => {
                                                    setSearchValue(e.target.value.slice(0, 200))}
                                                  }
                                                  placeholder={'Поиск'} key={'s'}
                                                  onClick={() => {
                                                    if(searchProducts.length > 0){
                                                      setShowSearchProducts(true)
                                                    }
                                                  }}
                                                  icon={<svg className={s.header__bottom__svg} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18.0607 18.0814L25 25M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>}
            />}
            {profile.width !== 'mobile' && <animated.div className={classNames(s.header__bottom__search__animated, {[s.header__bottom__search__animated_active]: showSearchProducts})} style={expand}>
              <div ref={refBlock}>
                <div ref={refSearchProducts} className={classNames(s.header__bottom__search__products)}>
                  <div className={s.header__bottom__search__products__space}></div>
                  {searchProducts.length > 0 ? searchProducts.map((el)=>{
                    return <Link href={`/product/${el.id}`} className={classNames(s.header__bottom__search__products__block)}>
                      <Text>{el.ProductName}</Text>
                    </Link>
                  }) : <Text colored>Ничего не найдено</Text>}
                  <div className={s.header__bottom__search__products__space}></div>
                </div>
              </div>
            </animated.div>}
          </div>
        </div>
      </div>
      <div className={s.headerMenu__container}>
        <animated.div className={classNames(s.headerMenu__animated)} style={expand__left}>
          <div ref={ref} className={classNames(s.headerMenu, {[s.headerMenu_active]: profile.headerShow})}>
            <div ref={refMenuLeft} className={s.headerMenu__left}>
              <div className={s.headerMenu__left__space}></div>
              {profile.width === 'mobile' && menuContentShow !== 0 && <div className={s.headerMenu__right__back} onClick={() => {
                setMenuContentShow(0)
                setTimeout(()=>{
                  setMenuContent([])
                }, 300)
              }}>
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L9 9L17 1" stroke="#898989" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
                Назад</div>}
              {profile.width === 'mobile' && menuContentShow !== 0 && <Text type={'h2'}
                                                                    size={'big'}
                                                                    className={s.headerMenu__right__name}>{(()=>{
                const found = data.find((el: any) => el.Level4ID === menuContentShow)
                if(found){
                  return found.Level4Name
                }else{
                  return
                }
              })()}</Text>}
              {profile.width !== 'mobile' ? data.map((el: any) => {
                return (<div key={el.Level4ID} onClick={()=>{
                  if(menuContentShow === el.Level4ID){
                    setMenuContentShow(0)
                    setTimeout(()=>{
                      setMenuContent([])
                    }, 300)
                  }else{
                    // @ts-ignore
                    setMenuContentShow(el.Level4ID)
                    onMenuClick(el.Level3)
                  }
                }} className={s.headerMenu__left__item}>
                  <div>
                    <Text>{el.Level4Name}</Text>
                  </div>
                  <svg style={{
                    transition: 'all .3s linear',
                    transform: menuContentShow === el.Level4ID ? (profile.width === 'mobile' ? 'rotate(-90deg)' : 'rotate(90deg)') : 'rotate(-90deg)'
                  }} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L17 1" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                </div>)
              }) : menuContentShow !== 0 ? menuContent.map((el) => {
                return <div className={s.headerMenu__right__lvl1_container}>
                  <div key={el.Level3ID} className={s.headerMenu__right__lvl1}>
                    <Text no_td type={'link'} onClick={() => {
                      setMenuContentShow(0)
                      setTimeout(() => {
                        setMenuContent([])
                      }, 300)
                      dispatch(setHeader(false))
                    }} href={`/catalog/${menuContentShow}/${el.Level3ID}`} colored>
                      {el.Level3Name}
                    </Text>
                  </div>
                  <div className={s.headerMenu__right__lvl2_container}>
                    {el.Level2.map((elem: any) => {
                      return <Text no_td onClick={() => {
                        setMenuContentShow(0)
                        setTimeout(() => {
                          setMenuContent([])
                        }, 300)
                        dispatch(setHeader(false))
                      }} type={'link'} href={`/catalog/${menuContentShow}/${el.Level3ID}/${elem.Level2ID}`}
                                   key={elem.Level2ID} className={s.headerMenu__right__lvl2}>
                        {elem.Level2Name}
                      </Text>
                    })}
                  </div>
                </div>
              }) : data.map((el: any) => {
                return (<div key={el.Level4ID} onClick={()=>{
                  if(menuContentShow === el.Level4ID){
                    setMenuContentShow(0)
                    setTimeout(()=>{
                      setMenuContent([])
                    }, 300)
                  }else{
                    // @ts-ignore
                    setMenuContentShow(el.Level4ID)
                    onMenuClick(el.Level3)
                  }
                }} className={s.headerMenu__left__item}>
                  <div>
                    <Text>{el.Level4Name}</Text>
                  </div>
                  <svg style={{
                    transition: 'all .3s linear',
                    transform: menuContentShow === el.Level4ID ? (profile.width === 'mobile' ? 'rotate(-90deg)' : 'rotate(90deg)') : 'rotate(-90deg)'
                  }} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L17 1" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                </div>)
              })}
              <div className={s.headerMenu__left__space}></div>
            </div>
            {profile.width !== 'mobile' && <animated.div className={classNames(s.headerMenu__right__animated)} style={expand__right}>
              <div ref={refMenuRight} className={s.headerMenu__right}>
                {menuContent.map((el) => {
                  return <div className={s.headerMenu__right__lvl1_container}>
                    <div key={el.Level3ID} className={s.headerMenu__right__lvl1}>
                      <Text no_td type={'link'} onClick={() => {
                        setMenuContentShow(0)
                        setTimeout(() => {
                          setMenuContent([])
                        }, 300)
                        dispatch(setHeader(false))
                      }} href={`/catalog/${menuContentShow}/${el.Level3ID}`} colored>
                        {el.Level3Name}
                      </Text>
                    </div>
                    <div className={s.headerMenu__right__lvl2_container}>
                      {el.Level2.map((elem: any) => {
                        return <Text no_td onClick={() => {
                          setMenuContentShow(0)
                          setTimeout(() => {
                            setMenuContent([])
                          }, 300)
                          dispatch(setHeader(false))
                        }} type={'link'} href={`/catalog/${menuContentShow}/${el.Level3ID}/${elem.Level2ID}`}
                                     key={elem.Level2ID} className={s.headerMenu__right__lvl2}>
                          {elem.Level2Name}
                        </Text>
                      })}
                    </div>
                  </div>
                })}
              </div>
            </animated.div>}
          </div>
        </animated.div>
      </div>
    </>
  )
};

export default Header;
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
import {$api} from "@/http/axios";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setHeader} from "@/store/Slices/Profile.slice";

interface IHeaderProps {
}


const Header: React.FC<IHeaderProps> = () => {

  const [data, setData] = useState<any>([])

  useEffect(() => {
    $api.get('/product/catalog')
        .then((res) => {
          const newData = [...res.data]
          newData.pop()
          setData(newData)
        })
  }, [])

  const { pathname } = useRouter();

  const [width, setWidth] = useState<string>('desktop')

  const resize = () => {
    if(window){
      if(window.innerWidth > 1150){
        setWidth('desktop')
      }else if(window.innerWidth <= 1150 && window.innerWidth > 700) {
        setWidth('tablet')
      }else if(window.innerWidth <= 700) {
        setWidth('mobile')
      }else{
        setWidth('desktop')
      }
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', resize)
    if(window){
      if(window.innerWidth > 1150){
        setWidth('desktop')
      }else if(window.innerWidth <= 1150 && window.innerWidth > 700) {
        setWidth('tablet')
      }else if(window.innerWidth <= 700) {
        setWidth('mobile')
      }else{
        setWidth('desktop')
      }
    }

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const favs = useTypedSelector(state => state.favs)
  const profile = useTypedSelector(state => state.profile)
  // const basket = useTypedSelector(state => state.basket)

  const [searchValue, setSearchValue] = useState('')
  const [showAuth, setShowAuth] = useState<boolean>(false)
  const [menuContent, setMenuContent] = useState<any[]>([])
  const [menuContentShow, setMenuContentShow] = useState<number>(0)

  const dispatch = useAppDispatch()

  const ref = useOnclickOutside((e: any) => {
    setMenuContentShow(0)
    setTimeout(()=>{
      setMenuContent([])
    },300)
    if(e.target.classList && e.target.classList.length > 0 && (e.target.classList[1] === s.header__bottom__btn || e.target.parentElement.classList[1] === s.header__bottom__btn)) return
    if(e.target.classList[1] === 'btn_' || e.target.parentElement.classList[1] === 'btn_') return;
    dispatch(setHeader(false))
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
    width: menuContentShow ? (width === 'desktop' ? `1110` : `800px`) : `444px`,
    overflow: 'hidden'
  });

  const expand__right = useSpring({
    config: {
      friction: menuContentShow ? 30 : 50,
      tension: menuContentShow ? 200 : 500
    },
    width: menuContentShow ? (width === 'desktop' ? `688px` : `470px`) : '0px',
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

  return (
    <>
      <Auth show={showAuth} setShow={setShowAuth} />
      <div className={s.header}>
        <div className={s.header__top}>
          <div className={s.header__top__left}>
            <Text type={'link'} no_td={true} href={'/'} bold size={'big'}>Video-<Text bold type={'span'} size={'big'} colored={true}>Electro</Text></Text>
            <div className={s.header__top__left__links}>
              <Text type={'link'} no_td={true} href={'/'} colored={pathname === "/"}>Главная</Text>
              <Text type={'link'} no_td={true} href={'/about'} colored={pathname === "/about"}>О нас</Text>
              <Text type={'link'} no_td={true} href={'/coop'} colored={pathname === "/coop"}>Сотрудничество</Text>
              <Text type={'link'} no_td={true} href={'/contacts'} colored={pathname === "/contacts"}>Контакты</Text>
            </div>
          </div>
          <div className={s.header__top__right}>
            <div className={classNames(s.header__top__right__link, {[s.header__top__right__link_active]: pathname === '/favs'})}>
              <Link href={'/favs'}>
                {favs.products.length > 0 && <div
                  className={s.header__top__right__link__count}>{favs.products.length > 9 ? '9+' : favs.products.length}</div>}
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13 4.00018C10.6008 1.20415 6.59169 0.340049 3.58563 2.90037C0.579573 5.46069 0.156361 9.74142 2.51704 12.7695C4.47978 15.2872 10.4197 20.5971 12.3665 22.3157C12.5843 22.508 12.6932 22.6042 12.8203 22.6419C12.9311 22.6749 13.0524 22.6749 13.1633 22.6419C13.2903 22.6042 13.3992 22.508 13.617 22.3157C15.5638 20.5971 21.5038 15.2872 23.4665 12.7695C25.8272 9.74142 25.4557 5.43376 22.3979 2.90037C19.3402 0.366981 15.3992 1.20415 13 4.00018Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </div>
            {/*<div className={classNames(s.header__top__right__link, {[s.header__top__right__link__active]: pathname === '/basket'})}>*/}
            {/*  <Link href={'/basket'}>*/}
            {/*    /!*{basket.products.length > 0 && <div*!/*/}
            {/*    /!*  className={s.header__top__right__link__count}>{basket.products.length > 9 ? '9+' : basket.products.length}</div>}*!/*/}
            {/*    /!*<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">*!/*/}
            {/*    /!*  <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*!/*/}
            {/*    /!*</svg>*!/*/}
            {/*    /!*{basket.products.length > 0 && <div*!/*/}
            {/*    /!*  className={s.header__top__right__link__price}>{`${basket.totalPrice-basket.discountedPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;</div>}*!/*/}
            {/*  </Link>*/}
            {/*</div>*/}
            <div className={s.header__top__right__link}>
              {false ? <Link href={'/profile'}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                    stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link> : <div onClick={()=>{
                setShowAuth(true)
                document.body.classList.toggle('no-scroll', showAuth);
              }} className={s.header__top__right__link__svg}>
                <svg width="35" height="35" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_11_163)">
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
          >
            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1H17.5M1.5 7H17.5M1.5 13H17.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Каталог
          </Button>
          <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder={'Поиск'} key={'s'} icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>} />
        </div>
      </div>
      <div className={s.headerMenu__container}>
        <animated.div className={classNames(s.headerMenu__animated)} style={expand__left}>
          <div ref={ref} className={classNames(s.headerMenu, {[s.headerMenu_active]: profile.headerShow})}>
            <div ref={refMenuLeft} className={s.headerMenu__left}>
              <div className={s.headerMenu__left__space}></div>
              {data.map((el: any) => {
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
                  <svg style={{transition: 'all .3s linear', transform: menuContentShow === el.Level4ID ? 'rotate(90deg)' : 'rotate(-90deg)'}} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L17 1" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>)
              })}
              <div className={s.headerMenu__left__space}></div>
            </div>
            <animated.div className={classNames(s.headerMenu__right__animated)} style={expand__right}>
              <div ref={refMenuRight} className={s.headerMenu__right}>
                {menuContent.map((el)=>{
                  return <div className={s.headerMenu__right__lvl1_container}>
                    <div key={el.Level3ID} className={s.headerMenu__right__lvl1}>
                      <Text no_td type={'link'} onClick={() => {
                        setMenuContentShow(0)
                        setTimeout(()=>{
                          setMenuContent([])
                        },300)
                        dispatch(setHeader(false))
                      }} href={`/catalog?Level3=${el.Level3ID}`} colored>
                        {el.Level3Name}
                      </Text>
                    </div>
                    <div className={s.headerMenu__right__lvl2_container}>
                      {el.Level2.map((elem: any) => {
                        return <Text no_td onClick={() => {
                          setMenuContentShow(0)
                          setTimeout(()=>{
                            setMenuContent([])
                          },300)
                          dispatch(setHeader(false))
                        }} type={'link'} href={`/catalog?Level2=${elem.Level2ID}`} key={elem.Level2ID} className={s.headerMenu__right__lvl2}>
                          {elem.Level2Name}
                        </Text>
                      })}
                    </div>
                  </div>
                })}
              </div>
            </animated.div>
          </div>
        </animated.div>
      </div>
    </>
  )
};

export default Header;
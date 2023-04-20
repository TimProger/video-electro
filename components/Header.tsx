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

interface IHeaderProps {
}


const Header: React.FC<IHeaderProps> = () => {
  const { pathname } = useRouter();

  const favs = useTypedSelector(state => state.favs)

  const [searchValue, setSearchValue] = useState('')
  const [showAuth, setShowAuth] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const ref = useOnclickOutside((e: any) => {
    if(e.target.classList && e.target.classList.length > 0 && (e.target.classList[1] === s.header__bottom__btn || e.target.parentElement.classList[1] === s.header__bottom__btn)) return
    setShowMenu(false)
  });

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [refMenu, { height }] = useMeasure<HTMLDivElement>();

  const expand = useSpring({
    config: {
      friction: showMenu ? 15 : 30,
      tension: showMenu ? 200 : 300
    },
    height: showMenu ? `${contentHeight}px` : '0px',
    overflow: 'hidden'
  });

  useEffect(() => {
    setContentHeight(height);

    window.addEventListener("resize", ()=>setContentHeight(height));

    return window.removeEventListener("resize", ()=>setContentHeight(height));
  }, [height, showMenu]);

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
            <div className={classNames(s.header__top__right__link, {[s.header__top__right__link__active]: pathname === '/basket'})}>
              <Link href={'/basket'}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className={s.header__top__right__link}>
              {false ? <Link href={'/profile'}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.39969 3.66667H25L22.3333 13H6.83562M23.6667 18.3333H7.66667L5 1H1M9 23.6667C9 24.403 8.40305 25 7.66667 25C6.93029 25 6.33333 24.403 6.33333 23.6667C6.33333 22.9303 6.93029 22.3333 7.66667 22.3333C8.40305 22.3333 9 22.9303 9 23.6667ZM23.6667 23.6667C23.6667 24.403 23.0697 25 22.3333 25C21.597 25 21 24.403 21 23.6667C21 22.9303 21.597 22.3333 22.3333 22.3333C23.0697 22.3333 23.6667 22.9303 23.6667 23.6667Z"
                    stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link> : <div onClick={()=>setShowAuth(true)} className={s.header__top__right__link__svg}>
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
                  onClick={()=>setShowMenu(prev => !prev)}
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
      <animated.div className={classNames(s.headerMenu__animated)} style={expand}>
        <div ref={refMenu} className={classNames(s.headerMenu, {[s.headerMenu_active]: showMenu})}>
          <div ref={ref} className={s.headerMenu__left}>
            <div className={s.headerMenu__left__space}></div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__item}>Кабельно-проводниковая продукция</div>
            <div className={s.headerMenu__left__item}>Высоковольтное оборудование</div>
            <div className={s.headerMenu__left__space}></div>
          </div>
        </div>
      </animated.div>
    </>
  )
};

export default Header;
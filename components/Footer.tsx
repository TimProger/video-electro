import React from 'react';
import s from '@/styles/components/Footer.module.scss'
import Text from "@/components/UI/Text";
import {useRouter} from "next/router";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setAuthShow} from "@/store/Slices/Profile.slice";

interface IHeaderProps {
}

const Footer: React.FC<IHeaderProps> = () => {

  const { pathname, query } = useRouter()

  const profile = useTypedSelector(state => state.profile)

  const dispatch = useAppDispatch()

  return (
    <div className={s.footer}>
      <div className={s.footer__top}>
        <div className={s.footer__top__left}>
          <Text type={'link'} no_td={true} href={'/'} bold size={'bigger'}>Video-<Text bold type={'span'} size={'bigger'} colored={true}>Electro</Text></Text>
        </div>
        <div className={s.footer__top__right}>
          <div className={s.footer__top__right__links}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Text type={'link'} no_td={true} href={'/'} colored={pathname === "/"}>Главная</Text>
                  </td>
                  <td>
                    {profile.isAuth
                      ? <Text type={'link'}
                              no_td={true}
                              href={"/profile?page=1"}
                              colored={pathname === "/profile" && (query.page === "1" || !query.page)}>Профиль</Text>
                      : <Text
                        onClick={(e) => {
                          if(!profile.isAuth){
                            if(e) e.preventDefault()
                            dispatch(setAuthShow(true))
                          }
                        }}>Профиль</Text>}
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/faq'} colored={pathname === "/faq"}>Вопросы и ответы</Text>
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/coop'} colored={pathname === "/coop"}>Сотрудничество</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text type={'link'} no_td={true} href={'/catalog'} colored={pathname === "/catalog"}>Каталог</Text>
                  </td>
                  <td>
                    {profile.isAuth
                      ? <Text type={'link'}
                              no_td={true}
                              href={"/profile?page=2"}
                              colored={pathname === "/profile" && query.page === "2"}>Заказы</Text>
                      : <Text
                          onClick={(e) => {
                            if(!profile.isAuth){
                              if(e) e.preventDefault()
                              dispatch(setAuthShow(true))
                            }
                          }}>Заказы</Text>}
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/recovery'} colored={pathname === "/recovery"}>Возврат и обмен</Text>
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/contacts'} colored={pathname === "/contacts"}>Контакты</Text>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Text type={'link'} no_td={true} href={'/about'} colored={pathname === "/about"}>О нас</Text>
                  </td>
                  <td>
                    {profile.isAuth
                      ? <Text
                          type={'link'}
                          no_td={true}
                          href={'/profile?page=3'}
                          colored={pathname === "/profile" && query.page === "3"}>Компания</Text>
                      : <Text
                          onClick={(e) => {
                            if(!profile.isAuth){
                              if(e) e.preventDefault()
                              dispatch(setAuthShow(true))
                            }
                          }}>Компания</Text>}
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/delivery'} colored={pathname === "/delivery"}>Доставка</Text>
                  </td>
                  <td>
                    <Text type={'link'} no_td={true} href={'/policy'} colored={pathname === "/policy"}>Политика</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={s.footer__bottom}>
        <Text>Video-Electro 2023 | Все права защищены</Text>
      </div>
    </div>
  )
};

export default Footer;
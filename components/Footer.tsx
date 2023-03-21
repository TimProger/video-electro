import React from 'react';
import s from '@/styles/components/Footer.module.scss'
import Text from "@/components/UI/Text";
import {useRouter} from "next/router";

interface IHeaderProps {
}

const Footer: React.FC<IHeaderProps> = () => {

  const { pathname } = useRouter()

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
                    <Text type={'link'} no_td={true} href={'/profile'} colored={pathname === "/profile"}>Профиль</Text>
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
                    <Text type={'link'} no_td={true} href={'/orders'} colored={pathname === "/orders"}>Заказы</Text>
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
                    <Text type={'link'} no_td={true} href={'/company'} colored={pathname === "/company"}>Компания</Text>
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
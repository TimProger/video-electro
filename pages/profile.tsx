import { GetStaticProps } from 'next'
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Text from "@/components/UI/Text";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Profile.module.scss'
import classNames from "classnames";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setHeader, setImage, setUser} from "@/store/Slices/Profile.slice";
import {useRouter} from "next/router";
import {Storage} from "@/utils/storage";
import {$api, API_BASE_URL} from "@/http/axios";
import img from '@/public/images/Icon.png'
import Link from 'next/link';
import Checkbox from '@/components/UI/Checkbox';

interface IProfileProps {
}

interface IFormErrors {
  company: [boolean, string];
  phone: [boolean, string];
  inn: [boolean, string];
  address: [boolean, string];
  infoEmail: [boolean, string];
  infoPhone: [boolean, string];
}

interface IUserEdit {
  email: boolean;
  phone: boolean;
}

const Profile: React.FC<IProfileProps> = () => {

  const {user, headerShow} = useTypedSelector(state => state.profile)
  const dispatch = useAppDispatch()
  const {push, query} = useRouter()

  const [activeOrders, setActiveOrders] = useState<any[]>([])

  useEffect(()=>{
    if(typeof window !== undefined){
      if(!Storage.get('accessToken')){
        push('/')
      }else{
        if(user){
          setInfoEmail(user.email)
          let phoneLen = user.phone.toString().length
          let number = user.phone.toString().substring(phoneLen-10, 11)

          let formattedPhone: string = ''

          formattedPhone += `+7 ` + number.substring(0, 3);
          formattedPhone += ' ' + number.substring(3, 6);
          formattedPhone += ' ' + number.substring(6, 8);
          formattedPhone += ' ' + number.substring(8, 10);

          setInfoPhone(formattedPhone);

          setActiveOrders([])
          $api.get(`/order/my_orders/`)
            .then((res)=>{
              // setOrders(res.data)
              res.data.map((el: any) => {
                $api.get(`/order/my_orders/${el.id}`)
                  .then(res => {
                    activeOrders.push(res.data)
                    setActiveOrders([...activeOrders])
                  })
                  .catch(() => {})
              })

            })
        }
      }
    }
  },[user])

  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setPage(query.page ? +`${query.page}` : 1)
  },[query])

  const [errors, setErrors] = useState<IFormErrors>({
    company: [false, ''],
    phone: [false, ''],
    inn: [false, ''],
    address: [false, ''],
    infoEmail: [false, ''],
    infoPhone: [false, '']
  })

  const [edit, setEdit] = useState<IUserEdit>({
    email: false,
    phone: false,
  })

  const [urCompany, setUrCompany] = useState<string>('')
  const [urPhone, setUrPhone] = useState<string>('')
  const [urINN, setUrINN] = useState<string>('')
  const [urAddress, setUrAddress] = useState<string>('')
  const [infoEmail, setInfoEmail] = useState<string>('')
  const [infoPhone, setInfoPhone] = useState<string>('+7 ')

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoEmail(e.target.value)
    errors.infoEmail = [false, '']
  }

  const onChangeInfoPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneVal = e.target.value.replace(/\D/g, ""),
      formattedPhone = `+7 `

    if(!phoneVal){
      setInfoPhone(formattedPhone)
    }

    if (phoneVal.length > 1) {
      formattedPhone += '' + phoneVal.substring(1, 4);
    }

    if (phoneVal.length >= 5) {
      formattedPhone += ' ' + phoneVal.substring(4, 7);
    }

    if (phoneVal.length >= 8) {
      formattedPhone += ' ' + phoneVal.substring(7, 9);
    }

    if (phoneVal.length >= 10) {
      formattedPhone += ' ' + phoneVal.substring(9, 11);
    }

    if(formattedPhone === infoPhone) return
    setInfoPhone(formattedPhone)
    errors.infoPhone = [false, '']
  }

  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrCompany(e.target.value)
    errors.company = [false, '']
  }

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "")
    if(val.length > 20) return
    setUrPhone(val)
    errors.phone = [false, '']
  }

  const onChangeINN = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "")
    if(val.length > 10) return
    setUrINN(val)
    errors.inn = [false, '']
  }

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrAddress(e.target.value)
    errors.address = [false, '']
  }

  const onSubmit = () => {
    if(urCompany.length <= 1){
      errors.company = [true, 'Введите корректное название компании']
    }
    if(urPhone.length < 10){
      errors.phone = [true, 'Введите корректный номер телефона']
    }
    if(urINN.length <= 8){
      errors.inn = [true, 'Введите корректный ИНН/КПП']
    }
    if(urAddress.length <= 10){
      errors.address = [true, 'Введите корректный адрес']
    }
    setErrors(JSON.parse(JSON.stringify(errors)))
    if(errors.company[1].length > 0
      || errors.phone[1].length > 0
      || errors.inn[1].length > 0
      || errors.address[1].length > 0) return
  }

  const onEdit = (type: 'email' | 'phone') => {
    switch (type){
      case "email":
        setEdit((prevBody) => {
          return {
            ...prevBody,
            email: !prevBody.email
          };
        });
        break
      case "phone":
        setEdit((prevBody) => {
          return {
            ...prevBody,
            phone: !prevBody.phone
          };
        });
        break
    }
  }

  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(edit.email){
      ref1.current?.focus()
    }
    if(edit.phone){
      ref2.current?.focus()
    }
  },[edit])


  const changeFile = (e: ChangeEvent) => {
    const data = new FormData()
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;

    if(!files[0]){
      return
    }

    dispatch(setImage(files[0]))

    if(files[0]){
      data.append('user_image', files[0]);
    }
    $api.patch('/profile/', data)
      .then(()=>{
      })
  }

  function addLeadingZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  const [showProducts, setShowProducts] = useState<boolean>(false)
  const [showProductsArray, setShowProductsArray] = useState<{
    count: number;
    id: number;
    money: string;
    product: any;
  }[]>([])

  const [reviewArray, setReviewArray] = useState<string[]>([])
  const [reviewCheckboxArray, setReviewCheckboxArray] = useState<boolean[]>([])
  const [reviewChange, setReviewChange] = useState<boolean[]>([])

  useEffect(() => {
    if(!!showProductsArray.length){
      setReviewArray(showProductsArray.map(_ => ''))
      setReviewCheckboxArray(showProductsArray.map(_ => false))
      setReviewCheckboxArray(showProductsArray.map(_ => false))
    }
  }, [showProductsArray])
  
  const displayPages = () => {
    switch (page) {
      case 1:
        if(!user) return
        return <div className={s.page__user}>
          <div className={s.page__user__info}>
            <label title="&nbsp;" className={s.page__user__info__image} htmlFor="profileImgInput">
              <img src={user?.user_image ? (typeof user.user_image !== 'string' ? URL.createObjectURL(user.user_image) : `${API_BASE_URL}${user?.user_image}`) : ``} alt={''} />
              <div className={s.page__user__info__image__hover}>
                <img src={`${img.src}`} alt="camera"/>
              </div>
              <input title="&nbsp;" accept="image/*" id='profileImgInput' className={s.page__user__info__image__input} type='file' onChange={changeFile} />
            </label>
            <div className={s.page__user__info__right}>
              <Text type={'h2'} size={'big+'}>{user.first_name} {user.last_name} {user.middle_name}</Text>
            </div>
          </div>
          <div className={s.page__user__form}>
            <div className={s.page__user__form__input}>
              <Text size={'small'} type={'p'}>Email</Text>
              <Input ref2={ref1}
                     value={infoEmail}
                     error={errors.infoEmail[0]}
                     onChange={(e)=>onChangeEmail(e)}
                     placeholder={'video-electro@mail.ru'}
                     full
                     disabled={!edit.email}
                     onClickEdit={() => onEdit('email')}
                     key={'email'} />
              {errors.infoEmail[1].length > 0 && <Text error={errors.infoEmail[0]}>{errors.infoEmail[1]}</Text>}
            </div>
            <div className={s.page__user__form__input}>
              <Text size={'small'} type={'p'}>Телефон</Text>
              <Input ref2={ref2}
                     value={infoPhone}
                     error={errors.infoPhone[0]}
                     onChange={(e)=>onChangeInfoPhone(e)}
                     placeholder={'+7 999 001 20 80'}
                     full
                     disabled={!edit.phone}
                     onClickEdit={() => onEdit('phone')}
                     key={'email'} />
              {errors.infoPhone[1].length > 0 && <Text error={errors.infoPhone[0]}>{errors.infoPhone[1]}</Text>}
            </div>
          </div>
          <div className={s.page__user__password}>
            <Button size={'small'}>
              Изменить пароль
            </Button>
            <Text size={'smaller'} className={s.page__user__password__text}>На ваш Email будет отправлена ссылка, для изменения пароля.</Text>
          </div>
        </div>
      case 2:
        return <div className={s.page__orders}>
          {activeOrders.length > 0 ? showProducts ?
            <div className={s.page__orders__products}>
              <Text type='h2' size='big+'>Оставьте отзыв</Text>
              <Text className={s.page__orders__products__back} onClick={() => {
                setShowProducts(false)
                setShowProductsArray([])
              }} colored>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> Назад к заказам
              </Text>
              <div className={s.page__orders__products__list}>
                {showProductsArray.map((el, index) => {
                  return <div key={index} className={s.page__orders__products__list__item}>
                    <Link href={`/product/${el.product.id}`}
                        onClick={()=>{
                          Storage.set('prevPage', `${window.location.pathname}${window.location.search}`)
                        }}
                    >
                      <div className={s.page__orders__products__list__item__img}>
                        <img src={el.product.image ? el.product.image : el.product.imageUrl} alt={el.product.ProductName}/>
                      </div>
                    </Link>
                    <div className={s.page__orders__products__list__item__info}>
                      <div className={s.page__orders__products__list__item__info__mainInfo}>
                        <Text>{el.product.ProductName}</Text>
                        {+el.money !== null && el.product.discount && <Text type={'span'} className={s.cardLong__content__bottom__price__old} size={'small'}>
                          {`${el.product.discount/(+(+el.money).toFixed(2))*100}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#8381;
                        </Text>}
                        {+el.money !== null ? <Text bold colored={true} size={'medium'}>
                          {`${el.product.discount ? +(+el.money).toFixed(2) - el.product.discount : `${(+el.money).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`} &#8381;
                        </Text> : <Text bold colored={true} size={'medium'}>
                          По договорённости
                        </Text>}
                      </div>
                      {reviewChange[index] && <Text>Введите отзыв</Text>}
                      {reviewChange[index] ? <Input key={'review' + index} placeholder='Введите текст' type='textarea' value={reviewArray[index]} onChange={(e) => {
                          reviewArray[index] = e.target.value
                          setReviewArray([...reviewArray])
                      }} /> : <Text>{reviewArray[index]}</Text>}
                      {reviewChange[index] && <Checkbox label='Анонимный отзыв' isChecked={reviewCheckboxArray[index]} onChange={() => {
                         reviewCheckboxArray[index] = !reviewCheckboxArray[index]
                         setReviewCheckboxArray([...reviewCheckboxArray])
                      }} />}
                      {reviewChange[index] ? <Button size='medium' onClick={() => {
                        reviewChange[index] = false
                        setReviewChange([...reviewChange])
                      }}>Отправить</Button> : <Button size='medium' onClick={() => {
                        reviewChange[index] = true
                        setReviewChange([...reviewChange])
                      }}>Редактировать</Button>}
                    </div>
                  </div>
                })}
              </div>
            </div>
          : <div className={s.page__orders__list__container}>
            <Text type='h2' size='big+'>Активные</Text>
            <div className={s.page__orders__list}>
              {activeOrders.map((el: any) => {
                const date = new Date(el.order.data_order)
                const date2 = new Date();
                date2.setDate(date2.getDate() + 6);
                return <div className={s.page__orders__list__box}>
                  <div className={s.page__orders__list__topBlock}>
                    <Text bold>Заказ: {el.order.PaymentId}</Text>
                    <Text className={s.page__orders__list__gray}>{`${addLeadingZero(date.getDate()+1)}.${addLeadingZero(date.getMonth()+1)}.${date.getFullYear()}`} {`${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`}</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Заказ оптовый:</Text>
                    <Text>Да</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Договор:</Text>
                    <Text>Ожидается</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Имя администратора:</Text>
                    <Text>Иван Викторович</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Сообщение администратора:</Text>
                    <Text>Здравствуйте! Ожидаем оплату и свяжемся с вами!</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Контакт администратора:</Text>
                    <Text>+7 999 011 58 60</Text>
                  </div>
                  <div className={s.page__orders__list__block}>
                    <Text>Ориентировочная дата доставки:</Text>
                    <Text>{`${addLeadingZero(date2.getDate()+1)}.${addLeadingZero(date2.getMonth()+1)}.${date2.getFullYear()}`}</Text>
                  </div>
                  <div className={s.page__orders__list__bottomBlock}>
                    <div className={s.page__orders__list__bottomBlock__left}>
                      <Button onClick={() => {
                        setShowProducts(true)
                        setShowProductsArray(el.order_list)
                      }} size='medium'>Посмотреть товары</Button>
                      <Button style='outlined' onClick={() => {
                        $api.get(`/order/pay_order/${el.order.id}`)
                          .then((res1) => {
                            window.location.href = res1.data.url
                          })
                          .catch((_res) => {
                            // console.log(res)
                          })
                      }} size='medium'>Оплатить заказ</Button>
                    </div>
                    <div className={s.page__orders__list__bottomBlock__right}>
                      <div className={s.page__orders__list__bottomBlock__right__price}>
                        <Text bold>Товары ({el.order_list.length})</Text>
                        <Text size='medium' bold colored>{el.order.sum} &#8381;</Text>
                      </div>
                      <div>
                        <Text colored>Оплата подтверждена</Text>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div> : <div className={s.page__orders__none}>
            <Text size={'small'} type={'p'}>У вас нет заказов</Text>
            <Button size={'medium'} className={'btn_'} onClick={() => {
              dispatch(setHeader(!headerShow))
            }}>В каталог</Button>
          </div> }
        </div>
      case 3:
        return <div className={s.page__info}>
          <Text size={'big+'} type={'h2'}>Юридическое лицо</Text>
          <Text className={s.page__info__text} size={'smaller'}>Добавьте информацию о вашей компании, чтобы проводить оплату через кор. счет и полноценно сотрудничить с Video-Electro.</Text>
          <div className={s.page__info__form}>
            <div className={s.page__info__form__input}>
              <Text size={'small'} type={'p'}>Название компании</Text>
              <Input value={urCompany}
                     error={errors.company[0]}
                     onChange={(e)=>onChangeCompany(e)}
                     placeholder={'Компания'}
                     full
                     key={'company'} />
              {errors.company[1].length > 0 && <Text error={errors.company[0]}>{errors.company[1]}</Text>}
            </div>
            <div className={s.page__info__form__input}>
              <Text size={'small'} type={'p'}>Контактный телефон</Text>
              <Input value={urPhone}
                     error={errors.phone[0]}
                     onChange={(e)=>onChangePhone(e)}
                     placeholder={'Телефон'}
                     full
                     key={'phone'} />
              {errors.phone[1].length > 0 && <Text error={errors.phone[0]}>{errors.phone[1]}</Text>}
            </div>
            <div className={s.page__info__form__input}>
              <Text size={'small'} type={'p'}>ИНН/КПП</Text>
              <Input value={urINN}
                     error={errors.inn[0]}
                     onChange={(e)=>onChangeINN(e)}
                     placeholder={'ИНН или КПП'}
                     full
                     key={'inn'} />
              {errors.inn[1].length > 0 && <Text error={errors.inn[0]}>{errors.inn[1]}</Text>}
            </div>
            <div className={s.page__info__form__input}>
              <Text size={'small'} type={'p'}>Юридический адрес</Text>
              <Input value={urAddress}
                     error={errors.address[0]}
                     onChange={(e)=>onChangeAddress(e)}
                     placeholder={'Адрес'}
                     full
                     key={'address'} />
              {errors.address[1].length > 0 && <Text error={errors.address[0]}>{errors.address[1]}</Text>}
            </div>
            <Text className={s.page__info__form__text} size={'smaller'}>Мы проверим данные в реестре и изменим ваш статус с физического на юридическое лицо.</Text>
          </div>
          {(errors.company[1].length > 0
            || errors.phone[1].length > 0
            || errors.inn[1].length > 0
            || errors.address[0]) ? <Button error={true} size={'bigger'} onClick={() => onSubmit()} full>
            Ошибка
          </Button> : <Button size={'bigger'} onClick={() => onSubmit()} full>
            Сохранить
          </Button>}
        </div>
      default:
        return;
    }
  }

  const exitHandler = () => {
    dispatch(setUser(null))
    Storage.delete('accessToken')
    push('/')
  }

  const {width} = useTypedSelector(state => state.profile)

  const displayPagesNew = () => {
    switch(page){
      case 1: 
        return (<div onClick={() => push('/profile?page=1')} className={classNames(s.profile__pages_new__page)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 17C5.47273 14.7178 7.53167 13 10 13C12.4683 13 14.5273 14.7178 15 17M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Text size={'small'}>Личная информация</Text>
        </div>)
      case 2: 
        return (<div onClick={() => push('/profile?page=2')} className={classNames(s.profile__pages_new__page)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 11.0006H7M5 7.00059H11M5 15.0006H7M14 19.0006H16.5M11 15.0006H11.01M11 11.0006H11.01M15 19.0006H5.8C4.11984 19.0006 3.27976 19.0006 2.63803 18.6736C2.07354 18.386 1.6146 17.9271 1.32698 17.3626C1 16.7208 1 15.8807 1 14.2006V3.75768C1 2.85229 1 2.39959 1.1902 2.13707C1.35611 1.90807 1.61123 1.76002 1.89237 1.72958C2.21467 1.69469 2.60772 1.91929 3.39382 2.36849L3.70618 2.54698C3.99552 2.71232 4.14019 2.79499 4.29383 2.82736C4.42978 2.856 4.57022 2.856 4.70617 2.82736C4.85981 2.79499 5.00448 2.71232 5.29382 2.54698L7.20618 1.45421C7.49552 1.28887 7.64019 1.2062 7.79383 1.17383C7.92978 1.14518 8.07022 1.14518 8.20617 1.17383C8.35981 1.2062 8.50448 1.28887 8.79382 1.45421L10.7062 2.54698C10.9955 2.71231 11.1402 2.79499 11.2938 2.82736C11.4298 2.856 11.5702 2.856 11.7062 2.82736C11.8598 2.79499 12.0045 2.71231 12.2938 2.54698L12.6062 2.36849C13.3923 1.91929 13.7853 1.69469 14.1076 1.72958C14.3888 1.76002 14.6439 1.90807 14.8098 2.13707C15 2.39959 15 2.85229 15 3.75768V12.0006M15 11.0006H19V17.0006C19 18.1052 18.1046 19.0006 17 19.0006C15.8954 19.0006 15 18.1052 15 17.0006V11.0006Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <Text size={'small'}>Заказы</Text>
      </div>)
      case 3: 
        return (<div onClick={() => push('/profile?page=3')} className={classNames(s.profile__pages_new__page)}>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V14.2C15 15.8802 15 16.7202 14.673 17.362C14.3854 17.9265 13.9265 18.3854 13.362 18.673C12.7202 19 11.8802 19 10.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 16C6 14.8954 6.89543 14 8 14C9.10457 14 10 14.8954 10 16V19H6V16Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11V10H11V11H10Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 11V10H6V11H5Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 6V5H6V6H5Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 6V5H11V6H10Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Text size={'small'}>Юридическое лицо</Text>
        </div>)
      default: 
        return <div></div>
    }
  }

  return (
    <Layout>
      <Head>
        <title>Профиль | Video-Electro</title>
        <meta name={"og:title"} content={"Профиль | Video-Electro"} />
      </Head>
        <Container>
          {width === 'mobile' && <div className={s.profile__pages_new}>
            <svg className={classNames(s.svg, {[s.profile__pages_new__svg_disabled]: page === 1})}  onClick={() => push(`/profile?page=${page>1?page-1:1}`)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="chevron-left">
                <path id="Icon" d="M20 8L12 16L20 24" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
            <div>
              {displayPagesNew()}
            </div>
            <svg className={classNames(s.svg, {[s.profile__pages_new__svg_disabled]: page === 3})} onClick={() => push(`/profile?page=${page<3?page+1:3}`)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="chevron-left">
                <path id="Icon" d="M12 24L20 16L12 8" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </div>}
          <div className={s.profile}>
            <div className={classNames(s.profile__content, {[s.profile__content__noBG]: showProducts})}>
            {width !== 'mobile' && !showProducts && <div className={s.profile__pages}>
                <><div onClick={() => push('/profile?page=1')} className={classNames(s.profile__pages__page, {[s.profile__pages__page_active]: page === 1})}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 17C5.47273 14.7178 7.53167 13 10 13C12.4683 13 14.5273 14.7178 15 17M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text size={'small'}>Личная информация</Text>
                </div>
                <div onClick={() => push('/profile?page=2')} className={classNames(s.profile__pages__page, {[s.profile__pages__page_active]: page === 2})}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 11.0006H7M5 7.00059H11M5 15.0006H7M14 19.0006H16.5M11 15.0006H11.01M11 11.0006H11.01M15 19.0006H5.8C4.11984 19.0006 3.27976 19.0006 2.63803 18.6736C2.07354 18.386 1.6146 17.9271 1.32698 17.3626C1 16.7208 1 15.8807 1 14.2006V3.75768C1 2.85229 1 2.39959 1.1902 2.13707C1.35611 1.90807 1.61123 1.76002 1.89237 1.72958C2.21467 1.69469 2.60772 1.91929 3.39382 2.36849L3.70618 2.54698C3.99552 2.71232 4.14019 2.79499 4.29383 2.82736C4.42978 2.856 4.57022 2.856 4.70617 2.82736C4.85981 2.79499 5.00448 2.71232 5.29382 2.54698L7.20618 1.45421C7.49552 1.28887 7.64019 1.2062 7.79383 1.17383C7.92978 1.14518 8.07022 1.14518 8.20617 1.17383C8.35981 1.2062 8.50448 1.28887 8.79382 1.45421L10.7062 2.54698C10.9955 2.71231 11.1402 2.79499 11.2938 2.82736C11.4298 2.856 11.5702 2.856 11.7062 2.82736C11.8598 2.79499 12.0045 2.71231 12.2938 2.54698L12.6062 2.36849C13.3923 1.91929 13.7853 1.69469 14.1076 1.72958C14.3888 1.76002 14.6439 1.90807 14.8098 2.13707C15 2.39959 15 2.85229 15 3.75768V12.0006M15 11.0006H19V17.0006C19 18.1052 18.1046 19.0006 17 19.0006C15.8954 19.0006 15 18.1052 15 17.0006V11.0006Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text size={'small'}>Заказы</Text>
                </div>
                <div onClick={() => push('/profile?page=3')} className={classNames(s.profile__pages__page, {[s.profile__pages__page_active]: page === 3})}>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10.2C11.8802 1 12.7202 1 13.362 1.32698C13.9265 1.6146 14.3854 2.07354 14.673 2.63803C15 3.27976 15 4.11984 15 5.8V14.2C15 15.8802 15 16.7202 14.673 17.362C14.3854 17.9265 13.9265 18.3854 13.362 18.673C12.7202 19 11.8802 19 10.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 16C6 14.8954 6.89543 14 8 14C9.10457 14 10 14.8954 10 16V19H6V16Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11V10H11V11H10Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 11V10H6V11H5Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 6V5H6V6H5Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 6V5H11V6H10Z" stroke="#898989FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text size={'small'}>Юридическое лицо</Text>
                </div></>
                <div onClick={() => exitHandler()} className={classNames(s.profile__pages__page, s.profile__pages__exit)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H10M15 14L19 10M19 10L15 6M19 10H9" stroke="#F95B5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text size={'small'}>Выйти из аккаунта</Text>
                </div>
              </div>}
              <div className={s.profile__page}>
                <div className={s.page}>
                  {displayPages()}
                </div>
              </div>
            </div>
          </div>
        </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      
    },
    revalidate: 10,
  }
}

export default Profile
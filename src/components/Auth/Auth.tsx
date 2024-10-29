import React, {useState} from 'react';
import s from './Auth.module.scss'
import Modal from "@/components/UI/Modal/Modal";
import Text from "@/components/UI/Text/Text";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
import Checkbox from "@/components/UI/Checkbox/Checkbox";
import AuthService from "@/http/auth.service";
import {Storage} from "@/utils/storage";
import classNames from "classnames";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setAuthShow, setUser} from "@/store/Slices/Profile.slice";

interface IAuthProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

interface IAuthErrors {
  auth: {
    phone: [boolean, string];
    password: [boolean, string];
    code: [boolean, string];
  },
  reg: {
    name: [boolean, string];
    email: [boolean, string];
    phone: [boolean, string];
    password: [boolean, string];
    password_repeat: [boolean, string];
    confirmation: [boolean, string];
    code: [boolean, string];
  }
}

interface IAuthBody {
  auth: {
    phone: string;
    password: string;
    code: string;
  },
  reg: {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_repeat: string;
    confirmation: boolean;
    code: string;
  }
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const Auth: React.FC<IAuthProps> = ({
                                      show,
                                      setShow,
                                    }) => {

  const [errors, setErrors] = useState<IAuthErrors>({
    auth: {
      phone: [false, ''],
      password: [false, ''],
      code: [false, '']
    },
    reg: {
      name: [false, ''],
      email: [false, ''],
      phone: [false, ''],
      password: [false, ''],
      password_repeat: [false, ''],
      confirmation: [false, ''],
      code: [false, ''],
    }
  })

  const [body, setBody] = useState<IAuthBody>({
    auth: {
      phone: '+7 ',
      password: '',
      code: ''
    },
    reg: {
      name: '',
      email: '',
      phone: '+7 ',
      password: '',
      password_repeat: '',
      confirmation: false,
      code: ''
    }
  })

  const [type, setType] = useState<'authorization' | 'registration'>('authorization')

  const onChangeType = (type: 'authorization' | 'registration') => {
    setType(type)
    setPage(1)
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prevBody) => {
      return {
        ...prevBody,
        reg: {
          ...prevBody.reg,
          name: e.target.value,
        },
      };
    });
    errors.reg.name = [false, '']
    setErrors(JSON.parse(JSON.stringify(errors)))
  }

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>,
                         type: 'authorization' | 'registration') => {
    let phoneVal = e.target.value.replace(/\D/g, ""),
      formattedPhone = `+7 `

    if(!phoneVal){
      switch (type) {
        case "authorization":
          setBody((prevBody) => {
            return {
              ...prevBody,
              reg: {
                ...prevBody.reg,
                phone: '+7 ',
              },
            };
          });
          break
        case "registration":
          setBody((prevBody) => {
            return {
              ...prevBody,
              reg: {
                ...prevBody.reg,
                phone: '+7 ',
              },
            };
          });
          break
      }
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


    switch (type){
      case "authorization":
        if(formattedPhone === body.auth.phone) return
        setBody((prevBody) => {
          return {
            ...prevBody,
            auth: {
              ...prevBody.auth,
              phone: formattedPhone,
            },
          };
        });
        errors.auth.phone = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
      case "registration":
        if(formattedPhone === body.reg.phone) return
        setBody((prevBody) => {
          return {
            ...prevBody,
            reg: {
              ...prevBody.reg,
              phone: formattedPhone,
            },
          };
        });
        errors.reg.phone = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
    }
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prevBody) => {
      return {
        ...prevBody,
        reg: {
          ...prevBody.reg,
          email: e.target.value,
        },
      };
    });
    errors.reg.email = [false, '']
    setErrors(JSON.parse(JSON.stringify(errors)))
  }

  const [passwordSecure, setPasswordSecure] = useState<{
    text:  'Плохая' | 'Слабая' | 'Нормальная' | 'Хорошая';
    level: number;
  }>({
    text: 'Плохая',
    level: 0
  })

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>,
                            type: 'authorization' | 'registration') => {
    switch (type){
      case "authorization":
        setBody((prevBody) => {
          return {
            ...prevBody,
            auth: {
              ...prevBody.auth,
              password: e.target.value,
            },
          };
        });
        errors.auth.phone = [false, '']
        errors.auth.password = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
      case "registration":
        let secure = 0
        if(/\d/.test(e.target.value)){
          secure += 1
        }
        if(/[A-Z]/.test(e.target.value) && /[a-z]/.test(e.target.value)){
          secure += 1
        }
        if(/[!@#$%^&*(),.?":{}|<>_]/.test(e.target.value) || e.target.value.length > 7){
          secure += 1
        }
        switch (secure){
          case 0:
            setPasswordSecure({
              text: 'Плохая',
              level: 0
            })
            break;
          case 1:
            setPasswordSecure({
              text: 'Слабая',
              level: 1
            })
            break;
          case 2:
            setPasswordSecure({
              text: 'Нормальная',
              level: 2
            })
            break;
          case 3:
            setPasswordSecure({
              text: 'Хорошая',
              level: 3
            })
            break;
        }
        setBody((prevBody) => {
          return {
            ...prevBody,
            reg: {
              ...prevBody.reg,
              password: e.target.value,
            },
          };
        });
        errors.reg.password = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
    }
  }

  const onChangePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody((prevBody) => {
      return {
        ...prevBody,
        reg: {
          ...prevBody.reg,
          password_repeat: e.target.value,
        },
      };
    });
    errors.reg.password_repeat = [false, '']
    setErrors(JSON.parse(JSON.stringify(errors)))
  }

  const onChangeConfirmation = () => {
    setBody((prevBody) => {
      return {
        ...prevBody,
        reg: {
          ...prevBody.reg,
          confirmation: !prevBody.reg.confirmation,
        },
      };
    });
    errors.reg.confirmation = [false, '']
    setErrors(JSON.parse(JSON.stringify(errors)))
  }

  const [page, setPage] = useState<1 | 2>(1)

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>,
                            type: 'authorization' | 'registration') => {
    let codeVal = e.target.value.replace(/\D/g, "")
    switch (type){
      case "authorization":
        setBody((prevBody) => {
          return {
            ...prevBody,
            auth: {
              ...prevBody.auth,
              code: codeVal.length > 4 ? prevBody.auth.code : e.target.value.replace(/\s/g, '').split('').join(' '),
            },
          };
        });
        errors.auth.code = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
      case "registration":
        setBody((prevBody) => {
          return {
            ...prevBody,
            reg: {
              ...prevBody.reg,
              code: codeVal.length > 4 ? prevBody.reg.code : e.target.value.replace(/\s/g, '').split('').join(' '),
            },
          };
        });
        errors.reg.code = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
    }
  }

  const onSubmit = (type: 'authorization' | 'registration') => {
    let phone = ''
    switch (type){
      case "authorization":
        if(body.auth.phone.length < 16){
          errors.auth.phone = [true, 'Введите корректный номер телефона']
        }
        if(body.auth.password.length <= 1){
          errors.auth.password = [true, 'Введите корректный пароль']
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
        if(errors.auth.phone[1].length > 0 || errors.auth.password[1].length > 0) return
        phone = body.auth.phone.replace(/\s/g, '').replace(/\+/, '')
        AuthService.jwt(`7${phone.slice(1, phone.length)}`, body.auth.password)
          .then((res) => {
            // @ts-ignore
            Storage.set('accessToken', `Bearer ${res.data.access_token}`)
            AuthService.getProfile()
              .then((res ) => {
                // @ts-ignore
                dispatch(setUser(res.data))
                dispatch(setAuthShow(false))
                push('/profile')
              })
          })
          .catch(() => {
            errors.auth.phone = [true, 'Неверные учетные данные']
            setErrors(JSON.parse(JSON.stringify(errors)))
          })
        break;
      case "registration":
        if(body.reg.name.length <= 1){
          errors.reg.name = [true, 'Введите корректное ФИО']
        }
        if(!validEmailRegex.test(body.reg.email)){
          errors.reg.email = [true, 'Введите корректный Email']
        }
        if(body.reg.phone.length < 16){
          errors.reg.phone = [true, 'Введите корректный номер телефона']
        }
        if(body.reg.password.length <= 1){
          errors.reg.password = [true, 'Введите корректный пароль']
        }
        if(body.reg.password_repeat !== body.reg.password){
          errors.reg.password_repeat = [true, 'Пароли не совпадают']
        }
        if(body.reg.password_repeat.length <= 1){
          errors.reg.password_repeat = [true, 'Слишком короткий пароль']
        }
        if(!body.reg.confirmation){
          errors.reg.confirmation = [true, 'Подтвердите данный пункт']
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
        if(errors.reg.name[1].length > 0
        || errors.reg.email[1].length > 0
        || errors.reg.phone[1].length > 0
        || errors.reg.password[1].length > 0
        || errors.reg.password_repeat[1].length > 0
        || errors.reg.confirmation[1].length > 0) return
        phone = body.reg.phone.replace(/\s/g, '').replace(/\+/, '')
        AuthService.confirm_phone(`7${phone.slice(1, phone.length)}`)
          .then(() => {
            setPage(2)
          })
          .catch(() => {
            setPage(1)
            setErrors(JSON.parse(JSON.stringify(errors)))
          })
        break;
    }
  }

  const {push} = useRouter()

  const dispatch = useAppDispatch()

  const onSumbitConfirm = (type: 'authorization' | 'registration') => {
    let phone = ''
    switch (type){
      case "authorization":
        phone = body.auth.phone.replace(/\s/g, '').replace(/\+/, '')
        AuthService.jwt(`7${phone.slice(1, phone.length)}`, body.auth.password)
          .then((res) => {
            // @ts-ignore
            Storage.set('accessToken', `Bearer ${res.data.access_token}`)
            AuthService.getProfile()
              .then((res ) => {
                // @ts-ignore
                dispatch(setUser(res.data))
                push('/profile')
              })
              .catch(() => {
              })
          })
          .catch(() => {
            errors.auth.code = [true, 'Неверный номер телефона или пароль']
            setErrors(JSON.parse(JSON.stringify(errors)))
          })
        break;
      case "registration":
        const names = body.reg.name.split(' ')
        phone = body.reg.phone.replace(/\s/g, '').replace(/\+/, '')
        AuthService.createProfile(body.reg.code.replace(/\s/g, ''), `7${phone.slice(1, phone.length)}`, names[0], names[1], names[2], body.reg.email, body.reg.password)
          .then((res ) => {
            // @ts-ignore
            Storage.set('accessToken', `Bearer ${res.data.access_token}`)
            AuthService.getProfile()
              .then((res) => {
                // @ts-ignore
                dispatch(setUser(res.data))
                dispatch(setAuthShow(false))
                push('/profile')
              })
          })
          .catch((res) => {
            if(res.data.detail === 'Такой пользователь уже существует'){
              errors.reg.phone = [true, 'Пользователь с указанным номером телефона уже существует']
              setErrors(JSON.parse(JSON.stringify(errors)))
              setPage(1)
            }
          })
        break;
    }
  }

  const displayPages = () => {
    switch (type) {
      case "authorization":
        if(page === 1) {
          return (
            <div className={s.authorization}>
              <div className={s.authorization__header}>
                <div className={s.authorization__header__title}>
                  <Text size={'big+'} type={'h2'}>Авторизация</Text>
                  <Button onClick={() => onChangeType('registration')}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7H13M7 1V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Создать аккаунт</Button>
                </div>
                <Text className={s.authorization__header__text}>Рады вас видеть! Авторизуйтесь, чтобы получить больше возможностей на сайте Video-Electro.</Text>
              </div>
              <div className={s.authorization__inputs}>
                <Text size={'small'} type={'p'}>Введите номер телефона</Text>
                <Input value={body.auth.phone}
                       error={errors.auth.phone[0]}
                       onChange={(e) => onChangePhone(e, 'authorization')}
                       full
                       placeholder={'Email'}
                       key={'email'} />
                {errors.auth.phone[1].length > 0 && <Text error={errors.auth.phone[0]}>{errors.auth.phone[1]}</Text>}
              </div>
              <div className={s.authorization__inputs}>
                <Text size={'small'} type={'p'}>Введите пароль</Text>
                <Input value={body.auth.password}
                       type={'password'}
                       error={errors.auth.password[0]}
                       onChange={(e) => onChangePassword(e, 'authorization')}
                       full
                       placeholder={'Пароль'}
                       key={'password'} />
                {errors.auth.password[1].length > 0 && <Text error={errors.auth.password[0]}>{errors.auth.password[1]}</Text>}
              </div>
              <Button error={errors.auth.phone[1].length > 0
                || errors.auth.password[1].length > 0}
                      size={'bigger'} onClick={() => onSubmit('authorization')} full>
                Авторизоваться
              </Button>
            </div>
          )
        }else if(page === 2){
          return <div className={s.authorizationConfirm}>
            <Text onClick={() => setPage(1)} className={s.registrationConfirm__back}>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад</Text>
            <Text size={'big+'} type={'h2'}>Подтвердите телефон</Text>
            <Text className={s.authorizationConfirm__text} size={'small'}>На ваш телефон <Text type={'span'} colored>({body.auth.phone})</Text> поступит звонок. Введите последние 4 цифры номера.</Text>
            <div className={s.authorizationConfirm__input}>
              <Text size={'small'} type={'p'}>Введите код, отправленный на указанный номер</Text>
              <Input value={body.auth.code}
                     error={errors.auth.code[0]}
                     onChange={(e) => onChangeCode(e, 'authorization')}
                     full
                     placeholder={'Код'}
                     key={'code'} />
              {errors.auth.code[1].length > 0 && <Text error={errors.auth.code[0]}>{errors.auth.code[1]}</Text>}
            </div>
            <Button error={errors.auth.code[1].length > 0}
                    size={'bigger'} onClick={() => onSumbitConfirm('authorization')} full>
              Подтвердить код
            </Button>
          </div>
        }else{
          return <div>daw</div>
        }
      case "registration":
        if(page === 1){
          return (
            <div className={s.registration}>
              <div className={s.registration__header}>
                <div className={s.registration__header__title}>
                  <Text size={'big+'} type={'h2'}>Регистрация</Text>
                  <Button onClick={() => onChangeType('authorization')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 17C5.47273 14.7178 7.53167 13 10 13C12.4683 13 14.5273 14.7178 15 17M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Войти</Button>
                </div>
                <Text className={s.registration__header__text}>Рады вас видеть! Авторизуйтесь, чтобы получить больше возможностей на сайте Video-Electro.</Text>
              </div>
              <div className={s.registration__inputs}>
                <Text size={'small'} type={'p'}>Введите ФИО</Text>
                <Input value={body.reg.name}
                       error={errors.reg.name[0]}
                       onChange={onChangeName}
                       full
                       placeholder={'Иванов Иван Иванович'}
                       key={'name'} />
                {errors.reg.name[1].length > 0 && <Text error={errors.reg.name[0]}>{errors.reg.name[1]}</Text>}
              </div>
              <div className={s.registration__inputs}>
                <Text size={'small'} type={'p'}>Введите Email</Text>
                <Input value={body.reg.email}
                       error={errors.reg.email[0]}
                       onChange={(e) => onChangeEmail(e)}
                       full
                       placeholder={'video-electro@mail.ru'}
                       key={'email'} />
                {errors.reg.email[1].length > 0 && <Text error={errors.reg.email[0]}>{errors.reg.email[1]}</Text>}
              </div>
              <div className={s.registration__inputs}>
                <Text size={'small'} type={'p'}>Введите телефон</Text>
                <Input value={body.reg.phone}
                       error={errors.reg.phone[0]}
                       onChange={(e) => onChangePhone(e, 'registration')}
                       full
                       placeholder={'+7 999 000 00 01'}
                       key={'phone'} />
                {errors.reg.phone[1].length > 0 && <Text error={errors.reg.phone[0]}>{errors.reg.phone[1]}</Text>}
              </div>
              <div className={s.registration__inputs}>
                <Text size={'small'} type={'p'}>Придумайте пароль</Text>
                <Input value={body.reg.password}
                       error={errors.reg.password[0]}
                       onChange={(e) => onChangePassword(e, 'registration')}
                       full
                       placeholder={'Пароль'}
                       type={'password'}
                       key={'password'} />
                <div className={s.registration__inputs__password__text}>
                  <svg className={classNames(s.registration__inputs__svg, {[s.registration__inputs__svg_active]: passwordSecure.level > 1})} width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.61111L5.92308 12.5L17 1.5" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text colored={passwordSecure.level > 1}>{passwordSecure.text} защита</Text>
                </div>
                <div className={s.registration__inputs__password__text}>
                  <svg className={classNames(s.registration__inputs__svg, {[s.registration__inputs__svg_active]: body.reg.password.length > 7 && /[A-Z]/.test(body.reg.password)})} width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10L6 15L17 4M3 4.88889L6.07692 8L13 1" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Text colored={body.reg.password.length > 7 && /[A-Z]/.test(body.reg.password)}>8 символов, заглавные буквы</Text>
                </div>
                {errors.reg.password[1].length > 0 && <Text error={errors.reg.password[0]}>{errors.reg.password[1]}</Text>}
              </div>
              <div className={s.registration__inputs}>
                <Text size={'small'} type={'p'}>Повторите пароль</Text>
                <Input value={body.reg.password_repeat}
                       error={errors.reg.password_repeat[0]}
                       onChange={(e) => onChangePasswordRepeat(e)}
                       full
                       placeholder={'Пароль'}
                       type={'password'}
                       key={'password_repeat'} />
                {errors.reg.password_repeat[1].length > 0 && <Text error={errors.reg.password_repeat[0]}>{errors.reg.password_repeat[1]}</Text>}
              </div>
              <div className={s.registration__inputs}>
                <Checkbox onChange={()=>onChangeConfirmation()}
                          isChecked={body.reg.confirmation}
                          error={errors.reg.confirmation[0]}
                          label={'Согласен с политикой конфиденциальности'} />
              </div>
              <Button error={errors.reg.name[1].length > 0
                || errors.reg.email[1].length > 0
                || errors.reg.phone[1].length > 0
                || errors.reg.password[1].length > 0
                || errors.reg.password_repeat[1].length > 0
                || errors.reg.confirmation[0]} size={'bigger'} onClick={() => onSubmit('registration')} full>
                Создать аккаунт
              </Button>
            </div>
          )
        }else if(page === 2){
          return <div className={s.registrationConfirm}>
            <Text onClick={() => setPage(1)} className={s.registrationConfirm__back}>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад</Text>
            <Text size={'big+'} type={'h2'}>Подтвердите телефон</Text>
            <div className={s.registrationConfirm__input}>
              <Text className={s.registrationConfirm__text} size={'small'}>На ваш телефон <Text type={'span'} colored>({body.reg.phone})</Text> поступит звонок. Введите последние 4 цифры номера.</Text>
              <Input value={body.reg.code}
                     error={errors.reg.code[0]}
                     onChange={(e) => onChangeCode(e, 'registration')}
                     full
                     placeholder={'Код'}
                     key={'code'} />
              {errors.reg.code[1].length > 0 && <Text error={errors.reg.code[0]}>{errors.reg.code[1]}</Text>}
            </div>
            <Button error={errors.reg.code[1].length > 0}
                    size={'bigger'} onClick={() => onSumbitConfirm('registration')} full>
              Подтвердить код
            </Button>
          </div>
        }else{
          return <div></div>
        }
      default:
        return (
          <div>s</div>
        )
    }
  }

  return (
    <Modal showModal={show} closeHandler={() => setShow(false)}>
      {displayPages()}
    </Modal>
  )
};

export default Auth;
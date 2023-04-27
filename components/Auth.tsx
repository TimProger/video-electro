import React, {useState} from 'react';
import s from '@/styles/components/Auth.module.scss'
import Modal from "@/components/UI/Modal";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Checkbox from "@/components/UI/Checkbox";

interface IAuthProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

interface IAuthErrors {
  auth: {
    email: [boolean, string];
    password: [boolean, string];
  },
  reg: {
    name: [boolean, string];
    email: [boolean, string];
    phone: [boolean, string];
    password: [boolean, string];
    password_repeat: [boolean, string];
    confirmation: [boolean, string];
  }
}

interface IAuthBody {
  auth: {
    email: string;
    password: string;
  },
  reg: {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_repeat: string;
    confirmation: boolean;
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
      email: [false, ''],
      password: [false, '']
    },
    reg: {
      name: [false, ''],
      email: [false, ''],
      phone: [false, ''],
      password: [false, ''],
      password_repeat: [false, ''],
      confirmation: [false, '']
    }
  })

  const [body, setBody] = useState<IAuthBody>({
    auth: {
      email: '',
      password: ''
    },
    reg: {
      name: '',
      email: '',
      phone: '+7 ',
      password: '',
      password_repeat: '',
      confirmation: false
    }
  })

  const [type, setType] = useState<'authorization' | 'registration'>('authorization')

  const onChangeType = (type: 'authorization' | 'registration') => {
    setType(type)
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

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneVal = e.target.value.replace(/\D/g, ""),
      formattedPhone = `+7 `

    if(!phoneVal){
      setBody((prevBody) => {
        return {
          ...prevBody,
          reg: {
            ...prevBody.reg,
            phone: '+7',
          },
        };
      });
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
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>,
                             type: 'authorization' | 'registration') => {
    switch (type){
      case "authorization":
        setBody((prevBody) => {
          return {
            ...prevBody,
            auth: {
              ...prevBody.auth,
              email: e.target.value,
            },
          };
        });
        errors.auth.email = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
      case "registration":
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
        break;
    }
  }

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
        errors.auth.password = [false, '']
        setErrors(JSON.parse(JSON.stringify(errors)))
        break;
      case "registration":
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
    errors.auth.email = [false, '']
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

  const onSubmit = (type: 'authorization' | 'registration') => {
    switch (type){
      case "authorization":
        if(!validEmailRegex.test(body.auth.email)){
          errors.auth.email = [true, 'Введите корректный Email']
        }
        if(body.auth.password.length <= 1){
          errors.auth.password = [true, 'Введите корректный пароль']
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
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
        break;
    }
  }

  const displayPages = () => {
    switch (type) {
      case "authorization":
        return (
          <div className={s.authorization}>
            <div className={s.authorization__header}>
              <div className={s.authorization__header__title}>
                <Text size={'big+'} type={'h2'}>Авторизация</Text>
                <Button onClick={() => onChangeType('registration')}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H13M7 1V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Создать аккаунт</Button>
              </div>
              <Text className={s.authorization__header__text}>Рады вас видеть! Авторизуйтесь, чтобы получить больше возможностей на сайте Video-Electro.</Text>
            </div>
            <div className={s.authorization__inputs}>
              <Text size={'small'} type={'p'}>Введите Email</Text>
              <Input value={body.auth.email}
                     error={errors.auth.email[0]}
                     onChange={(e) => onChangeEmail(e, 'authorization')}
                     full
                     placeholder={'Email'}
                     key={'email'} />
            </div>
            <div className={s.authorization__inputs}>
              <Text size={'small'} type={'p'}>Введите пароль</Text>
              <Input value={body.auth.password}
                     error={errors.auth.password[0]}
                     onChange={(e) => onChangePassword(e, 'authorization')}
                     full
                     placeholder={'Пароль'}
                     key={'password'} />
            </div>
            <Button size={'bigger'} onClick={() => onSubmit('authorization')} full>
              Авторизоваться
            </Button>
          </div>
        )
      case "registration":
        return (
          <div className={s.registration}>
            <div className={s.registration__header}>
              <div className={s.registration__header__title}>
                <Text size={'big+'} type={'h2'}>Регистрация</Text>
                <Button onClick={() => onChangeType('authorization')}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 17C5.47273 14.7178 7.53167 13 10 13C12.4683 13 14.5273 14.7178 15 17M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM12 8C12 9.10457 11.1046 10 10 10C8.89543 10 8 9.10457 8 8C8 6.89543 8.89543 6 10 6C11.1046 6 12 6.89543 12 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
            </div>
            <div className={s.registration__inputs}>
              <Text size={'small'} type={'p'}>Введите Email</Text>
              <Input value={body.reg.email}
                     error={errors.reg.email[0]}
                     onChange={(e) => onChangeEmail(e, 'registration')}
                     full
                     placeholder={'video-electro@mail.ru'}
                     key={'email'} />
            </div>
            <div className={s.registration__inputs}>
              <Text size={'small'} type={'p'}>Введите телефон</Text>
              <Input value={body.reg.phone}
                     error={errors.reg.phone[0]}
                     onChange={onChangePhone}
                     full
                     placeholder={'+7 999 000 00 01'}
                     key={'phone'} />
            </div>
            <div className={s.registration__inputs}>
              <Text size={'small'} type={'p'}>Придумайте пароль</Text>
              <Input value={body.reg.password}
                     error={errors.reg.password[0]}
                     onChange={(e) => onChangePassword(e, 'registration')}
                     full
                     placeholder={'Пароль'}
                     key={'password'} />
            </div>
            <div className={s.registration__inputs}>
              <Text size={'small'} type={'p'}>Повторите пароль</Text>
              <Input value={body.reg.password_repeat}
                     error={errors.reg.password_repeat[0]}
                     onChange={(e) => onChangePasswordRepeat(e)}
                     full
                     placeholder={'Пароль'}
                     key={'password_repeat'} />
            </div>
            <div className={s.registration__inputs}>
              <Checkbox onChange={()=>onChangeConfirmation()}
                        isChecked={body.reg.confirmation}
                        error={errors.reg.confirmation[0]}
                        label={'Согласен с политикой конфиденциальности'} />
            </div>
            <Button size={'bigger'} onClick={() => onSubmit('registration')} full>
              Создать аккаунт
            </Button>
          </div>
        )
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
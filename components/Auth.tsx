import React, {useState} from 'react';
import s from '@/styles/components/Auth.module.scss'
import Modal from "@/components/UI/Modal";
import Text from "@/components/UI/Text";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

interface IAuthProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

const Auth: React.FC<IAuthProps> = ({
                                      show,
                                      setShow,
                                    }) => {

  const [errors, setErrors] = useState<{
    login: boolean;
    phone: boolean;
  }>({
    login: false,
    phone: false
  })

  const [login, setLogin] = useState<string>('')

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
    errors.login = false
  }

  const onSubmitLogin = () => {
    if(login.length <= 1){
      errors.login = true
    }
    setErrors(JSON.parse(JSON.stringify(errors)))
  }

  return (
    <Modal showModal={show} closeHandler={() => setShow(false)}>
      <div className={s.auth}>
        <div className={s.auth__header}>
          <div className={s.auth__header__title}>
            <Text size={'big'} type={'h2'}>Авторизация</Text>
            <Button>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M7 1V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Создать аккаунт</Button>
          </div>
          <Text className={s.auth__header__text}>Рады вас видеть! Авторизуйтесь, чтобы получить больше возможностей на сайте Video-Electro.</Text>
        </div>
        <div className={s.auth__inputs}>
          <Text size={'small'} type={'p'}>Введите Email или телефон</Text>
          <Input value={login}
                 error={errors.login}
                 onChange={onChangeLogin}
                 full
                 placeholder={'Email или телефон'}
                 key={'login'} />
        </div>
        <div className={s.auth__inputs}>
          <Text size={'small'} type={'p'}>Введите пароль</Text>
          <Input value={login}
                 error={errors.login}
                 onChange={onChangeLogin}
                 full
                 placeholder={'Пароль'}
                 key={'password'} />
        </div>
        <Button size={'bigger'} onClick={onSubmitLogin} full>
          Авторизоваться
        </Button>
      </div>
    </Modal>
  )
};

export default Auth;
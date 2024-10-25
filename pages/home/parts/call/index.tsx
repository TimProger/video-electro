import React, { useState } from 'react'
import Text from "@/components/UI/Text/Text";
import Button from "@/components/UI/Button/Button";
import s from './styles.module.scss'
import Input from '@/components/UI/Input/Input';

interface ICallProps {
}

interface IFormErrors {
    name: [boolean, string];
    phone: [boolean, string];
}

const Call: React.FC<ICallProps> = ({}) => {

    const [errors, setErrors] = useState<IFormErrors>({
        name: [false, ''],
        phone: [false, '']
    })
    const [callName, setCallName] = useState<string>('')
    const [callPhone, setCallPhone] = useState<string>('+7')

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCallName(e.target.value)
        errors.name = [false, '']
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let phoneVal = e.target.value.replace(/\D/g, ""),
            formattedPhone = `+7 `

        if(!phoneVal){
            setCallPhone('+7');
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

        setCallPhone(formattedPhone);
        errors.phone = [false, '']
        }

        const onSubmitCall = () => {
        if(callName.length <= 1){
            errors.name = [true, 'Введите корректное имя']
        }
        if(callPhone.length < 16){
            errors.phone = [true, 'Введите корректный номер телефона']
        }
        setErrors(JSON.parse(JSON.stringify(errors)))
    }

    return <div className={s.call}>
    <div className={s.call__left}>
      <Text size={'bigger'} type={'h2'}>Заказать звонок</Text>
      <Text size={'small'} type={'p'}>Если у вас остались вопросы, либо вы хотите сотрудничать с компанией Video-Electro - закажите обратный звонок. Укажите своё имя и номер телефона в полях для ввода справа.</Text>
    </div>
    <div className={s.call__right}>
      <div className={s.call__right__input}>
        <Text size={'small'} type={'p'}>Ваше имя</Text>
        <Input value={callName}
               className={s.call__right__input__component}
               error={errors.name[0]}
               onChange={(e)=>onChangeName(e)}
               placeholder={'Иван'}
               icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M7 19H1C1 15.134 4.13401 12 8 12C8.69497 12 9.36629 12.1013 10 12.2899M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5ZM11 19L13.025 18.595C13.2015 18.5597 13.2898 18.542 13.3721 18.5097C13.4452 18.4811 13.5147 18.4439 13.579 18.399C13.6516 18.3484 13.7152 18.2848 13.8426 18.1574L18 14C18.5523 13.4477 18.5523 12.5523 18 12C17.4477 11.4477 16.5523 11.4477 16 12L11.8426 16.1574C11.7152 16.2848 11.6516 16.3484 11.601 16.421C11.5561 16.4853 11.5189 16.5548 11.4903 16.6279C11.458 16.7102 11.4403 16.7985 11.405 16.975L11 19Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>}
               key={'name'} />
        {errors.name[1].length > 0 && <Text error={errors.name[0]}>{errors.name[1]}</Text>}
      </div>
      <div className={s.call__right__input}>
        <Text size={'small'} type={'p'}>Ваш телефон</Text>
        <Input value={callPhone}
               className={s.call__right__input__component}
               error={errors.phone[0]}
               onChange={(e)=>onChangePhone(e)}
               placeholder={'+7'}
               icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M1 3.5C1 12.0604 7.93959 19 16.5 19C16.8862 19 17.2691 18.9859 17.6483 18.9581C18.0834 18.9262 18.3009 18.9103 18.499 18.7963C18.663 18.7019 18.8185 18.5345 18.9007 18.364C19 18.1582 19 17.9181 19 17.438V14.6207C19 14.2169 19 14.015 18.9335 13.842C18.8749 13.6891 18.7795 13.553 18.6559 13.4456C18.516 13.324 18.3262 13.255 17.9468 13.117L14.74 11.9509C14.2985 11.7904 14.0777 11.7101 13.8683 11.7237C13.6836 11.7357 13.5059 11.7988 13.3549 11.9058C13.1837 12.0271 13.0629 12.2285 12.8212 12.6314L12 14C9.35014 12.7999 7.2019 10.6489 6 8L7.36863 7.17882C7.77145 6.93713 7.97286 6.81628 8.09423 6.64506C8.20125 6.49408 8.26427 6.31637 8.27629 6.1317C8.28992 5.92227 8.20965 5.70153 8.04911 5.26005L6.88299 2.05321C6.745 1.67376 6.67601 1.48403 6.55442 1.3441C6.44701 1.22049 6.31089 1.12515 6.15802 1.06645C5.98496 1 5.78308 1 5.37932 1H2.56201C2.08188 1 1.84181 1 1.63598 1.09925C1.4655 1.18146 1.29814 1.33701 1.2037 1.50103C1.08968 1.69907 1.07375 1.91662 1.04189 2.35173C1.01413 2.73086 1 3.11378 1 3.5Z" stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>}
               key={'phone'} />
        {errors.phone[1].length > 0 && <Text error={errors.phone[0]}>{errors.phone[1]}</Text>}
      </div>
      <Button onClick={onSubmitCall} size={'bigger'}>Заказать звонок</Button>
    </div>
  </div>
}

export default Call
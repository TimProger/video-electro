import React from 'react';
import s from '@/styles/components/UI/Input.module.scss'
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

export interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  className?: string;
  type?: 'text' | 'textarea' | 'number';
  error?: boolean;
  min?: number;
  max?: number;
  placeholder: string;
  key: any;
  disabled?: boolean;
  onClickEdit?: () => void;
  full?: boolean;
  short?: boolean;
  medium?: boolean;
  icon?: React.ReactElement;
  ref2?: any;
}

const Input: React.FC<IInputProps> = ({
                                          value,
                                          onChange,
                                          className,
                                          type = 'text',
                                          error,
                                          min,
                                          max,
                                          placeholder,
                                          full,
                                          disabled,
                                          onClickEdit,
                                          short,
                                          medium,
                                          key,
                                          icon,
                                          ref2
                                        }) => {

  const ref = useOnclickOutside(() => {
    !disabled && onClickEdit && onClickEdit()
  });

  const cn = classNames(
    s.input,
    className,
    {[s.input_disabled]: disabled},
    {[s.input_short]: short},
    {[s.input_medium]: medium},
    {[s.input_full]: full},
    {[s.input_error]: error})

  switch (type){
    case 'text':
      return (
        <div className={cn}
             ref={ref}>
          <div className={s.input__icon}>
            {icon}
          </div>
          {disabled ? <div className={s.input_input}>
            {value.length > 0 ? value : placeholder}
          </div> : <input
            ref={ref2}
            className={s.input_input}
            name={key}
            type={'text'}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
          />}
          {onClickEdit &&
            <svg className={s.input__edit} onClick={onClickEdit} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9998 3.99985L15.9998 7.99985M2.17654 18.7645L4.0997 18.3799C4.80597 18.2386 5.15911 18.168 5.4884 18.0388C5.78068 17.9242 6.05845 17.7755 6.31597 17.5959C6.6061 17.3936 6.86075 17.1389 7.37005 16.6296L17.8685 6.13122C18.2645 5.7352 18.4625 5.53719 18.5367 5.30887C18.6019 5.10802 18.6019 4.89168 18.5367 4.69083C18.4625 4.4625 18.2645 4.2645 17.8685 3.86848L16.1312 2.13122C15.7352 1.7352 15.5372 1.53719 15.3089 1.46301C15.108 1.39775 14.8917 1.39775 14.6908 1.46301C14.4625 1.53719 14.2645 1.7352 13.8685 2.13122L3.37005 12.6296C2.86075 13.1389 2.6061 13.3936 2.40376 13.6837C2.22416 13.9412 2.0755 14.219 1.96085 14.5113C1.83169 14.8406 1.76107 15.1937 1.61981 15.9L1.23518 17.8232C1.15649 18.2166 1.11715 18.4133 1.1752 18.5536C1.22595 18.6763 1.3234 18.7737 1.44607 18.8245C1.58638 18.8825 1.7831 18.8432 2.17654 18.7645Z" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          }
        </div>
      )
    case 'textarea':
      return (
        <div className={cn}
             ref={ref}>
          <div className={s.input__icon}>
            {icon}
          </div>
          {disabled ? <div className={s.input_input}>
            {value.length > 0 ? value : placeholder}
          </div> : <textarea
            ref={ref2}
            name={key}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
          />}
        </div>
      )
    case 'number':
      return (
        <div className={cn}
             ref={ref}>
          <div className={s.input__icon}>
            {icon}
          </div>
          {disabled ? <div className={s.input_input}>
            {value.length > 0 ? value : placeholder}
          </div> : <input
            ref={ref2}
            type={'number'}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
            min={min}
            max={max}
          />}
        </div>
      )
  }
};

export default Input;
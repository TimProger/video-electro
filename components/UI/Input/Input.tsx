import React, {useState} from 'react';
import s from './Input.module.scss'
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

export interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  className?: string;
  type?: 'text' | 'textarea' | 'number' | 'password';
  error?: boolean;
  min?: number;
  max?: number;
  placeholder: string;
  key: any;
  disabled?: boolean;
  onClick?: () => void;
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
                                          ref2,
                                          onClick
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

  const [passOpen, setPassOpen] = useState<boolean>(false)

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
            onClick={() => {
              onClick && onClick()
            }}
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
              <path d="M11.9998 3.99985L15.9998 7.99985M2.17654 18.7645L4.0997 18.3799C4.80597 18.2386 5.15911 18.168 5.4884 18.0388C5.78068 17.9242 6.05845 17.7755 6.31597 17.5959C6.6061 17.3936 6.86075 17.1389 7.37005 16.6296L17.8685 6.13122C18.2645 5.7352 18.4625 5.53719 18.5367 5.30887C18.6019 5.10802 18.6019 4.89168 18.5367 4.69083C18.4625 4.4625 18.2645 4.2645 17.8685 3.86848L16.1312 2.13122C15.7352 1.7352 15.5372 1.53719 15.3089 1.46301C15.108 1.39775 14.8917 1.39775 14.6908 1.46301C14.4625 1.53719 14.2645 1.7352 13.8685 2.13122L3.37005 12.6296C2.86075 13.1389 2.6061 13.3936 2.40376 13.6837C2.22416 13.9412 2.0755 14.219 1.96085 14.5113C1.83169 14.8406 1.76107 15.1937 1.61981 15.9L1.23518 17.8232C1.15649 18.2166 1.11715 18.4133 1.1752 18.5536C1.22595 18.6763 1.3234 18.7737 1.44607 18.8245C1.58638 18.8825 1.7831 18.8432 2.17654 18.7645Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        </div>
      )
    case 'password':
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
            type={passOpen ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
          />}
          {onClickEdit &&
            <svg className={s.input__edit} onClick={onClickEdit} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9998 3.99985L15.9998 7.99985M2.17654 18.7645L4.0997 18.3799C4.80597 18.2386 5.15911 18.168 5.4884 18.0388C5.78068 17.9242 6.05845 17.7755 6.31597 17.5959C6.6061 17.3936 6.86075 17.1389 7.37005 16.6296L17.8685 6.13122C18.2645 5.7352 18.4625 5.53719 18.5367 5.30887C18.6019 5.10802 18.6019 4.89168 18.5367 4.69083C18.4625 4.4625 18.2645 4.2645 17.8685 3.86848L16.1312 2.13122C15.7352 1.7352 15.5372 1.53719 15.3089 1.46301C15.108 1.39775 14.8917 1.39775 14.6908 1.46301C14.4625 1.53719 14.2645 1.7352 13.8685 2.13122L3.37005 12.6296C2.86075 13.1389 2.6061 13.3936 2.40376 13.6837C2.22416 13.9412 2.0755 14.219 1.96085 14.5113C1.83169 14.8406 1.76107 15.1937 1.61981 15.9L1.23518 17.8232C1.15649 18.2166 1.11715 18.4133 1.1752 18.5536C1.22595 18.6763 1.3234 18.7737 1.44607 18.8245C1.58638 18.8825 1.7831 18.8432 2.17654 18.7645Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          {passOpen ? <svg onClick={() => setPassOpen(false)} className={s.input__eye} width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9998 8C13.9998 9.65685 12.6566 11 10.9998 11C9.3429 11 7.99976 9.65685 7.99976 8C7.99976 6.34315 9.3429 5 10.9998 5C12.6566 5 13.9998 6.34315 13.9998 8Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.0002 1C6.52257 1 2.73228 3.94288 1.45801 7.99997C2.73226 12.0571 6.52256 15 11.0002 15C15.4778 15 19.2681 12.0571 20.5424 8.00004C19.2681 3.94291 15.4778 1 11.0002 1Z" stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            : <svg onClick={() => setPassOpen(true)} className={s.input__eye} width="22" height="20" viewBox="0 0 22 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 1L20 19M8.84428 7.91364C8.32164 8.45355 8 9.18921 8 10C8 11.6569 9.34315 13 11 13C11.8225 13 12.5677 12.669 13.1096 12.133M5.5 4.64715C3.60069 5.90034 2.15403 7.78394 1.45801 9.99997C2.73226 14.0571 6.52256 17 11.0002 17C12.9891 17 14.8424 16.4194 16.3998 15.4184M10 3.04939C10.329 3.01673 10.6626 3 11.0002 3C15.4778 3 19.2681 5.94291 20.5424 10C20.2616 10.894 19.8587 11.7338 19.3532 12.5"
              stroke="#5B74F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>}
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
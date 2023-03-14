import React from 'react';
import s from '@/styles/components/Input.module.scss'
import classNames from "classnames";

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: 'text' | 'number';
  error?: boolean;
  min?: number;
  max?: number;
  placeholder: string;
  key: any;
  icon?: React.ReactElement
}

const Input: React.FC<IInputProps> = ({
                                          value,
                                          onChange,
                                          className,
                                          type,
                                          error,
                                          min,
                                          max,
                                          placeholder,
                                          key,
                                          icon,
                                        }) => {
  const cn = classNames(
    s.input,
    className,
    {[s.input__error]: error})
  switch (type){
    case 'text':
      return (
        <div className={cn}>
          <div className={s.input__icon}>
            {icon}
          </div>
          <input
            name={key}
            type={'text'}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
          />
        </div>
      )
    case 'number':
      return (
        <div className={cn}>
          <div className={s.input__icon}>
            {icon}
          </div>
          <input
            type={'number'}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
            min={min}
            max={max}
          />
        </div>
      )
    default:
      return (
        <div className={cn}>
          <div className={s.input__icon}>
            {icon}
          </div>
          <input
            name={key}
            type={'text'}
            value={value}
            onChange={(e)=>onChange(e)}
            placeholder={placeholder}
          />
        </div>
      )
  }
};

export default Input;
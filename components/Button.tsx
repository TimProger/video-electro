import React from 'react';
import Link from "next/link";
import s from '@/styles/components/Button.module.scss'
import classNames from "classnames";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'link' | 'btn';
  href?: string;
  disabled?: boolean;
  success?: boolean;
  style?: 'outlined' | 'filled';
  size?: 'big' | 'medium' | 'small';
}

const Button: React.FC<IButtonProps> = ({
                                          children,
                                          className,
                                          onClick,
                                          type = 'btn',
                                          href,
                                          disabled,
                                          success,
                                          style = 'filled',
                                          size = 'small',
                                        }) => {
  const cn = classNames(
    s.btn,
    className,
    {[s.btn__big]: size === 'big'},
    {[s.btn__medium]: size === 'medium'},
    {[s.btn__small]: size === 'small'},
    {[s.btn__outlined]: style === 'outlined'},
    {[s.btn__filled]: style === 'filled'},
    {[s.btn__disabled]: disabled},
    {[s.btn__success]: success})
  switch (type){
    case 'link':
      return (
        <Link
          href={href || '/'}
          className={cn}
        >
          {children}
        </Link>
      )
    case 'btn':
      return (
        <button
          disabled={disabled}
          onClick={()=>{
            if(onClick){
              if(!disabled){
                onClick()
              }
            }
          }}
          className={cn}
        >
          {children}
        </button>
      )
  }
};

export default Button;
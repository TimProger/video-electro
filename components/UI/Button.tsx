import React from 'react';
import Link from "next/link";
import s from '@/styles/components/UI/Button.module.scss'
import classNames from "classnames";
import {createRipple} from "@/utils/createRipple";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  key?: number | string | null;
  type?: 'link' | 'btn';
  href?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  full?: boolean;
  style?: 'outlined' | 'filled';
  size?: 'bigger' | 'big' | 'medium' | 'small';
  ripple?: boolean;
  external?: boolean;
  icon?: boolean;
}

const Button: React.FC<IButtonProps> = ({
                                          children,
                                          className,
                                          onClick,
                                          type = 'btn',
                                          href,
                                          disabled,
                                          error,
                                          success,
                                          full,
                                          style = 'filled',
                                          size = 'small',
                                          ripple = true,
                                          external,
                                          key = null,
                                          id = '',
                                          icon,
                                        }) => {
  const cn = classNames(
    s.btn,
    className,
    {[s.btn__bigger]: size === 'bigger'},
    {[s.btn__big]: size === 'big'},
    {[s.btn__medium]: size === 'medium'},
    {[s.btn__small]: size === 'small'},
    {[s.btn__outlined]: style === 'outlined'},
    {[s.btn__filled]: style === 'filled'},
    {[s.btn__disabled]: disabled},
    {[s.btn__error]: error},
    {[s.btn__success]: success},
    {[s.btn__icon]: icon},
    {[s.btn__full]: full})
  switch (type){
    case 'link':
      return (
        <Link
          id={id}
          key={key}
          href={href || '/d'}
          target={external ? '_blank' : ''}
          onMouseDown={ripple ? (e)=>{
            e.preventDefault()
            createRipple(s, e)
          } : () => null}
          onClick={() => onClick && onClick()}
          className={cn}
        >
          {children}
        </Link>
      )
    case 'btn':
      return (
        <button
          id={id}
          key={key}
          disabled={disabled}
          onMouseDown={ripple ? (e)=>{
            createRipple(s, e)
          } : () => null}
          onClick={() => onClick && onClick()}
          className={cn}
        >
          {children}
        </button>
      )
  }
};

export default Button;
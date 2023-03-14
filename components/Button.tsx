import React from 'react';
import Link from "next/link";
import s from '@/styles/components/Button.module.scss'
import classNames from "classnames";

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
  size?: 'big' | 'medium' | 'small';
  ripple?: boolean;
  external?: boolean;
}

function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget;

  const circle = document.createElement('span');
  circle.classList.add(s.ripple);

  const rect = button.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;
  const size = Math.max(rect.width, rect.height);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${offsetX - size/2}px`;
  circle.style.top = `${offsetY - size/2}px`;

  const ripple = button.getElementsByClassName(s.ripple)[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
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
    {[s.btn__error]: error},
    {[s.btn__success]: success},
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
            createRipple(e)
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
            createRipple(e)
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
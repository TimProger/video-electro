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
  style?: 'outlined' | 'filled';
  size?: 'big' | 'medium' | 'small';
  ripple?: boolean;
  external?: boolean;
}

function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add(s.ripple);

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
    {[s.btn__success]: success})
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
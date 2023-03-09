import React from 'react';
import s from '@/styles/components/Text.module.scss'
import classNames from "classnames";
import Link from "next/link";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  colored?: boolean;
  type?: 'p' | 'span' | 'link' | 'h1' | 'h2' | 'h3';
  size?: 'big' | 'medium' | 'small';
  external?: boolean;
}

const Text: React.FC<IButtonProps> = ({
                                          children,
                                          className,
                                          href,
                                          colored,
                                          type,
                                          size = 'small',
                                          external
                                        }) => {
  const cn = classNames(
    s.text,
    className,
    {[s.text__big]: size === 'big'},
    {[s.text__medium]: size === 'medium'},
    {[s.text__small]: size === 'small'},
    {[s.text__colored]: colored},
    {[s.text__link]: type === 'link'})
  switch (type){
    case 'p':
      return (
        <p
          className={cn}
        >
          {children}
        </p>
      )
    case 'span':
      return (
        <span
          className={cn}
        >
          {children}
        </span>
      )
    case 'link':
      return (
        <Link
          target={external ? '_blank' : ''}
          href={href || '/'}
          className={cn}
        >
          {children}
        </Link>
      )
    case 'h1':
      return (
        <h1
          className={cn}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          className={cn}
        >
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3
          className={cn}
        >
          {children}
        </h3>
      )
    default:
      return (
        <p
          className={cn}
        >
          {children}
        </p>
      )
  }
};

export default Text;
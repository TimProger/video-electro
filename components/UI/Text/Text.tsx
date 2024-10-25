import React from 'react';
import s from './Text.module.scss'
import classNames from "classnames";
import Link from "next/link";

export interface ITextProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  colored?: boolean;
  type?: 'p' | 'span' | 'link' | 'h1' | 'h2' | 'h3';
  size?: 'bigger' | 'big' | 'big+' | 'medium' | 'small' | 'smaller';
  external?: boolean;
  bold?: boolean;
  no_td?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  error?: boolean;
}

const Text: React.FC<ITextProps> = ({
                                          children,
                                          className,
                                          href,
                                          colored,
                                          type,
                                          size = 'small',
                                          external,
                                          bold,
                                          no_td,
                                          onClick,
                                          error = false,
                                        }) => {
  const cn = classNames(
    s.text,
    className,
    {[s.text_bigger]: size === 'bigger'},
    {[s.text_big]: size === 'big'},
    {[s.text_bigPlus]: size === 'big+'},
    {[s.text_medium]: size === 'medium'},
    {[s.text_small]: size === 'small'},
    {[s.text_smaller]: size === 'smaller'},
    {[s.text_colored]: colored},
    {[s.text_error]: error},
    {[s.text_bold]: bold},
    {[s.text_noTd]: no_td},
    {[s.text_link]: type === 'link'})
  switch (type){
    case 'p':
      return (
        <p
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </p>
      )
    case 'span':
      return (
        <span
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </span>
      )
    case 'link':
      return (
        <Link
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
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
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </h3>
      )
    default:
      return (
        <p
          onClick={() => {
            if(onClick){
              onClick()
            }
          }}
          className={cn}
        >
          {children}
        </p>
      )
  }
};

export default Text;
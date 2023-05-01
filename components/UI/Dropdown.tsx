import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from '@/styles/components/UI/Dropdown.module.scss'
import Text from "@/components/UI/Text";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";
import {useMeasure} from "react-use";
import {animated, useSpring} from "react-spring";

export interface IDropdownProps {
  title?: string;
  title_inside?: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  type?: 'block' | 'inside'
  onClick: () => void;
  setDropdowns: (Dispatch<SetStateAction<boolean[]>>)
}

const Dropdown: React.FC<IDropdownProps> = ({
                                              setDropdowns,
                                              title = '',
                                              title_inside,
                                              children,
                                              open,
                                              type = 'block',
                                              onClick}) => {

  const ref = useOnclickOutside((e: any) => {
    switch (type){
      case 'block':
        if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.dropdown__header || e.target.classList[1] === s.dropdown__header__text) return
        setDropdowns(prev => prev.map(_ => false))
        break;
      // case 'inside':
      //   if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.dropdown_inside__header || e.target.classList[1] === s.dropdown_inside__header__text) return
      //   setDropdowns(prev => prev.map(_ => false))
      //   break;
    }
  });

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [refText, { height }] = useMeasure<HTMLDivElement>();

  const expand = useSpring({
    config: type === 'block' ? { friction:  open ? 16 : 25} : {},
    height: open ? `${contentHeight}px` : '0px',
    overflow: 'hidden'
  });

  useEffect(() => {
    setContentHeight(height);

    window.addEventListener("resize", ()=>setContentHeight(height));

    return window.removeEventListener("resize", ()=>setContentHeight(height));
  }, [height, open]);


  switch (type){

    case 'block':
      return (
        <div ref={ref} className={classNames(s.dropdown, {[s.dropdown_active]: open})}>
          <div onClick={onClick} className={s.dropdown__header}>
            <Text className={s.dropdown__header__text} size={'medium'}>{title}</Text>
            <svg style={{transition: 'all .3s linear', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9L17 1" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <animated.div style={expand}>
            <div ref={refText} className={s.dropdown__text}>
              <Text>{children}</Text>
            </div>
          </animated.div>
        </div>
      );

    case 'inside':
      return (
        <div className={classNames(s.dropdown_inside, {[s.dropdown_inside_active]: open})}>
          <div onClick={onClick} className={s.dropdown_inside__header}>
            {title_inside}
            <svg className={classNames(s.dropdown_inside__header__svg, {[s.dropdown_inside_active__svg]: open})} style={{transition: 'all .3s linear', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 0.999999" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <animated.div style={expand}>
            <div ref={refText} className={s.dropdown_inside__text}>
              {children}
            </div>
          </animated.div>
        </div>
      );
  }
};

export default Dropdown;
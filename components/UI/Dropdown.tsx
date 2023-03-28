import React, {Dispatch, SetStateAction} from 'react';
import s from '@/styles/components/UI/Dropdown.module.scss'
import Text from "@/components/UI/Text";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

interface IDropdownProps {
  title: string;
  text: string;
  open: boolean;
  onClick: () => void;
  setDropdowns: (Dispatch<SetStateAction<boolean[]>>)
}

const Dropdown: React.FC<IDropdownProps> = ({setDropdowns, title, text, open, onClick}) => {

  const ref = useOnclickOutside((e: any) => {
    if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.dropdown__header) return
    setDropdowns(prev => prev.map(_ => false))
  });

  return (
    <div ref={ref} className={classNames(s.dropdown, {[s.dropdown__active]: open})}>
      <div onClick={onClick} className={s.dropdown__header}>
        <Text size={'medium'}>{title}</Text>
        <svg style={{transition: 'all .3s linear', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L9 9L17 1" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div className={classNames(s.dropdown__text, {[s.dropdown__text__active]: open})}>
        <Text>{text}</Text>
      </div>
    </div>
  );
};

export default Dropdown;
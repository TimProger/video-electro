import React, {useState} from 'react';
import s from '@/styles/components/UI/Select.module.scss'
import Text from "@/components/UI/Text";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";

export interface ISelectProps {
  value: string;
  values: string[];
  onClick: (value: string) => void;
  sort?: boolean;
}

const Select: React.FC<ISelectProps> = ({sort, value, values, onClick}) => {

  const [open, setOpen] = useState<boolean>(false)

  const ref = useOnclickOutside((e: any) => {
    if(e.target.classList && e.target.classList.length > 0 && e.target.classList[0] === s.dropdown__header) return
    setOpen(false)
  });

  return (
    <div ref={ref} className={classNames(s.select, {[s.select_active]: open})}>
      <div onClick={()=>setOpen(prev => !prev)} className={s.select__value}>
        <Text size={'small'}>{sort ? `${value.charAt(0).toUpperCase() + value.slice(1)}` : value}</Text>
        <svg style={{transition: 'all .3s linear', transform: open ? 'rotate(180deg)' : 'rotate(0deg)'}} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L9 9L17 1" stroke="#5B74F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div className={classNames(s.select__values, {[s.select__values_active]: open})}>
        <div className={s.select__values__space}></div>
        {values.map((el)=>{
          return <div onClick={()=>{
            onClick(el)
            setOpen(false)
          }} className={classNames(s.select__values__block, {[s.select__values__block_active]: el === value})}>
            <Text>{sort ? `По ${el}` : el}</Text>
          </div>
        })}
        <div className={s.select__values__space}></div>
      </div>
    </div>
  );
};

export default Select;
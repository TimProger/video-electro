import React, {useState} from 'react';
import s from '@/styles/components/UI/Checkbox.module.scss'
import classNames from "classnames";

export interface ICheckboxProps {
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
  className?: string;
  placeholder: string;
  icon?: React.ReactElement
}

const Checkbox: React.FC<ICheckboxProps> = ({
                                          value,
                                          checked,
                                          onChange,
                                          className,
                                          placeholder,
                                          icon,
                                        }) => {

  const cn = classNames(
    s.checkbox,
    className,
    {[s.checkbox_checked]: checked})

    const [isChecked, setIsChecked] = useState(false)

    return (
      <div className={cn}>
        <div className={s.input__icon}>
          {icon}
        </div>
        <input
          type={'checkbox'}
          value={value}
          checked={isChecked}
          onClick={()=>setIsChecked(prev => !prev)}
          onChange={(e)=>onChange(e)}
          placeholder={placeholder}
        />
      </div>
    )
};

export default Checkbox;
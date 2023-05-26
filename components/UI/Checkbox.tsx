import React, {useState} from 'react';
import s from '@/styles/components/UI/Checkbox.module.scss'
// import classNames from "classnames";
import {animated, config, useChain, useSpring, useSpringRef} from "react-spring";
import Text from "@/components/UI/Text";
import classNames from "classnames";

export interface ICheckboxProps {
  className?: string;
  label: string;
  colored?: boolean;
  onChange: () => void;
  isChecked: boolean;
  disabled?: boolean;
  error?: boolean;
}

const Checkbox: React.FC<ICheckboxProps> = ({
                                              className = '',
                                              label,
                                              colored = false,
                                              onChange,
                                              isChecked,
                                              disabled,
                                              error = false}) => {

  // const cn = classNames(
  //   s.checkbox,
  //   className,
  //   {[s.checkbox_checked]: isChecked})

    const checkboxAnimationRef = useSpringRef();
    const checkboxAnimationStyle = useSpring({
      backgroundColor: isChecked ? "#5B74F9" : "#fff",
      config: config.gentle,
      ref: checkboxAnimationRef
    });

    const [checkmarkLength, setCheckmarkLength] = useState<string | number>(0);

    const checkmarkAnimationRef = useSpringRef();
    const checkmarkAnimationStyle = useSpring({
      x: isChecked ? 0 : checkmarkLength,
      config: config.gentle,
      ref: checkmarkAnimationRef
    });

    useChain(
      isChecked
        ? [checkboxAnimationRef, checkmarkAnimationRef]
        : [checkmarkAnimationRef, checkboxAnimationRef],
      [0, 0.1]
    );

    return (
      <label className={classNames(s.label, className, {[s.label_disabled]: disabled})}>
        <input
          className={s.input}
          type="checkbox"
          onChange={() => {
            if(disabled){
              return;
            }
            onChange()
          }}
        />
        <animated.svg
          style={checkboxAnimationStyle}
          className={classNames(s.checkbox, {[s.checkbox_error]: error})}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <animated.path
            d="M2 5.5L5.5 9L13 2"
            strokeWidth="1.5"
            stroke="#fff"
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
            strokeDasharray={checkmarkLength}
            strokeDashoffset={checkmarkAnimationStyle.x}
          />
        </animated.svg>
        <Text colored={colored} error={error}>
          {label}
        </Text>
      </label>
    );
};

export default Checkbox;
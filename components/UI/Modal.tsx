import React, {MouseEvent, useEffect, useState} from 'react';
import s from '@/styles/components/UI/Modal.module.scss'
import {animated, useSpring} from "react-spring";
import {useMeasure} from "react-use";
import classNames from "classnames";

interface IModalProps {
  showModal: boolean;
  closeHandler: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({showModal, closeHandler, children}) => {


  const outsideClickHandler = () => {
    closeHandler()
  }

  const insideClickHandler = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [refBlock, { height }] = useMeasure<HTMLDivElement>();

  const expand = useSpring({
    config: { friction: 20 },
    top: showModal ? `${(window.innerHeight-contentHeight-100) / 2}px` : `-${contentHeight}px`,
  });

  useEffect(() => {
    setContentHeight(height);

    window.addEventListener("resize", ()=>setContentHeight(height));

    return window.removeEventListener("resize", ()=>setContentHeight(height));
  }, [height, showModal]);

  return (
    <div onClick={outsideClickHandler} className={s.modal + ' ' + (showModal ? s.modal_active : '')}>
      <animated.div className={classNames(s.modal__animated)}
                    style={expand}>
        <div ref={refBlock} onClick={insideClickHandler} className={s.modal__block}>
          <div className={s.modal__block__container}>
            <div className={s.modal__block__close + ' ' + (showModal ? s.modal__block__close_active : '')}>
              <svg onClick={closeHandler}
                   width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.14648 20.2635L20.4099 4" stroke="black"/>
                <path d="M4 4.14648L20.2635 20.4099" stroke="black"/>
              </svg>
            </div>
            <div className={s.modal__block__content}>
              {children}
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Modal;
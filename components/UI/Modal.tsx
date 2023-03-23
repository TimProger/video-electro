import React, {MouseEvent} from 'react';
import s from '@/styles/components/UI/Modal.module.scss'

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

  return (
    <div onClick={outsideClickHandler} className={s.modal + ' ' + (showModal ? s.modal__active : '')}>
      <div onClick={insideClickHandler} className={s.modal__block}>
        <div className={s.modal__block__container}>
          <div className={s.modal__block__close + ' ' + (showModal ? s.modal__block__close__active : '')}>
            <svg
                 onClick={closeHandler} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.14648 20.2635L20.4099 4" stroke="black"/>
              <path d="M4 4.14648L20.2635 20.4099" stroke="black"/>
            </svg>
          </div>
          <div className={s.modal__block__content}>
            {showModal ? children : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
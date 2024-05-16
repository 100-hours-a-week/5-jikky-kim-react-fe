import React, { forwardRef } from 'react';

import style from './Modal.module.css';

const Modal = forwardRef((props, ref) => {
    const { modal, overlay } = ref;
    return (
        <div className={style.overlay} ref={overlay}>
            <div className={style.modal} ref={modal}>
                <div className={style.modal_body}>
                    <div className={style.modal_title}>{props.text1}</div>
                    <div className={style.modal_message}>{props.text1}</div>
                    <div className={style.modal_sel_btn}>
                        <button className={style.btn_cancel} onClick={props.modalCancelClickHandler}>
                            취소
                        </button>
                        <button className={style.btn_ok} onClick={props.modalOkClickHandler}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Modal;

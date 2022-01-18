import React from 'react';
import c from "./Modal.module.scss"

interface ModalProps {
    children?: React.ReactNode,
}

const Modal: React.FC<ModalProps> = ({children}) => {
    return (
        <div className={c.modal}>
            <div className={c.modal_content}>{children}</div>
        </div>
    )
};

export default Modal;

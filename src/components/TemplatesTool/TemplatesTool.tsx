import React, {useState} from 'react';
import c from './TemplatesTool.module.scss'
import style from "./../../style/style.module.scss"
import Modal from "../Style components/Modal/Modal";

interface TemplatesToolProps {

}

const TemplatesTool: React.FC<TemplatesToolProps> = ({}) => {
    const [modal, setModal] = useState<boolean>(false)
    return (
        <div>
            <div onClick={() => setModal(true)} className={c.container}>
                <div className={c.icon}/>
                <div className={c.title}>Templates</div>
            </div>
            {modal ?
                <Modal>
                    <div className={c.modal_title}>Выберете шаблон</div>
                    <div className={c.modal_content}/>
                    <div className={c.modal_button}>
                        <div onClick={() => setModal(false)} className={c.modal_close + " " + style.button}>Close</div>
                    </div>
                </Modal>
                : null}
        </div>
    );
};

export default TemplatesTool;

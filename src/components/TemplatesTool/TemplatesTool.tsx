import React, {useState} from 'react';
import c from './TemplatesTool.module.scss'
import style from "./../../style/style.module.scss"
import Modal from "../Style components/Modal/Modal";
import {allTemplates,Card} from "../../models/types";
import {id} from "../../models/id";
import {ChangeCardActionType} from "../../store/actions/actions";
import {changeCard} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";

interface TemplatesToolProps {
    changeCard: (card: Card) => ChangeCardActionType,
}

const TemplatesTool: React.FC<TemplatesToolProps> = ({changeCard}) => {
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
                    <div className={c.modal_content}>

                        {allTemplates.map((template) =>
                            <div key={id()} className={c.template_item}
                                 onClick={() => {
                                    changeCard(template.card)
                                     setModal(false)
                                 }}
                            >
                                <img className={c.template_item_img}
                                     src={require(`../../static/templates/${String(template.path)}.jpg`).default}
                                     alt={"error"}/>
                                <div className={c.template_item_title}>
                                    {template.title}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={c.modal_button}>
                        <div onClick={() => setModal(false)} className={c.modal_close + " " + style.button}>Close</div>
                    </div>
                </Modal>
                : null}
        </div>
    );
};


const mapDispatchToProps = {
    changeCard
}
export default connect(null, mapDispatchToProps)(TemplatesTool)

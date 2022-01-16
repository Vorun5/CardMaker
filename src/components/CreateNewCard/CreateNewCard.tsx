import React, {useState} from 'react';
import c from "./CreateNewCard.module.scss"
import style from "./../../style/style.module.scss"
import {connect} from "react-redux";
import {
    CreateNewCardMakerActionType,

} from "../../actions/actions";
import {
    createNewCardMaker,

} from "../../actions/actionsCreaters";
import Modal from "../Style components/Modal/Modal";

interface CreateNewCardProps {
    createNewCardMaker: () => CreateNewCardMakerActionType,
}

const CreateNewCard: React.FC<CreateNewCardProps> = ({createNewCardMaker}) => {

    const [warning, setWarning] = useState<boolean>(false)

    return (
        <div className={c.container}>
            <div className={style.button + " " + c.create}
                 onClick={() => {
                     setWarning(true)
                 }}>
                <div className={c.create_icon}/>
            </div>
            {warning ?
                <Modal>
                    <div className={c.warning}>

                        <div className={c.warning_title}>Создать новую открытку.</div>
                        <div className={c.warning_content}>
                           Вы действительно хотите создать новую открытку? <br/>  Все несохраненные изменения будут удаленны!
                        </div>
                        <div className={c.warning_buttons}>
                            <div
                                onClick={() => {
                                    createNewCardMaker()
                                    setWarning(false)
                                }}
                                className={c.warning_buttons_yes + " " + style.button}>Yes
                            </div>
                            <div
                                onClick={() => setWarning(false)}
                                className={c.warning_buttons_no + " " + style.button}>No
                            </div>
                        </div>
                    </div>
                </Modal>
                : null}
        </div>

    );
};


const mapDispatchToProps = {
    createNewCardMaker
}

export default connect(null, mapDispatchToProps)(CreateNewCard);

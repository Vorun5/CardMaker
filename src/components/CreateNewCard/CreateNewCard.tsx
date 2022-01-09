import React, {useState} from 'react';
import c from "./CreateNewCard.module.scss"
import style from "./../../style/style.module.scss"
import {connect} from "react-redux";
import {
    ChangeBackgroundActionsType,
    ChangeFilterActionsType,
    RemoveAllHistoryActionType,
    RemoveAllItemsActionType,
    RemoveFocusItemsActionsType,
    ResizeCardActionsType
} from "../../actions/actions";
import {Colors, Size} from "../../models/types";
import {
    changeBackground,
    changeFilter,
    removeAllHistory,
    removeAllItems,
    removeFocusItems,
    resizeCard
} from "../../actions/actionsCreaters";
import {findAllByDisplayValue} from "@testing-library/react";
import Modal from "../Style components/Modal/Modal";

interface CreateNewCardProps {
    removeFocusItems: () => RemoveFocusItemsActionsType,
    removeAllHistory: () => RemoveAllHistoryActionType,
    resizeCard: (size: Size) => ResizeCardActionsType,
    changeBackground: (background: Colors) => ChangeBackgroundActionsType,
    changeFilter: (filter: Colors) => ChangeFilterActionsType,
    removeAllItems: () => RemoveAllItemsActionType
}

const CreateNewCard: React.FC<CreateNewCardProps> = ({
                                                         removeFocusItems,
                                                         removeAllHistory,
                                                         resizeCard,
                                                         changeBackground,
                                                         changeFilter,
                                                         removeAllItems
                                                     }) => {

    const [warning, setWarning] = useState<boolean>(false)

    function createNewCardMaker() {
        removeFocusItems()
        resizeCard({width: 800, height: 600})
        changeBackground(Colors.White)
        changeFilter(Colors.None)
        removeAllItems()
        removeAllHistory()
    }

    return (
        <div>
            <div className={style.button + " " + c.create}
                 onClick={() => {
                     setWarning(true)
                 }}>
                <div className={c.create_icon}/>
            </div>
            {warning ?
                <Modal>
                    <div className={c.warning}>

                        <div className={c.warning_title}>Create new file.</div>
                        <div className={c.warning_content}>
                            Are you sure you want to create a new file? <br/> All unsaved changes will be deleted!
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

                                onClick={() => {
                                    setWarning(false)
                                }
                                }

                                className={c.warning_buttons_no + " " + style.button}>No
                            </div>
                        </div>
                    </div>
                </Modal>
                : <div></div>}
        </div>

    );
};


// function mapStateToProps(state: CardMaker) {
//     return {
//         focusItems: state.card.focusItems,
//     }
// }

const mapDispatchToProps = {
    removeFocusItems,
    removeAllHistory,
    resizeCard,
    changeBackground,
    changeFilter,
    removeAllItems
}

export default connect(null, mapDispatchToProps)(CreateNewCard);

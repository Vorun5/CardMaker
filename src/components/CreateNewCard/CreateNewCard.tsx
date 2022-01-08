import React from 'react';
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

    function createNewCardMaker() {
        removeFocusItems()
        removeAllHistory()
        resizeCard({width: 800, height: 600})
        changeBackground(Colors.White)
        changeFilter(Colors.None)
        removeAllItems()
    }
    return (

            <div className={style.button + " " + c.create}
                 onClick={createNewCardMaker}
            >
                <div className={c.create_icon}/>
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

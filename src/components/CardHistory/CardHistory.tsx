import React, {useState} from 'react';
import {
    Card,
    CardMaker,
    Colors,
    emptyZone,
    Fonts,
    FontStyle,
    FontWeight,
    History, Size,
    TextDecoration,
    TypeDate
} from "../../models/types";
import c from "./CardHistory.module.scss"
import style from "./../../style/style.module.scss"
import {store} from "../../reduser/redusers";
import {
    AddHistoryActionsType,
    ChangeCardActionType,
    RedoHistoryActionsType,
    UndoHistoryActionsType
} from "../../actions/actions";
import {addHistory, changeCard, redoHistory, undoHistory} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {id} from "../../models/id";

interface HistoryProps {
    //card: Card,
    history: History,
    addHistory: (card: string) => AddHistoryActionsType,
    changeCard: (card: Card) => ChangeCardActionType,
    redoHistory: () => RedoHistoryActionsType,
    undoHistory: (list: string[]) => UndoHistoryActionsType,

}

const CardHistory: React.FC<HistoryProps> = ({history, addHistory, changeCard, redoHistory, undoHistory}) => {

    function handleChange() {
        const history: History = store.getState().history
        //const card: string = JSON.stringify({...selectCard(store.getState()), filter: []})
        const card: Card = {...store.getState().card, focusItems: []}
        const cardString = JSON.stringify(card)
        if (history.list[history.currentIndex] !== cardString) {
            addHistory(cardString)
        }
    }

    const unsubscribe = store.subscribe(handleChange)

    //unsubscribe()

    function undoHistoryClick() {
        const card: Card = JSON.parse(store.getState().history.list[store.getState().history.currentIndex - 1])
        const list: string[] = store.getState().history.list
        undoHistory(list)
    }
//style.button + " " + c.button + " " + style.button_inactive
    return (
        <div className={c.container}>
            <div
                onClick={() => undoHistoryClick()}
                className={history.currentIndex > 0 ? style.button + " " + c.button : style.button + " " + c.button + " " + style.button_inactive}>
                <div className={c.undo_icon + " " + c.icon}/>
            </div>
            <div onClick={() => redoHistory()}
                 className={history.currentIndex + 1 == history.list.length ? style.button + " " + c.button + " " + style.button_inactive : style.button + " " + c.button}>
                <div className={c.redo_icon + " " + c.icon}/>
            </div>
        </div>
    );
};

function mapStateToProps(state: CardMaker) {
    return {
        history: state.history
    }
}

const mapDispatchToProps = {
    addHistory,
    changeCard,
    redoHistory,
    undoHistory
}
export default connect(mapStateToProps, mapDispatchToProps)(CardHistory);

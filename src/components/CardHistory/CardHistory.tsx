import React, {useEffect, useState} from 'react';
import {
    Card,
    CardMaker, emptyFocusItems,
    History,
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
import * as fs from "fs";

interface HistoryProps {
    history: History,
    addHistory: (card: string) => AddHistoryActionsType,
    changeCard: (card: Card) => ChangeCardActionType,
    redoHistory: () => RedoHistoryActionsType,
    undoHistory: () => UndoHistoryActionsType,

}

let isPressed = false


const CardHistory: React.FC<HistoryProps> = ({history, addHistory, changeCard, redoHistory, undoHistory}) => {


    function kyeUpHandler(event: KeyboardEvent) {

        if (event.code == 'KeyZ') {
            isPressed = false
        }
        if (event.code == 'KeyX') {
            isPressed = false
        }

    }

    function kyeDownHandler(event: KeyboardEvent) {
        if (event.ctrlKey) {
            if (event.code == 'KeyZ') {
                isPressed = true
                console.log("undo")
                undoHistory()
            }
            if (event.code == 'KeyX') {
                  isPressed = true

                console.log("redo")
                redoHistory()
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (!isPressed) {
                kyeDownHandler(event)
            }
        })
    })

    useEffect(() => {
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            if (isPressed) {
                kyeUpHandler(event)
            }
        })
    })

    function handleChange() {
        const history: History = store.getState().history
        const card: Card = {...store.getState().card, focusItems: emptyFocusItems}
        const cardString = JSON.stringify(card)
        if (history.list[history.currentIndex] !== cardString) {
            addHistory(cardString)
        }
    }

    const unsubscribe = store.subscribe(handleChange)

    return (
        <div className={c.container}>
            <div
                onClick={() => undoHistory()}
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

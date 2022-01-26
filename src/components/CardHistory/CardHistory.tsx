import React, {useEffect} from 'react';
import {
    Card,
    CardMaker, emptyFocusItems, emptyMultipleChoice,
    History,
} from "../../models/types";
import c from "./CardHistory.module.scss"
import style from "./../../style/style.module.scss"
import {store} from "../../store/reduser/redusers";
import {
    RedoHistoryActionsType,
    UndoHistoryActionsType
} from "../../store/actions/actions";
import {addHistory, redoHistory, undoHistory} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";

let isPressed = false

function kyeUpHandler(event: KeyboardEvent) {
    if (isPressed) {
        if (event.code === 'KeyZ') {
            isPressed = false
        }
        if (event.code === 'KeyX') {
            isPressed = false
        }
    }
}

function kyeDownHandler(event: KeyboardEvent) {
    if (!isPressed) {
        if (event.ctrlKey) {
            if (event.code === 'KeyZ') {
                isPressed = true
                store.dispatch(undoHistory())
            }
            if (event.code === 'KeyX') {
                isPressed = true
                store.dispatch(redoHistory())
            }
        }
    }
}

function handleChange() {
    const history: History = store.getState().history
    const card: Card = {...store.getState().card, focusItems: emptyFocusItems, multipleChoice: emptyMultipleChoice}
    const cardString = JSON.stringify(card)
    if (history.currentIndex === -1) {
        store.dispatch(addHistory(cardString))
    } else {
        if (history.list[history.currentIndex] !== cardString) {
            store.dispatch(addHistory(cardString))
        }
    }
}

interface HistoryProps {
    history: History,
    redoHistory: () => RedoHistoryActionsType,
    undoHistory: () => UndoHistoryActionsType,

}

const CardHistory: React.FC<HistoryProps> = ({history, redoHistory, undoHistory}) => {
    useEffect(() => {
        document.addEventListener("keydown", kyeDownHandler)
        document.addEventListener("keyup", kyeUpHandler)
        return () => {
            document.removeEventListener("keydown", kyeDownHandler)
            document.removeEventListener("keyup", kyeUpHandler)
        }
    })

    const unsubscribe = store.subscribe(handleChange)

    return (
        <div className={c.container}>
            <div
                onClick={() => undoHistory()}
                className={history.currentIndex > 0 ? style.button + " " + c.button : style.button + " " + c.button + " " + style.button_inactive}>
                <div className={history.currentIndex > 0 ? c.undo_icon + " " + c.icon : c.undo_icon_inactive + " " + c.icon}/>
            </div>
            <div onClick={() => redoHistory()}
                 className={history.currentIndex + 1 === history.list.length ? style.button + " " + c.button + " " + style.button_inactive : style.button + " " + c.button}>
                <div className={history.currentIndex + 1 === history.list.length ? c.redo_icon_inactive + " " + c.icon : c.redo_icon + " " + c.icon}/>
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
    redoHistory,
    undoHistory
}
export default connect(mapStateToProps, mapDispatchToProps)(CardHistory);

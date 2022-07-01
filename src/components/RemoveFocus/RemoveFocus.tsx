import React, {useEffect} from 'react';
import style from "../../style/style.module.scss"
import {CardMaker} from "../../models/types";
import {
    removeFocusItems,
} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";
import {ID} from "../../models/id";
import {RemoveFocusItemsActionsType} from "../../store/actions/actions";
import {store} from "../../store/reduser/redusers";


interface RemoveFocusProps {
    focusItems: ID[],
    removeFocusItems: () => RemoveFocusItemsActionsType,
}

let isPressed = false
function kyeUpHandler(event: KeyboardEvent) {
    if (isPressed) {
        if (event.code === 'Minus') {
            isPressed = false
        }
    }

}
function kyeDownHandler(event: KeyboardEvent) {
    if (!isPressed) {
        if (event.code === 'Minus') {
            store.dispatch( removeFocusItems())
            isPressed = true
        }
    }
}

const RemoveFocus: React.FC<RemoveFocusProps> = ({
                                                     focusItems,
                                                     removeFocusItems,
                                                 }) => {

    useEffect(() => {
        document.addEventListener("keydown", kyeDownHandler)
        document.addEventListener("keyup", kyeUpHandler)
        return () => {
            document.removeEventListener("keydown", kyeDownHandler)
            document.removeEventListener("keyup", kyeUpHandler)
        }
    })



    return (

        <div
            className={focusItems.length !== 0 ? style.button : style.button + " " + style.button_inactive}
            onClick={() => {
                if (focusItems.length !== 0) {
                    removeFocusItems()
                }
            }}
        >
            Remove focus
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        focusItems: state.card.focusItems,
    }
}

const mapDispatchToProps = {
    removeFocusItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFocus);

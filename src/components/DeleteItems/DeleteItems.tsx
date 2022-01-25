import React, {useEffect} from 'react';
import style from "../../style/style.module.scss"
import {CardMaker} from "../../models/types";
import {
    removeFocusItems,
    removeItems,
} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";
import {ID} from "../../models/id";
import {RemoveFocusItemsActionsType, RemoveItemsActionsType} from "../../store/actions/actions";
import {store} from "../../store/reduser/redusers";


interface DeleteItemProps {
    focusItems: ID[],
    removeItems: () => RemoveItemsActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
}

let isPressed = false

function kyeUpHandler(event: KeyboardEvent) {
    if (isPressed) {
        if (event.code === 'Delete') {
            isPressed = false
        }
    }

}

function kyeDownHandler(event: KeyboardEvent) {
    if (!isPressed) {
        if (event.code === 'Delete') {
            store.dispatch(removeItems())
            store.dispatch(removeFocusItems())
            isPressed = true
        }
    }

}

const DeleteItems: React.FC<DeleteItemProps> = ({
                                                    focusItems,
                                                    removeItems,
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
                    removeItems()
                    removeFocusItems()
                }
            }}
        >
            Delete
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        focusItems: state.card.focusItems,
    }
}

const mapDispatchToProps = {
    removeItems,
    removeFocusItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItems);

import React, {useEffect} from 'react';
import c from "./DeleteItems.module.scss"
import style from "../../style/style.module.scss"
import {CardMaker} from "../../models/types";
import {
    removeFocusItems,
    removeItems,
} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {ID} from "../../models/id";
import {RemoveFocusItemsActionsType, RemoveItemsActionsType} from "../../actions/actions";


interface DeleteItemProps {
    focusItems: ID[],
    removeItems: (focusItems: ID[]) => RemoveItemsActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
}

let isPressed = false

const DeleteItems: React.FC<DeleteItemProps> = ({
                                                    focusItems,
                                                    removeItems,
                                                    removeFocusItems,
                                                }) => {

    function deleteFocusItems(focusItems: ID[]) {
        removeItems(focusItems)
        removeFocusItems()
    }

    function kyeUpHandler(event: KeyboardEvent) {
        if (event.code === 'Delete') {
            isPressed = false
        }
    }

    function kyeDownHandler(event: KeyboardEvent) {
        if (event.code === 'Delete') {
            deleteFocusItems(focusItems)
            isPressed = true
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


    return (


        <div
            className={focusItems.length !== 0 ? c.container + " " + style.button : c.container + " " + style.button + " " + style.button_inactive}
            onClick={() => {
                if (focusItems.length !== 0) {
                    deleteFocusItems(focusItems)
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

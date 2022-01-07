import React, {useEffect, useRef, useState} from 'react';
import c from "./DeleteItems.module.scss"
import style from "../../style/style.module.scss"
import {CardMaker} from "../../models/types";
import {
    removeFocusItems, removeItems,
    removeZone,
} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {ID} from "../../models/id";
import {RemoveFocusItemsActionsType, RemoveItemsActionsType, RemoveZoneActionsType} from "../../actions/actions";


interface DeleteItemProps {
    focusItems: ID[],
    removeItems: (focusItems: ID[]) => RemoveItemsActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    removeZone: () => RemoveZoneActionsType
}

const DeleteItems: React.FC<DeleteItemProps> = ({
                                                    focusItems,
                                                    removeItems,
                                                    removeFocusItems,
                                                    removeZone
                                                }) => {


    function deleteFocusItems(focusItems: ID[]) {
        removeItems(focusItems)
        removeFocusItems()
        removeZone()
    }

    // const [focusList, setFocusList] = useState<ID[]>(focusItems)
    //
    // function useOutsideClick(ref: React.MutableRefObject<any>) {
    //     useEffect(() => {
    //         function handleClickOutside(event: KeyboardEvent) {
    //
    //             if (ref.current && !ref.current.contains(event.target)) {
    //                 console.log(event.key)
    //                 if (event.key == 'Delete') {
    //                     setFocusList(focusItems)
    //                     deleteFocusItems(focusList)
    //                 }
    //             }
    //         }
    //
    //
    //         // Bind the event listener
    //         document.addEventListener("keydown", handleClickOutside);
    //         return () => {
    //             // Unbind the event listener on clean up
    //             document.removeEventListener("keydown", handleClickOutside);
    //         };
    //     }, [ref]);
    // }
    //
    // const wrapperRef = useRef(null);
    // useOutsideClick(wrapperRef);

    return (


        <div
            className={focusItems.length != 0 ? c.container + " " + style.button: c.container + " " + style.button + " " + style.button_inactive}
            onClick={() => {
                if (focusItems.length != 0) {
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
    removeZone,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItems);

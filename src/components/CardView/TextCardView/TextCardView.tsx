import React, {useEffect, useRef} from 'react';
import c from './TextCardView.module.scss'
import {Card, Coordinates, Item, Size, TextCard} from "../../../models/types";
import {addFocusItem, changeFilter, removeFocusItem} from "../../../actions/actionsCreaters";
import {AddFocusItemActionsType, RemoveFocusItemActionsType, RemoveZoneActionsType} from "../../../actions/actions";
import {ID} from "../../../models/id";

interface TextCardViewProps {
    id: ID,
    size: Size,
    coordinates: Coordinates,
    textCard: TextCard,
    focus: boolean,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItem: () => RemoveFocusItemActionsType,
    removeZone: () => RemoveZoneActionsType,

}

const TextCardView: React.FC<TextCardViewProps> = ({
                                                       removeFocusItem,
                                                       id,
                                                       addFocusItem,
                                                       focus,
                                                       coordinates,
                                                       size,
                                                       textCard,
                                                       removeZone
                                                   }) => {
    const styleText = {
        color: textCard.color,
        fontFamily: textCard.fontFamily,
        fontSize: textCard.fontSize,
        fontWeight: textCard.fontStyle.fontWeight,
        textDecoration: textCard.fontStyle.textDecoration,
        fontStyle: textCard.fontStyle.fontStyle
    }
    return (
        <div className={c.container}  onClick={() => {
            removeZone();
            removeFocusItem();
            addFocusItem(id)
        }}
             style={focus ? {
                 top: coordinates.y,
                 left: coordinates.x,
                 border: '0.4vh solid #1aa4fb',
                 padding: '0.4rem',
                 width: size.width,
                 height: size.height
             } : {
                 width: size.width,
                 height: size.height,
                 top: coordinates.y,
                 left: coordinates.x,
             }  }>
            <div style={styleText} className={c.text}>{textCard.body}</div>
        </div>
    );
};

export default TextCardView;

import React from 'react';
import {ID} from "../../../models/id";
import {Art, Coordinates, IMG, Size} from "../../../models/types";
import {AddFocusItemActionsType, RemoveFocusItemActionsType, RemoveZoneActionsType} from "../../../actions/actions";
import c from "./ImgCardView.module.scss"

interface ImgCardViewProps {
    id: ID,
    size: Size,
    coordinates: Coordinates,
    img: IMG,
    focus: boolean,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItem: () => RemoveFocusItemActionsType,
    removeZone: () => RemoveZoneActionsType,
}


const ImgCardView: React.FC<ImgCardViewProps> = ({
                                                     removeFocusItem,
                                                     id,
                                                     addFocusItem,
                                                     focus,
                                                     coordinates,
                                                     size,
                                                     img,
                                                     removeZone
                                                 }) => {
    return (
        <div className={c.container} onClick={() => {
            removeZone();
            removeFocusItem();
            addFocusItem(id)
        }}
             style={focus ? {
                 width: size.width,
                 height: size.height,
                 top: coordinates.y,
                 left: coordinates.x,
                 border: '0.4vh solid #1aa4fb',
                 padding: '0.4rem',
             } : {
                 width: size.width,
                 height: size.height,
                 top: coordinates.y,
                 left: coordinates.x,
             }}>
            <img src={img.url} alt={img.url} className={c.img}/>
        </div>
    );
};

export default ImgCardView;

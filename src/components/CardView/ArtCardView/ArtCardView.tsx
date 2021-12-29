import React from 'react';
import c from "./ArtCardView.module.scss";
import {ID} from "../../../models/id";
import {Art, Coordinates, Size, TypeArt} from "../../../models/types";
import {AddFocusItemActionsType, RemoveFocusItemActionsType, RemoveZoneActionsType} from "../../../actions/actions";

interface ArtCardViewProps {
    id: ID,
    size: Size,
    coordinates: Coordinates,
    art: Art,
    focus: boolean,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItem: () => RemoveFocusItemActionsType,
    removeZone: () => RemoveZoneActionsType,
}


const ArtCardView: React.FC<ArtCardViewProps> = ({
                                                     removeFocusItem,
                                                     id,
                                                     addFocusItem,
                                                     focus,
                                                     coordinates,
                                                     size,
                                                     art,
                                                     removeZone
                                                 }) => {

    return (
        <div className={c.container} onClick={() => {
            removeFocusItem();
            addFocusItem(id)
            removeZone();
        }}
             style={focus ? {
                 width: size.width,
                 height: size.height,
                 top: coordinates.y,
                 left: coordinates.x,
                 border: '0.4vh solid #1aa4fb',
                 padding: '0.4rem',
             } : { width: size.width,
                 height: size.height,
                 top: coordinates.y,
                 left: coordinates.x,
             }}>
            <div style={art.typeArt == TypeArt.Circle ? {
                width: size.width,
                height: size.height,
                backgroundColor: art.color,
                borderRadius: '50%',
            } : art.typeArt == TypeArt.Triangle ? {
                width: 0,
                height: 0,

                borderLeftWidth: size.width / 2,
                borderLeftColor: "transparent",
                borderLeftStyle: "solid",

                borderRightWidth: size.width / 2,
                borderRight: "transparent",
                borderRightStyle: "solid",

                borderBottomWidth: size.height,
                borderBottomColor: art.color,
                borderBottomStyle: "solid",
            } :  art.typeArt == TypeArt.Square ? {
                width: size.width,
                height: size.height,
                backgroundColor: art.color
            } : {

            }
            }/>
        </div>
    );
};

export default ArtCardView;

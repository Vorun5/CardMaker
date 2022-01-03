import React from 'react';
import {Art, Size, TypeArt} from "../../../models/types";

interface ArtCardViewProps {
    size: Size,
    art: Art,
}


const ArtCardView: React.FC<ArtCardViewProps> = ({size, art}) => {
    return (
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
        } : art.typeArt == TypeArt.Square ? {
            width: size.width,
            height: size.height,
            backgroundColor: art.color
        } : {}
        }/>
    );
};

export default ArtCardView;

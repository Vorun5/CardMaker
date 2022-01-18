import React from 'react';
import {Art, Size, TypeArt} from "../../../models/types";

interface ArtCardViewProps {
    size: Size,
    art: Art,
}


const ArtCardView: React.FC<ArtCardViewProps> = ({size, art}) => {

    return (
       <div>
           <img src={require(`../../../static/art/${String(art.typeArt)}.svg`).default} alt={String(art.typeArt)}/>
       </div>
    );
};

export default ArtCardView;

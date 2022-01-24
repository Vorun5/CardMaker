import React from 'react';
import {Art} from "../../../models/types";

interface ArtCardViewProps {
    art: Art
}


const ArtCardView: React.FC<ArtCardViewProps> = ({art}) => {

    return (
       <div>
           <img src={require(`../../../static/art/${String(art.typeArt)}.svg`).default} alt={String(art.typeArt)}/>
       </div>
    );
};

export default ArtCardView;

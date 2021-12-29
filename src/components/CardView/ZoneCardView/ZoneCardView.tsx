import React from 'react';
import {emptyZone, Zone} from "../../../models/types";
import c from './ZoneCardView.module.scss'
interface ZoneCardViewToProps {
    zone: Zone,
}

const ZoneCardView: React.FC<ZoneCardViewToProps> = ({zone}) => {



    return (
        <div className={c.container} style={zone != emptyZone ? {
            width: zone.size.width,
            height: zone.size.height,
            top: zone.coordinates.y,
            left: zone.coordinates.x,
        } : {display: "none"}}>

        </div>
    );
};

export default ZoneCardView;

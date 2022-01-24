import React from 'react';
import {IMG} from "../../../models/types";
import c from "./ImgCardView.module.scss"

interface ImgCardViewProps {
    imgCard: IMG
}
const ImgCardView: React.FC<ImgCardViewProps> = ({imgCard}) => {
    return (
        <img src={imgCard.url} alt={'error'} className={c.img}/>
    );
};

export default ImgCardView;

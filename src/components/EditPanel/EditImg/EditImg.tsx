import React from 'react';
import c from './EditImg.module.scss'
import style from '../../../style/style.module.scss'
import {Art, IMG} from "../../../models/types";
import {ID} from "../../../models/id";

interface EditImgProps {
    title: string,
    img: IMG,
    focusItems: ID[],
}

const EditImg: React.FC<EditImgProps> = ({
                                             title,
                                             img,
                                             focusItems
                                         }) => {
    return (
        <div className={c.container}>
            <div className={style.title}>
                {title}
            </div>
        </div>
    );
};

export default EditImg;

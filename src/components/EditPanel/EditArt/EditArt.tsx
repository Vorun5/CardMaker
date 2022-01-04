import React from 'react';
import c from './EditArt.module.scss'
import style from '../../../style/style.module.scss'
import {Art, Colors, Fonts, FontStyleText, TextCard} from "../../../models/types";
import {ID} from "../../../models/id";

interface EditArtProps {
    title: string,
    art: Art,
    focusItems: ID[],
}

const EditArt: React.FC<EditArtProps> = ({
                                             title,
                                             art,
                                             focusItems,
                                         }) => {
    return (
        <div className={c.container}>
            <div className={style.title}>
                {title}
            </div>
        </div>
    );
};

export default EditArt;

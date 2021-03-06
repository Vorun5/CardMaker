import React, {useState} from 'react';
import c from './EditArt.module.scss'
import style from '../../../style/style.module.scss'
import {
    allTypeArtList,
    Art,
    TypeArt
} from "../../../models/types";
import {id} from "../../../models/id";
import {ChangeTypeArtsActionType} from "../../../store/actions/actions";

interface EditArtProps {
    title: string,
    art: Art,
    changeTypeArts: (typeArt: TypeArt) => ChangeTypeArtsActionType,
}

const EditArt: React.FC<EditArtProps> = ({
                                             title,
                                             art,
                                             changeTypeArts,
                                         }) => {
    const [activeTypeArt, setActiveTypeArt] = useState<boolean>(false)
    const [typeArt, setTypeArt] = useState<TypeArt>(art.typeArt)
    return (
        <div className={c.container}>
            <div className={style.title}>
                {title}
            </div>
            <div className={c.flex_container}>
                <div className={c.typeArt}>
                    <div style={activeTypeArt ? {
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        borderBottom: "none",
                    } : {
                        borderRadius: '5px',
                    }}

                         className={c.typeArt_view}
                         onClick={() => {
                             setActiveTypeArt(!activeTypeArt)
                         }}>
                        <div
                        >{typeArt}</div>
                        <div className={c.typeArt_view__icon}/>
                    </div>
                    <div className={c.typeArt_list} style={activeTypeArt ? {
                        display: "block"
                    } : {
                        display: "none"
                    }}>
                        {allTypeArtList.map((type =>
                                <div
                                    key={id()}
                                    className={c.typeArt_list__item}
                                    onClick={() => {
                                        setTypeArt(type)
                                        changeTypeArts(type)
                                        setActiveTypeArt(false)

                                    }}>{type}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArt;

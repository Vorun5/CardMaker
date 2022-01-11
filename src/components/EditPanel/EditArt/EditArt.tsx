import React, {useState} from 'react';
import c from './EditArt.module.scss'
import style from '../../../style/style.module.scss'
import {
    allColorsList,
    allFontsList,
    allTypeArtList,
    Art,
    Colors,
    Fonts,
    FontStyleText,
    TextCard,
    TypeArt
} from "../../../models/types";
import {id, ID} from "../../../models/id";
import {ChangeTypeArtsActionType, RecolorArtsActionsType} from "../../../actions/actions";

interface EditArtProps {
    title: string,
    art: Art,
    focusItems: ID[],
    changeTypeArts: (typeArt: TypeArt) => ChangeTypeArtsActionType,
    recolorArts: (focusItems: ID[], color: Colors) => RecolorArtsActionsType,
}

const EditArt: React.FC<EditArtProps> = ({
                                             title,
                                             art,
                                             focusItems,
                                             changeTypeArts,
                                             recolorArts
                                         }) => {
    const [activeTypeArt, setActiveTypeArt] = useState<boolean>(false)
    const [typeArt, setTypeArt] = useState<TypeArt>(art.typeArt)
    const [colorArt, setColorArt] = useState<Colors>(art.color)
    const [activeSelectColor, setActiveSelectColor] = useState<boolean>(false)
    const positionSelectBlock = allColorsList.length * 30 + 20;
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
                <div className={c.art_color_container}>
                    <div className={c.art_color}
                         style={{backgroundColor: colorArt}}
                         onClick={() => {
                             setActiveSelectColor(!activeSelectColor)
                         }}/>
                    <div style={activeSelectColor ? {right: -positionSelectBlock + 'px'} : {right: "0"}}
                         className={c.art_select_colors} onClick={() => {
                    }}>
                        {allColorsList.map((color => <div key={id()} className={c.art_select_colors__color}
                                                          style={{backgroundColor: color}}
                                                          onClick={() => {
                                                              recolorArts(focusItems, color)
                                                              setColorArt(color)
                                                          }}>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArt;

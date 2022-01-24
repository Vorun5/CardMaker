import React, {useRef, useState} from 'react';
import c from './EditText.module.scss'
import style from '../../../style/style.module.scss'
import {
    allFontsList,
    Fonts,
    FontStyle,
    FontStyleText,
    FontWeight,
    TextCard,
    TextDecoration
} from "../../../models/types";
import {id} from "../../../models/id";
import {
    ChangeFontSizeTexts,
    ChangeFontTextActionsType,
    ChangeTextsActionsType,
    RecolorTextsActionsType,
    RestyleTextActionsType
} from "../../../actions/actions";

interface EditTextProps {
    title: string
    textCard: TextCard
    restyleText: (fontStyleText: FontStyleText) => RestyleTextActionsType
    recolorText: (color: string) => RecolorTextsActionsType
    changeFontText: (fontFamily: Fonts) => ChangeFontTextActionsType
    changeTexts: (body: string) => ChangeTextsActionsType
    changeFontSizeText: (fontSize: number) => ChangeFontSizeTexts
}


const EditText: React.FC<EditTextProps> = ({
                                               changeFontSizeText,
                                               changeTexts,
                                               title,
                                               changeFontText,
                                               recolorText,
                                               restyleText,
                                               textCard,
                                           }) => {
    const [styleText, setStyleText] = useState<FontStyleText>(textCard.fontStyle)
    const [valueText, setValueText] = useState<string>(textCard.body)
    const [colorText, setColorText] = useState<string>(textCard.color)
    const [fontText, setFontText] = useState<Fonts>(textCard.fontFamily)
    const [fontSizeText, setFontSizeText] = useState<number>(textCard.fontSize)

    function reverseFontWeight(fw: FontWeight): FontWeight {
        if (fw === FontWeight.normal) {
            return FontWeight.bolt
        } else {
            return FontWeight.normal
        }
    }

    function reverseFontStyle(fs: FontStyle): FontStyle {
        if (fs === FontStyle.normal) {
            return FontStyle.italic
        } else {
            return FontStyle.normal
        }
    }

    function reverseTextDecoration(td: TextDecoration): TextDecoration {
        if (td === TextDecoration.normal) {
            return TextDecoration.lineThrough
        } else {
            return TextDecoration.normal
        }
    }

    const [activeFont, setActiveFont] = useState(false);
    const ref = useRef(null)


    return (
        <div className={c.container} >
            <div className={style.title}>
                {title}
            </div>
            <div className={c.input_container}>
                <input ref={ref} type="text" value={valueText}
                       onChange={(event) => {
                           setValueText(event.target.value)
                           changeTexts(event.target.value)
                       }}
                       className={style.input + ' ' + c.input_container__icon_input}/>
            </div>
            <div className={c.range}>
                <input className={c.range_input} type="range" value={fontSizeText} min="5" max="100"
                       onChange={(event) => {
                           setFontSizeText(Number(event.target.value))
                           changeFontSizeText(Number(event.target.value))
                       }}
                />
                <p className={c.range_view}>{fontSizeText}</p>
            </div>
            <div className={c.fs}>
                <div className={c.fs_item + ' ' + c.fs_item__bolt}
                     style={styleText.fontWeight === FontWeight.bolt ? {
                         backgroundColor: '#dadada'
                     } : {}}

                     onClick={() => {
                         restyleText({
                             ...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)
                         })

                         setStyleText({...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)})
                     }}/>

                <div className={c.fs_item + ' ' + c.fs_item__italic}
                     style={styleText.fontStyle === FontStyle.italic ? {
                         backgroundColor: '#dadada'
                     } : {}}


                     onClick={() => {
                         restyleText({
                             ...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)
                         })
                         setStyleText({...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)})
                     }}/>

                <div className={c.fs_item + ' ' + c.fs_item__strikethrough}

                     style={styleText.textDecoration === TextDecoration.lineThrough ? {
                         backgroundColor: '#dadada'
                     } : {}}

                     onClick={() => {
                         restyleText({
                             ...styleText, textDecoration: reverseTextDecoration(styleText.textDecoration)
                         })

                         setStyleText({...styleText, textDecoration: reverseTextDecoration(styleText.textDecoration)})
                     }}/>

                    <label className={style.input_color_label}>
                        <input type="color" value={colorText} onChange={(event) => {
                            setColorText(event.target.value)
                        }}
                               onBlur={() => recolorText(colorText)}
                        />
                    </label>

            </div>
            <div className={c.ff}>
                <div className={c.ff_view} style={activeFont ? {
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    borderBottom: "none",
                } : {
                    borderRadius: '5px',
                }} onClick={() => {
                    setActiveFont(!activeFont)
                }}>
                    <div style={{
                        fontFamily: fontText
                    }}>{fontText}</div>
                    <div className={c.ff_view__icon}/>
                </div>
                <div className={c.ff_list} style={activeFont ? {
                    display: "block"
                } : {
                    display: "none"
                }}>
                    {allFontsList.map((font =>
                            <div
                                key={id()}
                                style={
                                    {fontFamily: font}
                                } className={c.ff_list__item}
                                onClick={() => {
                                    setFontText(font)
                                    changeFontText(font)
                                    setActiveFont(false)

                                }}>{font}</div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default EditText;

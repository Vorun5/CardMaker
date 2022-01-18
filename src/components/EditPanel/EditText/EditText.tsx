import React, {useEffect, useRef, useState} from 'react';
import c from './EditText.module.scss'
import style from '../../../style/style.module.scss'
import {
    allColorsList,
    allFontsList,
    Colors,
    Fonts,
    FontStyle,
    FontStyleText,
    FontWeight,
    TextCard,
    TextDecoration
} from "../../../models/types";
import {id, ID} from "../../../models/id";
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
    recolorText: (color: Colors) => RecolorTextsActionsType
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
    const [colorText, setColorText] = useState<Colors>(textCard.color)
    const [fontText, setFontText] = useState<Fonts>(textCard.fontFamily)
    const [fontSizeText, setFontSizeText] = useState<number>(textCard.fontSize)

    function reverseFontWeight(fw: FontWeight): FontWeight {
        if (fw == FontWeight.normal) {
            return FontWeight.bolt
        } else {
            return FontWeight.normal
        }
    }

    function reverseFontStyle(fs: FontStyle): FontStyle {
        if (fs == FontStyle.normal) {
            return FontStyle.italic
        } else {
            return FontStyle.normal
        }
    }

    function reverseTextDecoration(td: TextDecoration): TextDecoration {
        if (td == TextDecoration.normal) {
            return TextDecoration.lineThrough
        } else {
            return TextDecoration.normal
        }
    }


    const [activeSelectColor, setActiveSelectColor] = useState(false);
    const [activeFont, setActiveFont] = useState(false);
    const positionSelectBlock = allColorsList.length * 30 + 20;


    function useOutsideClick(ref: React.MutableRefObject<any>) {
        useEffect(() => {
            function handleClickOutside(event: Event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActiveSelectColor(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);


    return (
        <div className={c.container} ref={wrapperRef}>
            <div className={style.title}>
                {title}
            </div>
            <div className={c.input_container}>
                <input type="text" value={valueText}
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
                     style={styleText.fontWeight == FontWeight.bolt ? {
                         backgroundColor: '#dadada'
                     } : {}}

                     onClick={() => {
                         restyleText({
                             ...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)
                         })

                         setStyleText({...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)})
                     }}/>

                <div className={c.fs_item + ' ' + c.fs_item__italic}
                     style={styleText.fontStyle == FontStyle.italic ? {
                         backgroundColor: '#dadada'
                     } : {}}


                     onClick={() => {
                         restyleText({
                             ...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)
                         })
                         setStyleText({...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)})
                     }}/>

                <div className={c.fs_item + ' ' + c.fs_item__strikethrough}

                     style={styleText.textDecoration == TextDecoration.lineThrough ? {
                         backgroundColor: '#dadada'
                     } : {}}

                     onClick={() => {
                         restyleText({
                             ...styleText, textDecoration: reverseTextDecoration(styleText.textDecoration)
                         })

                         setStyleText({...styleText, textDecoration: reverseTextDecoration(styleText.textDecoration)})
                     }}/>

                <div>
                    <div className={c.fs_item + ' ' + c.fs_item__color}
                         style={{backgroundColor: colorText}}
                         onClick={() => {
                             setActiveSelectColor(!activeSelectColor)
                         }}/>


                    <div style={activeSelectColor ? {right: -positionSelectBlock + 'px'} : {right: "0"}}
                         className={c.fs_select_colors} onClick={() => {
                    }}>
                        {allColorsList.map((color => <div key={id()} className={c.fs_select_colors__color}
                                                          style={{backgroundColor: color}}
                                                          onClick={() => {
                                                              recolorText(color)
                                                              setColorText(color)
                                                          }
                                                          }>
                        </div>))}
                    </div>
                </div>
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

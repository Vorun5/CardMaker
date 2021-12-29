import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import c from './EditText.module.scss'
import {
    allColorsList,
    allFontsList,
    Colors,
    Fonts,
    FontStyle,
    FontStyleText,
    FontWeight,
    Item, TextCard,
    TextDecoration,
    TypeDate
} from "../../../models/types";
import {id, ID} from "../../../models/id";
import {
    ChangeFontTextActionsType,
    ChangeTextsActionsType,
    RecolorItemsActionsType,
    RestyleTextActionsType
} from "../../../actions/actions";

interface EditTextProps {
    title: string
    textCard: TextCard
    restyleText: (fontStyleText: FontStyleText, focusItem: ID[]) => RestyleTextActionsType
    recolorText: (color: Colors, focusItem: string[]) => RecolorItemsActionsType
    changeFontText: (fontFamily: Fonts, focusItems: string[]) => ChangeFontTextActionsType
    changeTexts: (focusItem: string[], body: string) => ChangeTextsActionsType
    focusItem: ID[]
}


const EditText: React.FC<EditTextProps> = ({

                                               changeTexts,
                                               title,
                                               changeFontText,
                                               recolorText,
                                               restyleText,
                                               textCard,
                                               focusItem
                                           }) => {
    const [styleText, setStyleText] = useState<FontStyleText>(textCard.fontStyle)
    const [valueText, setValueText] = useState<string>(textCard.body)
    const [colorText, setColorText] = useState<Colors>(textCard.color)
    const [fontText, setFontText] = useState<Fonts>(textCard.fontFamily)

    // let styleText: FontStyleText = {
    //     fontWeight: FontWeight.normal,
    //     fontStyle: FontStyle.normal,
    //     textDecoration: TextDecoration.normal
    // }
    // let valueText: string = "";
    // let colorText: Colors = Colors.None
    // let fontText: Fonts = Fonts.Montserrat


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

    const viewColor: Colors = colorText

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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {

    }

    return (
        <div className={c.container} ref={wrapperRef}>
            <div className={c.title}>
                {title}
            </div>
            <div className={c.edit_value}>
                <input type="text" value={valueText} onChange={(event) => {
                    setValueText(event.target.value)
                    changeTexts(focusItem, valueText)
                }}
                       className={c.input + ' ' + c.edit_value__input}/>
            </div>
            <div className={c.fs}>
                <div className={c.fs_item + ' ' + c.fs_item__bolt}


                     onClick={() => {
                         restyleText({
                             ...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)
                         }, focusItem)

                         setStyleText({...styleText, fontWeight: reverseFontWeight(styleText.fontWeight)})
                     }}/>

                <div className={c.fs_item + ' ' + c.fs_item__italic} onClick={() => {
                    restyleText({
                        ...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)
                    }, focusItem)

                    setStyleText({...styleText, fontStyle: reverseFontStyle(styleText.fontStyle)})
                }}/>

                <div className={c.fs_item + ' ' + c.fs_item__strikethrough} onClick={() => {
                    restyleText({
                        ...styleText, textDecoration: reverseTextDecoration(styleText.textDecoration)
                    }, focusItem)

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
                                                              recolorText(color, focusItem)
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
                    <div className={c.ff_view__icon}></div>
                </div>
                <div className={c.ff_list} style={activeFont ? {
                    display: "block"
                } : {
                    display: "none"
                }}>
                    {allFontsList.map((font =>
                            <div style={
                                {fontFamily: font}
                            } className={c.ff_list__item} onClick={() => {
                                changeFontText(font, focusItem)
                                setActiveFont(false)

                            }}>{font}</div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default EditText;

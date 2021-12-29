import React from 'react';
import {ID} from "../../models/id";
import {CardMaker, Colors, Fonts, FontStyleText, FontWeight, Item, TextCard, TypeDate} from "../../models/types";
import c from './EditPanel.module.scss'
import {connect} from "react-redux";
import {changeFontText, changeTexts, recolorItems, restyleText} from "../../actions/actionsCreaters";
import {
    ChangeFontTextActionsType,
    ChangeTextsActionsType,
    RecolorItemsActionsType,
    RestyleTextActionsType
} from "../../actions/actions";
import EditText from "./EditText/EditText";

interface EditPanelToProps {
    focusItem: ID[];
    items: Item[];
    restyleText: (fontStyleText: FontStyleText, focusItem: ID[]) => RestyleTextActionsType,
    recolorItems: (color: Colors, focusItem: string[]) => RecolorItemsActionsType,
    changeFontText: (fontFamily: Fonts, focusItems: string[]) => ChangeFontTextActionsType,
    changeTexts: (focusItem: string[], body: string) => ChangeTextsActionsType
}

function oneTextIndex(id: ID, items: Item[]): TextCard | null {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            const itemData = items[i].data
            if (itemData.type == TypeDate.TextCard) {
                return itemData
            }
        }
    }
    return null
}

const EditPanel: React.FC<EditPanelToProps> = ({changeTexts, recolorItems, restyleText, focusItem, items, changeFontText}) => {


    function isOneText(id: ID, items: Item[]): boolean {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return items[i].data.type == TypeDate.TextCard;
            }
        }
        return false
    }

    function isOneArt(id: ID, items: Item[]): boolean {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return items[i].data.type == TypeDate.Art;
            }
        }
        return false
    }

    function isOneImg(id: ID, items: Item[]): boolean {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return items[i].data.type == TypeDate.TextCard;
            }
        }
        return false
    }


    const textItemData = oneTextIndex(focusItem[0], items)

    return (
        <div>
            {
                focusItem.length == 1 ? (
                    isOneText(focusItem[0], items) ? (
                            <div className={c.container}>
                                {
                                    textItemData
                                        && <EditText
                                            changeTexts={changeTexts}
                                            title={"Edit text"}
                                            changeFontText={changeFontText}
                                            recolorText={recolorItems}
                                            focusItem={focusItem}
                                            restyleText={restyleText}
                                            textCard={textItemData}
                                        />
                                }

                            </div>
                        ) :
                        (
                            isOneArt(focusItem[0], items) ? (
                                <div className={c.container}>
                                    <div className={c.title}>
                                        Edit art
                                    </div>
                                </div>
                            ) : (
                                isOneImg(focusItem[0], items) ? (
                                    <div className={c.container}>
                                        <div className={c.title}>
                                            Edit img
                                        </div>
                                    </div>
                                ) : null
                            )
                        )
                ) : (
                    <div className={c.container}>
                        <div className={c.title}>
                            Edit more
                        </div>
                    </div>
                )
            }
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        focusItem: state.card.focusItems,
        items: state.card.items,
    }
}

const mapDispatchToProps = {
    restyleText,
    recolorItems,
    changeFontText,
    changeTexts
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);


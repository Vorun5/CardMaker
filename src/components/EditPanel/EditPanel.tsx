import React from 'react';
import {ID} from "../../models/id";
import {
    Art,
    CardMaker,
    Colors,
    Fonts,
    FontStyleText,
    IMG,
    Item,
    TextCard, TypeArt,
    TypeDate
} from "../../models/types";

import {connect} from "react-redux";
import {
    changeFontSizeText,
    changeFontText,
    changeTexts, changeTypeArts,
    recolorTexts,
    restyleText
} from "../../actions/actionsCreaters";
import {
    ChangeFontSizeTexts,
    ChangeFontTextActionsType,
    ChangeTextsActionsType, ChangeTypeArtsActionType, RecolorTextsActionsType,
    RestyleTextActionsType
} from "../../actions/actions";
import EditText from "./EditText/EditText";
import EditArt from "./EditArt/EditArt";

interface EditPanelToProps {
    focusItems: ID[];
    items: Item[];
    restyleText: (fontStyleText: FontStyleText) => RestyleTextActionsType,
    recolorTexts: (color: Colors) => RecolorTextsActionsType,
    changeFontText: (fontFamily: Fonts) => ChangeFontTextActionsType,
    changeTexts: (body: string) => ChangeTextsActionsType,
    changeFontSizeText: (fontSize: number) => ChangeFontSizeTexts,
    changeTypeArts: (typeArt: TypeArt) => ChangeTypeArtsActionType,
}

function firstTextIndex(focusItems: ID[], items: Item[]): TextCard | null {
    for (let j = 0; j < focusItems.length; j++) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == focusItems[j]) {
                const itemData = items[i].data
                if (itemData.type == TypeDate.TextCard) {
                    return itemData
                }
            }
        }
    }
    return null
}

function firstArtIndex(focusItems: ID[], items: Item[]): Art | null {
    for (let j = 0; j < focusItems.length; j++) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == focusItems[j]) {
                const itemData = items[i].data
                if (itemData.type == TypeDate.Art) {
                    return itemData
                }
            }
        }
    }
    return null
}

function firstImgIndex(focusItems: ID[], items: Item[]): IMG | null {
    for (let j = 0; j < focusItems.length; j++) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == focusItems[j]) {
                const itemData = items[i].data
                if (itemData.type == TypeDate.IMG) {
                    return itemData
                }
            }
        }
    }
    return null
}

const EditPanel: React.FC<EditPanelToProps> = ({
                                                   changeFontSizeText,
                                                   changeTexts,
                                                   recolorTexts,
                                                   restyleText,
                                                   focusItems,
                                                   items,
                                                   changeFontText,
                                                   changeTypeArts,
                                               }) => {


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


    const textItemData = firstTextIndex(focusItems, items)
    const artItemData = firstArtIndex(focusItems, items)
    const imgItemData = firstImgIndex(focusItems, items)
    return (
        <div>
            {textItemData
            && <EditText
                changeTexts={changeTexts}
                title={"Edit text"}
                changeFontText={changeFontText}
                recolorText={recolorTexts}
                restyleText={restyleText}
                textCard={textItemData}
                changeFontSizeText={changeFontSizeText}
            />}

            {artItemData
            && <EditArt
                title={"Edit art"}
                art={artItemData}
                focusItems={focusItems}
                changeTypeArts={changeTypeArts}
            />}

        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        focusItems: state.card.focusItems,
        items: state.card.items,
    }
}

const mapDispatchToProps = {
    restyleText,
    recolorTexts,
    changeFontText,
    changeTexts,
    changeFontSizeText,
    changeTypeArts,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPanel);


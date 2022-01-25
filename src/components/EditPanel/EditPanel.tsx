import React from 'react';
import {ID} from "../../models/id";
import {
    Art,
    CardMaker,
    Fonts,
    FontStyleText,
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
} from "../../store/actions/actionsCreaters";
import {
    ChangeFontSizeTexts,
    ChangeFontTextActionsType,
    ChangeTextsActionsType, ChangeTypeArtsActionType, RecolorTextsActionsType,
    RestyleTextActionsType
} from "../../store/actions/actions";
import EditText from "./EditText/EditText";
import EditArt from "./EditArt/EditArt";
import c from './EditPanel.module.scss'
interface EditPanelToProps {
    focusItems: ID[];
    items: Item[];
    restyleText: (fontStyleText: FontStyleText) => RestyleTextActionsType,
    recolorTexts: (color: string) => RecolorTextsActionsType,
    changeFontText: (fontFamily: Fonts) => ChangeFontTextActionsType,
    changeTexts: (body: string) => ChangeTextsActionsType,
    changeFontSizeText: (fontSize: number) => ChangeFontSizeTexts,
    changeTypeArts: (typeArt: TypeArt) => ChangeTypeArtsActionType,
}

function firstTextIndex(focusItems: ID[], items: Item[]): TextCard | null {
    for (let j = 0; j < focusItems.length; j++) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === focusItems[j]) {
                const itemData = items[i].data
                if (itemData.type === TypeDate.TextCard) {
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
            if (items[i].id === focusItems[j]) {
                const itemData = items[i].data
                if (itemData.type === TypeDate.Art) {
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


    const textItemData = firstTextIndex(focusItems, items)
    const artItemData = firstArtIndex(focusItems, items)
    return (
        <div className={c.container}>
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


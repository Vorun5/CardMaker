import {
    ActionType,
    AddFocusItemActionsType,
    AddHistoryActionsType,
    AddItemActionsType,
    ChangeBackgroundActionsType,
    ChangeCardActionType,
    ChangeFilterActionsType,
    ChangeFontSizeTexts,
    ChangeFontTextActionsType,
    ChangeTextsActionsType,
    ChangeTypeArtsActionType,
    CreateNewCardMakerActionType,
    MovingItemActionsType,
    MovingItemsActionsType,
    RecolorTextsActionsType,
    RedoHistoryActionsType,
    RemoveAllHistoryActionType,
    RemoveAllItemsActionType,
    RemoveFocusItemsActionsType,
    RemoveItemsActionsType,
    ResizeCardActionsType,
    ResizeItemActionsType,
    RestyleTextActionsType,
    ScaleItemActionType,
    UndoHistoryActionsType
} from "./actions";
import {Card, Colors, Coordinates, Fonts, FontStyleText, Item, Size, TypeArt} from "../models/types";
import {ID} from "../models/id";


export const createNewCardMaker = (): CreateNewCardMakerActionType => {
    return {
        type: ActionType.CREATE_NEW_CARD_MAKER,
    }
}

export const changeCard = (card: Card): ChangeCardActionType => {
    return {
        type: ActionType.CHANGE_CARD,
        card: card
    }
}

export const resizeCard = (size: Size): ResizeCardActionsType => {
    return {
        type: ActionType.RESIZE_CARD,
        size: size,
    }
}

export const addFocusItem = (id: ID): AddFocusItemActionsType => {
    return {
        type: ActionType.ADD_FOCUS_ITEM,
        id: id,
    }
}

export const removeFocusItems = (): RemoveFocusItemsActionsType => {
    return {
        type: ActionType.REMOVE_FOCUS_ITEMS,
    }
}

export const addHistory = (card: string): AddHistoryActionsType => {
    return {
        type: ActionType.ADD_HISTORY,
        card: card,
    }
}

export const removeAllHistory = (): RemoveAllHistoryActionType => {
    return {
        type: ActionType.REMOVE_ALL_HISTORY,
    }
}


export const addItem = (item: Item): AddItemActionsType => {
    return {
        type: ActionType.ADD_ITEM,
        item: item,
    }
}

export const removeAllItems = (): RemoveAllItemsActionType => {
    return {
        type: ActionType.REMOVE_ALL_ITEMS,
    }
}

export const removeItems = (): RemoveItemsActionsType => {
    return {
        type: ActionType.REMOVE_ITEMS,
    }
}

export const movingItem = (id: ID, coordinate: Coordinates): MovingItemActionsType => {
    return {
        type: ActionType.MOVING_ITEM,
        coordinates: coordinate,
        id: id,
    }
}

export const movingItems = (coordinate: Coordinates): MovingItemsActionsType => {
    return {
        type: ActionType.MOVING_ITEMS,
        coordinates: coordinate,
    }
}

export const resizeItem = (id: ID, size: Size, coordinates: Coordinates): ResizeItemActionsType => {
    return {
        type: ActionType.RESIZE_ITEM,
        size: size,
        id: id,
        coordinates: coordinates
    }
}

export const changeFontText = (fontFamily: Fonts): ChangeFontTextActionsType => {
    return {
        type: ActionType.CHANGE_FONT_TEXT,
        fontFamily: fontFamily,
    }
}

export const changeTexts = (body: string): ChangeTextsActionsType => {
    return {
        type: ActionType.CHANGE_TEXTS,
        body: body,
    }
}

export const restyleText = (fontStyleText: FontStyleText): RestyleTextActionsType => {
    return {
        type: ActionType.RESTYLE_TEXT,
        fontStyleText: fontStyleText,
    }
}

export const recolorTexts = (color: Colors): RecolorTextsActionsType => {
    return {
        type: ActionType.RECOLOR_TEXTS,
        color: color,
    }
}

export const changeTypeArts = (typeArt: TypeArt): ChangeTypeArtsActionType => {
    return {
        type: ActionType.CHANGE_TYPE_ARTS,
        typeArt: typeArt,
    }
}


export const changeFontSizeText = (fontSize: number): ChangeFontSizeTexts => {
    return {
        type: ActionType.CHANGE_FONT_SIZE_TEXTS,
        fontSize: fontSize,
    }
}

export const changeFilter = (filter: Colors): ChangeFilterActionsType => {
    return {
        type: ActionType.CHANGE_FILTER,
        filter: filter,
    }
}

export const changeBackground = (background: Colors): ChangeBackgroundActionsType => {
    return {
        type: ActionType.CHANGE_BACKGROUND,
        background: background,
    }
}

export const redoHistory = (): RedoHistoryActionsType => {
    return {
        type: ActionType.REDO_HISTORY,
    }
}

export const undoHistory = (): UndoHistoryActionsType => {
    return {
        type: ActionType.UNDO_HISTORY,
    }
}

export const scaleItem = (scale: number): ScaleItemActionType => {
    return  {
        type: ActionType.SCALE_ITEM,
        scale: scale
    }
}

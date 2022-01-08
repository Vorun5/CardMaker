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
    CreateNewCardMakerActionType,
    MovingItemActionsType,
    MovingItemsActionsType,
    MovingZoneActionsType,
    RecolorArtsActionsType,
    RecolorTextsActionsType,
    RedoHistoryActionsType,
    RemoveAllHistoryActionType, RemoveAllItemsActionType,
    RemoveFocusItemsActionsType,
    RemoveItemsActionsType,
    RemoveZoneActionsType,
    ResizeCardActionsType,
    ResizeItemActionsType,
    RestyleTextActionsType,
    SelectZoneActionsType,
    UndoHistoryActionsType
} from "./actions";
import {Card, Colors, Coordinates, Fonts, FontStyleText, Item, Size, Zone} from "../models/types";
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

export const selectZone = (zone: Zone): SelectZoneActionsType => {
    return {
        type: ActionType.SELECT_ZONE,
        zone: zone,
    }
}

export const movingZone = (coordinates: Coordinates): MovingZoneActionsType => {
    return {
        type: ActionType.MOVING_ZONE,
        coordinates: coordinates,
    }
}

export const removeZone = (): RemoveZoneActionsType => {
    return {
        type: ActionType.REMOVE_ZONE,
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

export const removeItems = (focusItems: ID[]): RemoveItemsActionsType => {
    return {
        type: ActionType.REMOVE_ITEMS,
        focusItems: focusItems,
    }
}

export const movingItem = (id: ID, coordinate: Coordinates): MovingItemActionsType => {
    return {
        type: ActionType.MOVING_ITEM,
        coordinates: coordinate,
        id: id,
    }
}

export const movingItems = (focusItems: ID[], coordinate: Coordinates): MovingItemsActionsType => {
    return {
        type: ActionType.MOVING_ITEMS,
        coordinates: coordinate,
        focusItems: focusItems,
    }
}

export const resizeItem = (id: ID, size: Size): ResizeItemActionsType => {
    return {
        type: ActionType.RESIZE_ITEM,
        size: size,
        id: id,
    }
}

export const changeFontText = (focusItems: ID[], fontFamily: Fonts): ChangeFontTextActionsType => {
    return {
        type: ActionType.CHANGE_FONT_TEXT,
        fontFamily: fontFamily,
        focusItems: focusItems
    }
}

export const changeTexts = (focusItems: ID[], body: string): ChangeTextsActionsType => {
    return {
        type: ActionType.CHANGE_TEXTS,
        body: body,
        focusItems: focusItems,
    }
}

export const restyleText = (focusItems: ID[], fontStyleText: FontStyleText): RestyleTextActionsType => {
    return {
        type: ActionType.RESTYLE_TEXT,
        fontStyleText: fontStyleText,
        focusItems: focusItems,
    }
}

export const recolorTexts = (focusItems: ID[], color: Colors): RecolorTextsActionsType => {
    return {
        type: ActionType.RECOLOR_TEXTS,
        color: color,
        focusItems: focusItems,
    }
}

export const recolorArts = (focusItems: ID[], color: Colors): RecolorArtsActionsType => {
    return {
        type: ActionType.RECOLOR_ARTS,
        color: color,
        focusItems: focusItems,
    }
}

export const changeFontSizeText = (focusItems: ID[], fontSize: number): ChangeFontSizeTexts => {
    return {
        type: ActionType.CHANGE_FONT_SIZE_TEXTS,
        fontSize: fontSize,
        focusItems: focusItems,
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



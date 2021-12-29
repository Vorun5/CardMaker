import {
    ActionType,
    AddFocusItemActionsType,
    AddHistoryActionsType,
    AddItemActionsType,
    ChangeBackgroundActionsType,
    ChangeFilterActionsType,
    ChangeFontTextActionsType,
    ChangeTextsActionsType,
    MovingItemActionsType,
    MovingZoneActionsType,
    RecolorItemsActionsType,
    RedoHistoryActionsType,
    RemoveFocusItemActionsType,
    RemoveZoneActionsType,
    ResizeCardActionsType,
    ResizeItemActionsType,
    RestyleTextActionsType,
    SelectZoneActionsType,
    UndoHistoryActionsType
} from "./actions";
import {Card, Colors, Coordinates, Fonts, FontStyleText, Item, Size, Zone} from "../models/types";
import {ID} from "../models/id";

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

export const removeFocusItem = (): RemoveFocusItemActionsType => {
    return {
        type: ActionType.REMOVE_FOCUS_ITEM,
    }
}

export const addHistory = (card: Card): AddHistoryActionsType => {
    return {
        type: ActionType.ADD_HISTORY,
        card: card,
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

export const movingItem = (coordinate: Coordinates, id: ID): MovingItemActionsType => {
    return {
        type: ActionType.MOVING_ITEM,
        coordinates: coordinate,
        id: id,
    }
}

export const resizeItem = (size: Size, id: ID): ResizeItemActionsType => {
    return {
        type: ActionType.RESIZE_ITEM,
        size: size,
        id: id,
    }
}

export const recolorItems = (color: Colors, focusItem: ID[]): RecolorItemsActionsType => {
    return {
        type: ActionType.RECOLOR_ITEMS,
        color: color,
        focusItem: focusItem,
    }
}


export const changeFontText = (fontFamily: Fonts, focusItems: ID[]): ChangeFontTextActionsType => {
    return {
        type: ActionType.CHANGE_FONT_TEXT,
        fontFamily: fontFamily,
        focusItem: focusItems
    }
}

export const changeTexts = (focusItem: ID[], body: string): ChangeTextsActionsType => {
    return {
        type: ActionType.CHANGE_TEXTS,
        body: body,
        focusItem: focusItem,
    }
}

export const restyleText = (fontStyleText: FontStyleText, focusItem: ID[]): RestyleTextActionsType => {
    return {
        type: ActionType.RESTYLE_TEXT,
        fontStyleText: fontStyleText,
        focusItem: focusItem,
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


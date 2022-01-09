import {Card, Colors, Coordinates, Fonts, FontStyle, FontStyleText, History, Item, Size, Zone} from "../models/types";
import {ID} from "../models/id";

export enum ActionType {
    RESIZE_CARD = 'RESIZE_CARD',
    ADD_HISTORY = 'ADD_HISTORY',


    SELECT_ZONE = 'SELECT_ZONE',
    MOVING_ZONE = 'MOVING_ZONE',
    REMOVE_ZONE = 'REMOVE_ZONE',

    REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS',
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEMS = 'REMOVE_ITEMS',
    MOVING_ITEM = 'MOVING_ITEM',
    MOVING_ITEMS = 'MOVING_ITEMS',
    RESIZE_ITEM = 'RESIZE_ITEM',

    RECOLOR_TEXTS = 'RECOLOR_TEXTS',
    RECOLOR_ARTS = 'RECOLOR_ARTS',
    CHANGE_FONT_SIZE_TEXTS = 'CHANGE_FONT_SIZE_TEXTS',
    RESTYLE_TEXT = 'RESTYLE_TEXT',
    CHANGE_FONT_TEXT = 'CHANGE_FONT_TEXT',
    CHANGE_FILTER = 'CHANGE_FILTER',
    CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
    REMOVE_ALL_HISTORY = 'REMOVE_ALL_HISTORY',
    REDO_HISTORY = 'REDO_HISTORY',
    UNDO_HISTORY = 'UNDO_HISTORY',
    ADD_FOCUS_ITEM = 'ADD_FOCUS_ITEM',
    REMOVE_FOCUS_ITEMS = 'REMOVE_FOCUS_ITEMS',
    CHANGE_TEXTS = 'CHANGE_TEXTS',


    CREATE_NEW_CARD_MAKER = 'CREATE_NEW_CARD',
    CHANGE_CARD = 'CHANGE_CARD',
}

export type RemoveAllItemsActionType = {
    type: ActionType.REMOVE_ALL_ITEMS,
}


export type RemoveAllHistoryActionType = {
    type: ActionType.REMOVE_ALL_HISTORY,
}

export type CreateNewCardMakerActionType = {
    type: ActionType.CREATE_NEW_CARD_MAKER
}

export type ChangeCardActionType = {
    type: ActionType.CHANGE_CARD,
    card: Card,
}

export type RemoveItemsActionsType = {
    type: ActionType.REMOVE_ITEMS,
    focusItems: ID[],
}


export type AddFocusItemActionsType = {
    type: ActionType.ADD_FOCUS_ITEM,
    id: ID,
}


export type RemoveFocusItemsActionsType = {
    type: ActionType.REMOVE_FOCUS_ITEMS,
}


export type ResizeCardActionsType = {
    type: ActionType.RESIZE_CARD,
    size: Size,
}

export type AddHistoryActionsType = {
    type: ActionType.ADD_HISTORY,
    card: string
}

export type SelectZoneActionsType = {
    type: ActionType.SELECT_ZONE,
    zone: Zone,
}

export type MovingZoneActionsType = {
    type: ActionType.MOVING_ZONE,
    coordinates: Coordinates,
}

export type RemoveZoneActionsType = {
    type: ActionType.REMOVE_ZONE
}

export type AddItemActionsType = {
    type: ActionType.ADD_ITEM,
    item: Item,
}


export type MovingItemActionsType = {
    type: ActionType.MOVING_ITEM,
    id: ID,
    coordinates: Coordinates,
}

export type MovingItemsActionsType = {
    type: ActionType.MOVING_ITEMS,
    focusItems: ID[],
    coordinates: Coordinates,
}

export type ResizeItemActionsType = {
    type: ActionType.RESIZE_ITEM,
    size: Size,
    id: ID,
}

export type ChangeTextsActionsType = {
    type: ActionType.CHANGE_TEXTS,
    focusItems: ID[],
    body: string,
}

export type RestyleTextActionsType = {
    type: ActionType.RESTYLE_TEXT,
    fontStyleText: FontStyleText,
    focusItems: ID[],
}

export type ChangeFontTextActionsType = {
    type: ActionType.CHANGE_FONT_TEXT,
    fontFamily: Fonts,
    focusItems: ID[],
}

export type ChangeFilterActionsType = {
    type: ActionType.CHANGE_FILTER,
    filter: Colors,
}


export type ChangeBackgroundActionsType = {
    type: ActionType.CHANGE_BACKGROUND,
    background: Colors,
}

export type RedoHistoryActionsType = {
    type: ActionType.REDO_HISTORY,
}


export type UndoHistoryActionsType = {
    type: ActionType.UNDO_HISTORY,
    list: string[],
}

export type RecolorTextsActionsType = {
    type: ActionType.RECOLOR_TEXTS,
    color: Colors,
    focusItems: ID[],
}

export type RecolorArtsActionsType = {
    type: ActionType.RECOLOR_ARTS,
    color: Colors,
    focusItems: ID[],
}

export type ChangeFontSizeTexts = {
    type: ActionType.CHANGE_FONT_SIZE_TEXTS,
    focusItems: ID[],
    fontSize: number,
}






export type ActionsType =
    UndoHistoryActionsType
    | RedoHistoryActionsType
    | ChangeBackgroundActionsType
    | ChangeFilterActionsType
    | RestyleTextActionsType
    | ResizeItemActionsType
    | MovingItemsActionsType
    | MovingItemActionsType
    | AddItemActionsType
    | RemoveZoneActionsType
    | MovingZoneActionsType
    | SelectZoneActionsType
    | AddHistoryActionsType
    | ResizeCardActionsType
    | AddFocusItemActionsType
    | RemoveFocusItemsActionsType
    | ChangeFontTextActionsType
    | ChangeTextsActionsType
    | RecolorTextsActionsType
    | RecolorArtsActionsType
    | ChangeFontSizeTexts
    | RemoveItemsActionsType
    | CreateNewCardMakerActionType
    | ChangeCardActionType
    | RemoveAllHistoryActionType
    | RemoveAllItemsActionType

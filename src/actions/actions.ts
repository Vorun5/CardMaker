import {Card, Colors, Coordinates, Fonts, FontStyle, FontStyleText, History, Item, Size, Zone} from "../models/types";
import {ID} from "../models/id";

export enum ActionType {
    RESIZE_CARD = 'RESIZE_CARD',
    ADD_HISTORY = 'ADD_HISTORY',
    SELECT_ZONE = 'SELECT_ZONE',
    MOVING_ZONE = 'MOVING_ZONE',
    REMOVE_ZONE = 'REMOVE_ZONE',
    ADD_ITEM = 'ADD_ITEM',
    MOVING_ITEM = 'MOVING_ITEM',
    RESIZE_ITEM = 'RESIZE_ITEM',
    RECOLOR_ITEMS = 'RECOLOR_ITEMS',
    RESTYLE_TEXT = 'RESTYLE_TEXT',
    CHANGE_FONT_TEXT = 'CHANGE_FONT_TEXT',
    CHANGE_FILTER = 'CHANGE_FILTER',
    CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
    REDO_HISTORY = 'REDO_HISTORY',
    UNDO_HISTORY = 'UNDO_HISTORY',
    ADD_FOCUS_ITEM = 'ADD_FOCUS_ITEM',
    REMOVE_FOCUS_ITEM = 'REMOVE_FOCUS_ITEM',
    CHANGE_TEXTS = 'CHANGE_TEXTS',
}

export type AddFocusItemActionsType = {
    type: ActionType.ADD_FOCUS_ITEM,
    id: ID,
}


export type RemoveFocusItemActionsType = {
    type: ActionType.REMOVE_FOCUS_ITEM,
}


export type ResizeCardActionsType = {
    type: ActionType.RESIZE_CARD,
    size: Size,
}

export type AddHistoryActionsType = {
    type: ActionType.ADD_HISTORY,
    card: Card
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

export type ResizeItemActionsType = {
    type: ActionType.RESIZE_ITEM,
    size: Size,
    id: ID,
}

export type RecolorItemsActionsType = {
    type: ActionType.RECOLOR_ITEMS,
    color: Colors,
    focusItem: ID[],
}

export type ChangeTextsActionsType = {
    type: ActionType.CHANGE_TEXTS,
    focusItem: ID[],
    body: string,
}

export type RestyleTextActionsType = {
    type: ActionType.RESTYLE_TEXT,
    fontStyleText: FontStyleText,
    focusItem: ID[],
}

export type ChangeFontTextActionsType = {
    type: ActionType.CHANGE_FONT_TEXT,
    fontFamily: Fonts,
    focusItem: ID[],
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
}

export type ActionsType =
    UndoHistoryActionsType
    | RedoHistoryActionsType
    | ChangeBackgroundActionsType
    | ChangeFilterActionsType
    | RestyleTextActionsType
    | RecolorItemsActionsType
    | ResizeItemActionsType
    | MovingItemActionsType
    | AddItemActionsType
    | RemoveZoneActionsType
    | MovingZoneActionsType
    | SelectZoneActionsType
    | AddHistoryActionsType
    | ResizeCardActionsType
    | AddFocusItemActionsType
    | RemoveFocusItemActionsType
    | ChangeFontTextActionsType
    | ChangeTextsActionsType

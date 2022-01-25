import {
    Card,
    Coordinates,
    Fonts,
    FontStyleText,
    Item,
    Size,
    TypeArt,
} from "../../models/types";
import {ID} from "../../models/id";

export enum ActionType {
    RESIZE_CARD = 'RESIZE_CARD',
    ADD_HISTORY = 'ADD_HISTORY',
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEMS = 'REMOVE_ITEMS',
    MOVING_ITEM = 'MOVING_ITEM',
    MOVING_ITEMS_BY_DIFF = 'MOVING_ITEMS_BY_DIFF',
    RESIZE_ITEM = 'RESIZE_ITEM',
    RESIZE_ITEMS_BY_DIFF = 'RESIZE_ITEMS_BY_DIFF',
    SCALE_ITEMS = 'SCALE_ITEMS',
    RECOLOR_TEXTS = 'RECOLOR_TEXTS',
    CHANGE_TYPE_ARTS = 'CHANGE_TYPE_ARTS',
    CHANGE_FONT_SIZE_TEXTS = 'CHANGE_FONT_SIZE_TEXTS',
    RESTYLE_TEXT = 'RESTYLE_TEXT',
    CHANGE_FONT_TEXT = 'CHANGE_FONT_TEXT',
    CHANGE_FILTER = 'CHANGE_FILTER',
    CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
    REDO_HISTORY = 'REDO_HISTORY',
    UNDO_HISTORY = 'UNDO_HISTORY',
    ADD_FOCUS_ITEM = 'ADD_FOCUS_ITEM',
    REMOVE_FOCUS_ITEMS = 'REMOVE_FOCUS_ITEMS',
    CHANGE_TEXTS = 'CHANGE_TEXTS',
    UP_LAYER = 'UP_LAYER',
    DOWN_LAYER = 'DOWN_LAYER',
    CREATE_NEW_CARD_MAKER = 'CREATE_NEW_CARD',
    CHANGE_CARD = 'CHANGE_CARD',
    CHANGE_MULTIPLE_CHOICE = 'CHANGE_MULTIPLE_CHOICE',
}

export type ResizeItemsByDiffActionType = {
    type: ActionType.RESIZE_ITEMS_BY_DIFF,
    size: Size
}

export type ChangeMultipleChoiceActionType = {
    type: ActionType.CHANGE_MULTIPLE_CHOICE,
    multipleChoice: boolean,
}

export type UpLayerActionType = {
    type: ActionType.UP_LAYER,
}

export type DownLayerActionType = {
    type: ActionType.DOWN_LAYER,
}

export type ScaleItemsActionType = {
    type: ActionType.SCALE_ITEMS,
    scale: number
}

export type ChangeTypeArtsActionType = {
    type: ActionType.CHANGE_TYPE_ARTS,
    typeArt: TypeArt,
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


export type AddItemActionsType = {
    type: ActionType.ADD_ITEM,
    item: Item
}


export type MovingItemActionsType = {
    type: ActionType.MOVING_ITEM,
    id: ID,
    coordinates: Coordinates,
}

export type MovingItemsActionsType = {
    type: ActionType.MOVING_ITEMS_BY_DIFF,
    coordinates: Coordinates,
}

export type ResizeItemActionsType = {
    type: ActionType.RESIZE_ITEM,
    size: Size,
    coordinates: Coordinates,
    id: ID,
}

export type ChangeTextsActionsType = {
    type: ActionType.CHANGE_TEXTS,
    body: string,
}

export type RestyleTextActionsType = {
    type: ActionType.RESTYLE_TEXT,
    fontStyleText: FontStyleText,
}

export type ChangeFontTextActionsType = {
    type: ActionType.CHANGE_FONT_TEXT,
    fontFamily: Fonts,
}

export type ChangeFilterActionsType = {
    type: ActionType.CHANGE_FILTER,
    filter: string,
}


export type ChangeBackgroundActionsType = {
    type: ActionType.CHANGE_BACKGROUND,
    background: string,
}

export type RedoHistoryActionsType = {
    type: ActionType.REDO_HISTORY,
}


export type UndoHistoryActionsType = {
    type: ActionType.UNDO_HISTORY,
}

export type RecolorTextsActionsType = {
    type: ActionType.RECOLOR_TEXTS,
    color: string,
}

export type ChangeFontSizeTexts = {
    type: ActionType.CHANGE_FONT_SIZE_TEXTS,
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
    | AddHistoryActionsType
    | ResizeCardActionsType
    | AddFocusItemActionsType
    | RemoveFocusItemsActionsType
    | ChangeFontTextActionsType
    | ChangeTextsActionsType
    | RecolorTextsActionsType
    | ChangeFontSizeTexts
    | RemoveItemsActionsType
    | CreateNewCardMakerActionType
    | ChangeCardActionType
    | ChangeTypeArtsActionType
    | ScaleItemsActionType
    | UpLayerActionType
    | DownLayerActionType
    | ChangeMultipleChoiceActionType
    | ResizeItemsByDiffActionType

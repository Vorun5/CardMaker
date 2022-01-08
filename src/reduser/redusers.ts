import {ActionsType, ActionType} from "../actions/actions";
import {Card, CardMaker, Colors, emptyZone, History, Item, Size, TypeDate, Zone} from "../models/types";
import {ID} from "../models/id";
import {createStore} from "redux";

const cardReducer = (state: Card, action: ActionsType): Card => {
    switch (action.type) {
        case ActionType.CHANGE_CARD:
            return action.card
        default:
            return state
    }
}

const initialSizeCard: Size = {
    width: 600,
    height: 800,
}
const sizeCardReducer = (state = initialSizeCard, action: ActionsType): Size => {
    switch (action.type) {
        case ActionType.RESIZE_CARD:
            return action.size
        default:
            return state;
    }
}

const initialHistory: History = {
    list: [],
    currentIndex: -1,
}
const historyReducer = (state = initialHistory, action: ActionsType): History => {
    switch (action.type) {
        case ActionType.REDO_HISTORY: {
            if (state.currentIndex + 1 > state.list.length - 1) {
                return {
                    list: [...state.list],
                    currentIndex: state.list.length - 1
                }
            }
            return {
                list: [...state.list],
                currentIndex: state.currentIndex + 1
            }
        }
        case ActionType.UNDO_HISTORY: {

            if (state.list.length == 0) {
                return {
                    list: [...state.list],
                    currentIndex: -1
                }
            }
            if (state.currentIndex - 1 > 0) {
                return {
                    list: [...state.list],
                    currentIndex: state.currentIndex - 1
                }
            } else {
                return {
                    list: [...state.list],
                    currentIndex: 0
                }
            }
        }
        case ActionType.REMOVE_ALL_HISTORY:
            return {
                list: [],
                currentIndex: -1
            }
        case ActionType.ADD_HISTORY:
            if (state.list.length > state.currentIndex + 1) {
                state = {
                    ...state,
                    list: state.list.slice(0, state.currentIndex)
                }
            }
            let currentIndex = state.list.length
            return {
                list: [...state.list, action.card],
                currentIndex: currentIndex,
            }
        default:
            return state;
    }
}

const initialZone: Zone = {
    size: {
        width: 0,
        height: 0,
    },
    coordinates: {
        x: 0,
        y: 0,
    }
}
const zoneReducer = (state = initialZone, action: ActionsType): Zone => {
    switch (action.type) {
        case ActionType.SELECT_ZONE:
            return action.zone;
        case ActionType.MOVING_ZONE:
            return {
                ...state,
                coordinates: action.coordinates,
            };
        case ActionType.REMOVE_ZONE:
            return emptyZone
        default:
            return state;
    }
}

const initialItems: Item[] = []
const itemsReducer = (state = initialItems, action: ActionsType): Item[] => {
    switch (action.type) {
        case ActionType.REMOVE_ALL_ITEMS:
            return []
        case ActionType.ADD_ITEM:
            return [...state, action.item];
        case ActionType.MOVING_ITEM: {
            for (let j = 0; j < state.length; j++) {
                if (state[j].id == action.id) {
                    state[j] = {
                        ...state[j],
                        coordinates: action.coordinates
                    }
                }

            }
            return state
        }
        case ActionType.RESIZE_ITEM: {
            for (let j = 0; j < state.length; j++) {
                if (state[j].id == action.id) {
                    state[j] = {
                        ...state[j],
                        size: action.size
                    }
                }

            }
            return state
        }
        case ActionType.MOVING_ITEMS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {
                    if (state[j].id == action.focusItems[i]) {
                        state[j] = {
                            ...state[j],
                            coordinates: action.coordinates
                        }
                    }

                }

            }
            return state
        }
        case ActionType.RESTYLE_TEXT: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontStyle: action.fontStyleText
                            }

                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.RECOLOR_TEXTS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.RECOLOR_ARTS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.CHANGE_FONT_SIZE_TEXTS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontSize: action.fontSize
                            }
                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.CHANGE_FONT_TEXT: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontFamily: action.fontFamily
                            }
                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.CHANGE_TEXTS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                body: action.body
                            }

                            state[j] = {
                                ...state[j],
                                data: {
                                    ...bufDate
                                }
                            }

                        }
                    }

                }

            }

            return state
        }
        case ActionType.REMOVE_ITEMS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItems[i]) {


                        state = state.filter((el) => {
                            if (!(el.id == action.focusItems[i])) {
                                return el
                            }
                        })

                    }

                }

            }

            return state
        }
        default:
            return state;
    }
}

const filterReducer = (state: Colors, action: ActionsType): Colors => {
    switch (action.type) {
        case ActionType.CHANGE_FILTER:
            return action.filter;
        default:
            return state;
    }
}

const backgroundReducer = (state: Colors, action: ActionsType): Colors => {
    switch (action.type) {
        case ActionType.CHANGE_BACKGROUND:
            return action.background;
        default:
            return state;
    }
}

const initialFocusItem: ID[] = []

const focusItemReducer = (state = initialFocusItem, action: ActionsType): ID[] => {
    switch (action.type) {
        case ActionType.ADD_FOCUS_ITEM:
            return [...state, action.id]
        case ActionType.REMOVE_FOCUS_ITEMS:
            return []
        default:
            return state;
    }
}

//const initialRootCard: Card = {}
const rootCardReducer = (state: Card, action: ActionsType): Card => {
    return {
        ...state,
        size: sizeCardReducer(state.size, action),
        filter: filterReducer(state.filter, action),
        items: itemsReducer(state.items, action),
        zone: zoneReducer(state.zone, action),
        focusItems: focusItemReducer(state.focusItems, action),
        background: backgroundReducer(state.background, action)
    }
}


const initialState: CardMaker = {
    templates: [],
    history: {
        list: [],
        currentIndex: -1
    },
    card: {
        zone: {
            coordinates: {
                x: 0,
                y: 0,
            },
            size: {
                width: 0,
                height: 0,
            }
        },
        background: Colors.White,
        filter: Colors.None,
        size: {
            width: 800,
            height: 600
        },
        items: [],
        focusItems: []
    }
}
const rootReducer = (state = initialState, action: ActionsType): CardMaker => {
    return {
        ...state,
        history: historyReducer(state.history, action),
        card: {
            ...state.card,
            filter: filterReducer(state.card.filter, action),
            items: itemsReducer(state.card.items, action),
            zone: zoneReducer(state.card.zone, action),
            focusItems: focusItemReducer(state.card.focusItems, action),
            background: backgroundReducer(state.card.background, action)
        },
    }
}

// @ts-ignore
export let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

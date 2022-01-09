import {ActionsType, ActionType} from "../actions/actions";
import {Card, CardMaker, Colors, emptyZone, History, Item, Size, TypeDate, Zone} from "../models/types";
import {ID} from "../models/id";
import {createStore} from "redux";

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
const cardMakerReducer = (state = initialState, action: ActionsType): CardMaker => {
    switch (action.type) {
        case ActionType.CHANGE_CARD:
            return {...state, card: action.card}
        case ActionType.RESIZE_CARD:
            return {
                ...state,
                card: {...state.card, size: action.size}
            }
        case ActionType.SELECT_ZONE:
            return {
                ...state,
                card: {
                    ...state.card,
                    zone: action.zone
                }
            }
        case ActionType.MOVING_ZONE:
            return {
                ...state,
                card: {
                    ...state.card,
                    zone: {
                        ...state.card.zone,
                        coordinates: action.coordinates,
                    }
                }
            };
        case ActionType.REMOVE_ZONE:
            return {...state, card: {...state.card, zone: emptyZone}}
        case ActionType.CHANGE_FILTER:
            return {...state, card: {...state.card, filter: action.filter}}
        case ActionType.CHANGE_BACKGROUND:
            return {...state, card: {...state.card, background: action.background}}
        case ActionType.ADD_FOCUS_ITEM:
            return {
                ...state, card: {
                    ...state.card, focusItems: [...state.card.focusItems, action.id]
                }
            }
        case ActionType.REMOVE_FOCUS_ITEMS:
            return {...state, card: {...state.card, focusItems: []}}
        case ActionType.REDO_HISTORY: {
            if (state.history.currentIndex == -1) {
                return state
            }

            if (state.history.currentIndex + 1 == state.history.list.length) {
                return {
                    ...state,
                    history: {
                        list: [...state.history.list],
                        currentIndex: state.history.list.length - 1
                    }
                }
            }
            const card: Card = JSON.parse(String(state.history.list[state.history.currentIndex + 1]))
            return {
                ...state,
                history: {
                    list: [...state.history.list],
                    currentIndex: state.history.currentIndex + 1
                },
                card: card
            }
        }
        case ActionType.UNDO_HISTORY: {

            if (state.history.list.length == 0) {
                return {
                    ...state,
                    history: {
                        list: [...action.list],
                        currentIndex: -1
                    }
                }
            }
            if (state.history.currentIndex - 1 >= 0) {
                const card: Card = JSON.parse(String(state.history.list[state.history.currentIndex - 1]))
                return {
                    ...state,
                    history: {
                        list: [...action.list],
                        currentIndex: state.history.currentIndex - 1
                    },
                    card: card
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case ActionType.REMOVE_ALL_HISTORY:
            return {
                ...state,
                history: {
                    list: [],
                    currentIndex: -1
                }
            }
        case ActionType.ADD_HISTORY:
            if (state.history.list.length > state.history.currentIndex + 1) {
                state = {
                    ...state,
                    history: {
                        ...state.history,
                        list: state.history.list.slice(0, state.history.currentIndex + 1)
                    }
                }
            }
            let currentIndex = state.history.list.length
            return {
                ...state,
                history: {
                    list: [...state.history.list, action.card],
                    currentIndex: currentIndex,
                }
            }


        case ActionType.REMOVE_ALL_ITEMS:
            return {...state, card: {...state.card, items: []}}
        case ActionType.ADD_ITEM:
            return {...state, card: {...state.card, items: [...state.card.items, action.item]}}
        case ActionType.MOVING_ITEM: {
            for (let j = 0; j < state.card.items.length; j++) {
                if (state.card.items[j].id == action.id) {
                    state.card.items[j] = {
                        ...state.card.items[j],
                        coordinates: action.coordinates
                    }
                }

            }
            return state
        }
        case ActionType.RESIZE_ITEM: {
            for (let j = 0; j < state.card.items.length; j++) {
                if (state.card.items[j].id == action.id) {
                    state.card.items[j] = {
                        ...state.card.items[j],
                        size: action.size
                    }
                }

            }
            return state
        }
        case ActionType.MOVING_ITEMS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == action.focusItems[i]) {
                        state.card.items[j] = {
                            ...state.card.items[j],
                            coordinates: action.coordinates
                        }
                    }

                }

            }
            return state
        }
        case ActionType.RESTYLE_TEXT: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontStyle: action.fontStyleText
                            }

                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontSize: action.fontSize
                            }
                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontFamily: action.fontFamily
                            }
                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                body: action.body
                            }

                            state.card.items[j] = {
                                ...state.card.items[j],
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

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == action.focusItems[i]) {


                        state = {
                            ...state,
                            card: {
                                ...state.card,
                                items: state.card.items.filter((el) => {
                                    if (!(el.id == action.focusItems[i])) {
                                        return el
                                    }
                                })
                            }
                        }

                    }

                }

            }

            return state
        }
        default:
            return state
    }
}


const initialCard: Card = {
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
const cardReducer = (state = initialCard, action: ActionsType): Card => {
    switch (action.type) {
        case ActionType.CHANGE_CARD:
            return action.card
        case ActionType.RESIZE_CARD:
            return {...state, size: action.size}
        case ActionType.SELECT_ZONE:
            return {...state, zone: action.zone}
        case ActionType.MOVING_ZONE:
            return {
                ...state,
                zone: {
                    ...state.zone,
                    coordinates: action.coordinates,
                }
            };
        case ActionType.REMOVE_ZONE:
            return {...state, zone: emptyZone,}
        case ActionType.CHANGE_FILTER:
            return {...state, filter: action.filter};
        case ActionType.CHANGE_BACKGROUND:
            return {...state, background: action.background};
        case ActionType.ADD_FOCUS_ITEM:
            return {...state, focusItems: [...state.focusItems, action.id]}
        case ActionType.REMOVE_FOCUS_ITEMS:
            return {...state, focusItems: []}

        case ActionType.REMOVE_ALL_ITEMS:
            return {...state, items: []}
        case ActionType.ADD_ITEM:
            return {...state, items: [...state.items, action.item]};
        case ActionType.MOVING_ITEM: {
            for (let j = 0; j < state.items.length; j++) {
                if (state.items[j].id == action.id) {
                    state.items[j] = {
                        ...state.items[j],
                        coordinates: action.coordinates
                    }
                }

            }
            return state
        }
        case ActionType.RESIZE_ITEM: {
            for (let j = 0; j < state.items.length; j++) {
                if (state.items[j].id == action.id) {
                    state.items[j] = {
                        ...state.items[j],
                        size: action.size
                    }
                }

            }
            return state
        }
        case ActionType.MOVING_ITEMS: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.items.length; j++) {
                    if (state.items[j].id == action.focusItems[i]) {
                        state.items[j] = {
                            ...state.items[j],
                            coordinates: action.coordinates
                        }
                    }

                }

            }
            return state
        }
        case ActionType.RESTYLE_TEXT: {
            for (let i = 0; i < action.focusItems.length; i++) {

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontStyle: action.fontStyleText
                            }

                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                color: action.color
                            }
                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontSize: action.fontSize
                            }
                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                fontFamily: action.fontFamily
                            }
                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {
                        let bufDate = state.items[j].data
                        if (bufDate.type == TypeDate.TextCard) {

                            bufDate = {
                                ...bufDate,
                                body: action.body
                            }

                            state.items[j] = {
                                ...state.items[j],
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

                for (let j = 0; j < state.items.length; j++) {

                    if (state.items[j].id == action.focusItems[i]) {


                        state = {
                            ...state,
                            items: state.items.filter((el) => {
                                if (!(el.id == action.focusItems[i])) {
                                    return el
                                }
                            })
                        }

                    }

                }

            }

            return state
        }
        default:
            return state
    }
}

const initialHistory: History = {
    list: [],
    currentIndex: -1,
}
const historyReducer = (state = initialHistory, action: ActionsType): History => {
    switch (action.type) {
        case ActionType.REDO_HISTORY: {
            if (state.currentIndex == -1) {
                return state
            }

            if (state.currentIndex + 1 == state.list.length) {
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
                    list: [...action.list],
                    currentIndex: -1
                }
            }
            if (state.currentIndex - 1 > 0) {
                return {
                    list: [...action.list],
                    currentIndex: state.currentIndex - 1
                }
            } else {
                return {
                    list: [...action.list],
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


const rootReducer = (state = initialState, action: ActionsType): CardMaker => {
    return {
        ...state,
        history: historyReducer(state.history, action),
        card: cardReducer(state.card, action),
    }
}

// @ts-ignore
export let store = createStore(cardMakerReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

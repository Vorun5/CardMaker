import {ActionsType, ActionType} from "../actions/actions";
import {Card, CardMaker, emptyFocusItems, Item, TypeDate,} from "../models/types";
import {createStore} from "redux";


const minSize = 30
const initialState: CardMaker = {
    templates: [],
    history: {
        list: [],
        currentIndex: -1
    },
    card: {
        multipleChoice: false,
        background: '#FFFFFF',
        filter: 'transparent',
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
        case ActionType.CHANGE_MULTIPLE_CHOICE: {
            return {
                ...state,
                card: {
                    ...state.card,
                    multipleChoice: action.multipleChoice
                }
            }
        }
        case ActionType.CREATE_NEW_CARD_MAKER: {
            return initialState
        }
        case ActionType.CHANGE_CARD:
            return {...state, card: action.card}
        case ActionType.RESIZE_CARD:
            return {
                ...state,
                card: {...state.card, size: action.size}
            }
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
                        ...state.history,
                        currentIndex: -1
                    }
                }
            }
            if (state.history.currentIndex - 1 >= 0) {
                const card: Card = JSON.parse(String(state.history.list[state.history.currentIndex - 1]))
                return {
                    ...state,
                    history: {
                        ...state.history,
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
        case ActionType.MOVING_ITEMS_BY_DIFF: {
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        state.card.items[j] = {
                            ...state.card.items[j],
                            coordinates: {
                                x: state.card.items[j].coordinates.x + action.coordinates.x,
                                y: state.card.items[j].coordinates.y + action.coordinates.y
                            }
                        }
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
                        size: action.size,
                        coordinates: action.coordinates
                    }
                }

            }
            return state
        }

        case ActionType.SCALE_ITEMS: {
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        let width = state.card.items[j].size.width * action.scale
                        let height = state.card.items[j].size.height * action.scale
                        if (width < minSize) {
                            width = minSize
                        }
                        if (height < minSize) {
                            height = minSize
                        }
                        state.card.items[j] = {
                            ...state.card.items[j],
                            size: {
                                width: width,
                                height: height,
                            }
                        }
                    }

                }

            }
            return state
        }

        case ActionType.RESIZE_ITEMS_BY_DIFF: {
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        let width = state.card.items[j].size.width + action.size.width
                        let height = state.card.items[j].size.height + action.size.height
                        if (width < minSize) {
                            width = minSize
                        }
                        if (height < minSize) {
                            height = minSize
                        }
                        state.card.items[j] = {
                            ...state.card.items[j],
                            size: {
                                width: width,
                                height: height,
                            }
                        }
                    }

                }

            }
            return state
        }
        case ActionType.RESTYLE_TEXT: {
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
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
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
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
        case ActionType.CHANGE_TYPE_ARTS: {

            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        let bufDate = state.card.items[j].data
                        if (bufDate.type == TypeDate.Art) {

                            bufDate = {
                                ...bufDate,
                                typeArt: action.typeArt
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
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
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
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
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
            for (let i = 0; i < state.card.focusItems.length; i++) {

                for (let j = 0; j < state.card.items.length; j++) {

                    if (state.card.items[j].id == state.card.focusItems[i]) {
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
            for (let i = 0; i < state.card.focusItems.length; i++) {
                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        state = {
                            ...state,
                            card: {
                                ...state.card,
                                items: state.card.items.filter((el) => {
                                    if (!(el.id == state.card.focusItems[i])) {
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
        case ActionType.DOWN_LAYER: {
            let bufItems: Item[] = []
            for (let i = 0; i < state.card.focusItems.length; i++) {
                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        bufItems = [...bufItems, state.card.items[j]]
                        state = {
                            ...state,
                            card: {
                                ...state.card,
                                items: state.card.items.filter((el) => {
                                    if (!(el.id == state.card.focusItems[i])) {
                                        return el
                                    }
                                })
                            }
                        }

                    }

                }

            }
            state = {
                ...state,
                card: {
                    ...state.card,
                    items: [...bufItems, ...state.card.items]
                }
            }
            return state
        }
        case ActionType.UP_LAYER: {
            let bufItems: Item[] = []
            for (let i = 0; i < state.card.focusItems.length; i++) {
                for (let j = 0; j < state.card.items.length; j++) {
                    if (state.card.items[j].id == state.card.focusItems[i]) {
                        bufItems = [...bufItems, state.card.items[j]]
                        state = {
                            ...state,
                            card: {
                                ...state.card,
                                items: state.card.items.filter((el) => {
                                    if (!(el.id == state.card.focusItems[i])) {
                                        return el
                                    }
                                })
                            }
                        }

                    }

                }

            }
            state = {
                ...state,
                card: {
                    ...state.card,
                    items: [...state.card.items, ...bufItems,]
                }
            }
            return state
        }
        default:
            return state
    }
}


// @ts-ignore
export let store = createStore(cardMakerReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

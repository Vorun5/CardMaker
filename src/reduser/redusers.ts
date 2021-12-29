import {ActionsType, ActionType} from "../actions/actions";
import {
    Card,
    CardMaker,
    Colors,
    emptyZone,
    Fonts,
    FontStyle,
    FontWeight,
    History,
    Item,
    TextDecoration,
    TypeArt,
    TypeDate,
    Zone
} from "../models/types";
import {ID, id} from "../models/id";
import {createStore} from "redux";
import {addFocusItem, addItem, changeFilter, restyleText, selectZone} from "../actions/actionsCreaters";

const initialCard: Card = {
    background: Colors.White,
    focusItems: [],
    zone: {
        coordinates: {
            x: 0, y: 0,
        },
        size: {
            width: 0,
            height: 0,
        }
    },
    filter: Colors.None,
    size: {
        width: 800,
        height: 600,
    },
    items: []
}
const cardReducer = (state = initialCard, action: ActionsType): Card => {
    switch (action.type) {
        case ActionType.RESIZE_CARD:
            return {
                ...state,
                size: action.size
            };
        default:
            return state;
    }
}


const initialHistory: History = {
    list: [],
    currentIndex: 0,
}
const historyReducer = (state = initialHistory, action: ActionsType): History => {
    switch (action.type) {
        case ActionType.ADD_HISTORY:
            if (state.list.length > state.currentIndex) {
                state = {
                    ...state,
                    list: state.list.slice(0, state.currentIndex + 1)
                }
            }
            let list = state.list
            return {
                list: [...list, action.card],
                currentIndex: state.list.length,
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
        case ActionType.ADD_ITEM:
            return [...state, action.item];
        case ActionType.MOVING_ITEM: {
            let bufState = state
            let bufItem: Item
            bufState = bufState.filter(item => item.id !== action.id)
            for (let i = 0; i < state.length; i++) {
                if (state[i].id == action.id) {
                    bufItem = state[i]
                    state = [...bufState, {...bufItem, coordinates: action.coordinates}]
                    return state
                }
            }
            return state
        }
        case ActionType.RESTYLE_TEXT: {
            for (let i = 0; i < action.focusItem.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItem[i]) {
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
        case ActionType.RECOLOR_ITEMS: {
            for (let i = 0; i < action.focusItem.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItem[i]) {
                        let bufDate = state[j].data
                        if (bufDate.type == TypeDate.TextCard || bufDate.type == TypeDate.Art) {

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
        case ActionType.CHANGE_FONT_TEXT: {
            for (let i = 0; i < action.focusItem.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItem[i]) {
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
            for (let i = 0; i < action.focusItem.length; i++) {

                for (let j = 0; j < state.length; j++) {

                    if (state[j].id == action.focusItem[i]) {
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
        case ActionType.REMOVE_FOCUS_ITEM:
            return []
        default:
            return state;
    }
}

const initialState: CardMaker = {
    templates: [],
    history: {
        list: [],
        currentIndex: 0
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
        items: [
            {
                id: id(),
                data: {
                    fontSize: 20,
                    type: TypeDate.TextCard,
                    body: "Hi world!",
                    color: Colors.Purple,
                    fontFamily: Fonts.Montserrat,
                    fontStyle: {
                        fontStyle: FontStyle.normal,
                        fontWeight: FontWeight.bolt,
                        textDecoration: TextDecoration.lineThrough,
                    }
                },
                size: {
                    width: 50,
                    height: 100,
                },
                coordinates: {
                    x: 100,
                    y: 200,
                }
            }
        ],
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

store.dispatch(selectZone({coordinates: {x: 101, y: 102}, size: {width: 0, height: 2}}))
store.dispatch(selectZone({coordinates: {x: 3123, y: 123123}, size: {width: 0, height: 2}}))
store.dispatch(changeFilter(Colors.Red))

store.dispatch(addItem(
    {
        id: id(),
        data: {
            fontSize: 36,
            type: TypeDate.TextCard,
            body: "KEKWasdasdasdasdasdasd",
            color: Colors.Red,
            fontFamily: Fonts.Lora,
            fontStyle: {
                fontStyle: FontStyle.normal,
                fontWeight: FontWeight.normal,
                textDecoration: TextDecoration.normal
            }
        },
        size: {
            width: 100,
            height: 155,
        },
        coordinates: {
            x: 200,
            y: 100,
        }
    }
))

const test = store.getState().card.items[0].id
store.dispatch(addItem({
    id: id(),
    coordinates: {
        x: 400,
        y: 400,
    },
    size: {
        width: 150,
        height: 50,
    },
    data: {
        type: TypeDate.Art,
        typeArt: TypeArt.Circle,
        color: Colors.Purple
    }
}))

store.dispatch(addItem({
    id: id(),
    coordinates: {
        x: 260,
        y: 270,
    },
    size: {
        width: 500,
        height: 50,
    },
    data: {
        type: TypeDate.Art,
        typeArt: TypeArt.Square,
        color: Colors.Red
    }
}))
store.dispatch(addItem({
    id: id(),
    coordinates: {
        x: 500,
        y: 400,
    },
    size: {
        width: 100,
        height: 120,
    },
    data: {
        type: TypeDate.IMG,
        url: 'https://images.pexels.com/photos/5584265/pexels-photo-5584265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    }
}))
const test2 = store.getState().card.items[2].id

store.dispatch(addFocusItem(test2))

store.dispatch(selectZone({
    size: {
        width: 300,
        height: 250,
    },
    coordinates: {
        x: 40,
        y: 30,
    }
}))

store.dispatch(changeFilter(Colors.None))

store.dispatch(restyleText({
        fontWeight: FontWeight.normal,
        fontStyle: FontStyle.italic,
        textDecoration: TextDecoration.normal
    },
    [store.getState().card.items[0].id]))

store.dispatch(restyleText({
        fontWeight: FontWeight.bolt,
        fontStyle: FontStyle.italic,
        textDecoration: TextDecoration.normal
    },
    [store.getState().card.items[1].id]))

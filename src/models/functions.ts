import {Card, CardMaker, Colors, Coordinates, FontStyle, Item, Size, TypeDate, Zone} from "./types";


// Изменить размеры карточки карточки
export const resizeCard = (cardMaker: CardMaker, size: Size): CardMaker => {
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            size: size
        }
    }
}

// добавить карточку в историю
export const addHistory = (cardMaker: CardMaker, card: Card): CardMaker => {
    if (cardMaker.history.list.length > cardMaker.history.currentIndex) {
        cardMaker = {
            ...cardMaker,
            history: {
                ...cardMaker.history,
                list: cardMaker.history.list.slice(0, cardMaker.history.currentIndex + 1)
            }
        }
    }
    return {
        ...cardMaker,
        history: {
            list: [...cardMaker.history.list, JSON.stringify(card)],
            currentIndex: cardMaker.history.list.length
        }
    }
}

// Вперёд по истории команд
// export const redoHistory = (cardMaker: CardMaker): CardMaker => {
//     if (cardMaker.history.list.length == cardMaker.history.currentIndex || cardMaker.history.list.length <= 0) {
//         return cardMaker
//     } else {
//         return cardMaker = {
//             ...cardMaker,
//             card: cardMaker.history.list[cardMaker.history.currentIndex + 1],
//             history: {
//                 ...cardMaker.history,
//                 currentIndex: cardMaker.history.currentIndex + 1
//             }
//         }
//     }
// }

// Назад по истории команд
// export const undoHistory = (cardMaker: CardMaker): CardMaker => {
//     if (cardMaker.history.list.length <= 0) {
//         return cardMaker
//     } else {
//         return cardMaker = {
//             ...cardMaker,
//             card: cardMaker.history.list[cardMaker.history.currentIndex - 1],
//             history: {
//                 ...cardMaker.history,
//                 currentIndex: cardMaker.history.currentIndex - 1
//             }
//         }
//     }
// }

// Выделение области на карточке
export const selectZone = (cardMaker: CardMaker, zone: Zone): CardMaker => {
    cardMaker = {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            focusItems: []
        }
    }
    cardMaker.card.items.forEach((el, i) => {
        if (((zone.coordinates.x + zone.size.width >= el.coordinates.x) && (zone.coordinates.y + zone.size.height >= el.coordinates.y) && ((zone.coordinates.y <= el.coordinates.y) || (zone.coordinates.x <= el.coordinates.x)))
            ||
            ((el.coordinates.x + el.size.width >= zone.coordinates.x) && (el.coordinates.y + el.size.height >= zone.coordinates.y) && ((el.coordinates.y <= zone.coordinates.y) || (el.coordinates.x <= zone.coordinates.x)))) {
            cardMaker = {
                ...cardMaker,
                card: {
                    ...cardMaker.card,
                    focusItems: [...cardMaker.card.focusItems, el.id]
                }
            }
        }
    })
    return cardMaker
}

// Перемещение выделенной области
export const movingZone = (cardMaker: CardMaker, coordinates: Coordinates): CardMaker => {
    cardMaker = {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            zone: {
                ...cardMaker.card.zone,
                coordinates: coordinates,
            }
        }
    }
    return selectZone(cardMaker, cardMaker.card.zone)
}

// Удаление выделенной области
export const removeZone = (cardMaker: CardMaker): CardMaker => {
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            focusItems: [],
            zone: {
                size: {
                    width: 0,
                    height: 0
                },
                coordinates: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
}

// Добавить элемент
export const addItem = (cardMaker: CardMaker, item: Item): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            items: [...cardMaker.card.items, item]
        }
    }
}

// Удаление элементов
export const removeItems = (cardMaker: CardMaker): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    if (cardMaker.card.focusItems.length != 0) {
        return {
            ...cardMaker,
            card: {
                ...cardMaker.card,
                items: cardMaker.card.items.filter((el, i) => {
                    for (let key in cardMaker.card.focusItems) {
                        if (!(el.id == key)) {
                            return el
                        }
                    }
                })
            }
        }
    } else {
        return cardMaker;
    }
}

// Перемещение элемент
export const movingItem = (cardMaker: CardMaker, coordinates: Coordinates): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    if (cardMaker.card.focusItems.length == 1) {
        return {
            ...cardMaker,
            card: {
                ...cardMaker.card,
                items: cardMaker.card.items.filter((el, i) => {
                    if (el.id == cardMaker.card.focusItems[0]) {
                        return {
                            ...el,
                            coordinates: coordinates
                        }
                    } else {
                        return el
                    }
                })
            }
        }
    } else {
        return cardMaker;
    }
}

// Изменить размер элемента
export const resizeItem = (cardMaker: CardMaker, size: Size): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    if (cardMaker.card.focusItems.length == 1) {
        return {
            ...cardMaker,
            card: {
                ...cardMaker.card,
                items: cardMaker.card.items.filter((el, i) => {
                    if (el.id == cardMaker.card.focusItems[0]) {
                        return {
                            ...el,
                            size: size
                        }
                    } else {
                        return el
                    }
                })
            }
        }
    } else {
        return cardMaker;
    }
}

// Изменить цвет элементов
export const recolorItems = (cardMaker: CardMaker, color: Colors): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    if (cardMaker.card.focusItems.length != 0) {
        return {
            ...cardMaker,
            card: {
                ...cardMaker.card,
                items: cardMaker.card.items.filter((el, i) => {
                    for (let key in cardMaker.card.focusItems) {
                        if (el.id == key && (el.data.type == TypeDate.TextCard || el.data.type == TypeDate.Art)) {
                            return {
                                ...el,
                                data: {
                                    ...el.data,
                                    color: color
                                }
                            }
                        }
                    }
                    return el
                })
            }
        }
    } else {
        return cardMaker;
    }
}

// Изменение стиля текста
export const restyleText = (cardMaker: CardMaker, style: FontStyle): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    if (cardMaker.card.focusItems.length == 1) {
        return {
            ...cardMaker,
            card: {
                ...cardMaker.card,
                items: cardMaker.card.items.filter((el, i) => {
                    if (el.id == cardMaker.card.focusItems[0] && el.data.type == TypeDate.TextCard) {
                        return {
                            ...el,
                            data: {
                                ...el.data,
                                fontStyle: style
                            }
                        }
                    } else {
                        return el
                    }
                })
            }
        }
    } else {
        return cardMaker;
    }
}

// Установить или изменить фильтр
export const addFilter = (cardMaker: CardMaker, filter: Colors): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            filter: filter,
        }
    }
}

// Удалить фильтры с карточки
export const removeFilter = (cardMaker: CardMaker): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            filter: Colors.None,
        }
    }
}

// Установить или изменить фон
export const addBackground = (cardMaker: CardMaker, background: string): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            background: Colors.None,
        }
    }
}

// Удалить фон
export const removeBackground = (cardMaker: CardMaker): CardMaker => {
    cardMaker = addHistory(cardMaker, cardMaker.card)
    return {
        ...cardMaker,
        card: {
            ...cardMaker.card,
            background: Colors.None,
        }
    }
}

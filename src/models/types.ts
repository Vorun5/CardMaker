import {id, ID} from "./id";

export const emptyFocusItems: ID[] = []

export enum TypeArt {
    Fox = "Лиса",
    Bat = "Летучая мышь",
    World = "Земной шар",
    Butterfly = "Бабочка",
    Moon = "Луна",
    Rocket = "Ракета",
    NewYear = "Новый год",
    Sun = "Солнце",
    ChristmasTree = "Новогодняя ёлка",
    Snow = "Снег",
    Snowflake = "Снежинка",
    Santa = "Санта",
    NightCat = "Ночной кот",
    Stars = "Звёзды",
    Present = "Подарок",
    Cake = "Торт",
    Astronaut = "Космонавт",
}

export const allTypeArtList = [TypeArt.Astronaut, TypeArt.Cake, TypeArt.Present, TypeArt.Stars, TypeArt.NightCat, TypeArt.Santa, TypeArt.Snowflake, TypeArt.Snow, TypeArt.Fox, TypeArt.Bat, TypeArt.World, TypeArt.Butterfly, TypeArt.Moon, TypeArt.Rocket, TypeArt.Sun, TypeArt.NewYear, TypeArt.ChristmasTree]

export enum TypeDate {
    TextCard = 'TextCard',
    IMG = 'IMG',
    Art = 'Art'
}


export enum Fonts {
    TimeNewRoman = 'Times New Roman',
    Montserrat = 'Montserrat',
    Lora = 'Lora',
    Roboto = 'Roboto',
    Areal = 'Areal'
}

export const allFontsList: Fonts[] = [Fonts.Montserrat, Fonts.TimeNewRoman, Fonts.Lora, Fonts.Areal, Fonts.Roboto]

export type Coordinates = Readonly<{
    x: number,
    y: number
}>

export type Size = Readonly<{
    width: number,
    height: number
}>

export type History = Readonly<{
    list: string[],
    currentIndex: number,
}>

export enum FontStyle {
    normal = 'normal',
    italic = 'italic'
}

export enum FontWeight {
    normal = 400,
    bolt = 700
}

export enum TextDecoration {
    normal = 'none',
    lineThrough = 'line-through',
}


export type FontStyleText = Readonly<{
    fontStyle: FontStyle, // font-style 'normal' - это дефолт, 'italic' - это италик
    fontWeight: FontWeight, // font-weight 400 - это дефолт, а 700 bolt
    textDecoration: TextDecoration, // text-decoration 'none' и 'line-through'
}>


export type Template = Readonly<{
    title: string,
    path: string,
    card: Card
}>
export const allTemplates: Template[] = [{
    title: "Новый год!",
    path: "Новый год",
    card: {
        multipleChoice: false,
        background: "#bae7f2",
        filter: "transparent",
        size: {width: 800, height: 600},
        items: [{
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snow},
            size: {width: 1250, height: 730},
            coordinates: {x: -135, y: -7}
        }, {
            id: id(),
            data: {
                fontSize: 30,
                type: TypeDate.TextCard,
                body: "C Новым 2022 годом!",
                color: "#e194a7",
                fontFamily: Fonts.Roboto,
                fontStyle: {
                    fontStyle: FontStyle.normal,
                    fontWeight: FontWeight.bolt,
                    textDecoration: TextDecoration.normal
                }
            },
            size: {width: 456, height: 177},
            coordinates: {x: 442, y: 53}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Santa},
            size: {width: 472, height: 431},
            coordinates: {x: 21, y: 196}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.NewYear},
            size: {width: 250.43337000000005, height: 270.64125},
            coordinates: {x: 156, y: 17}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snowflake},
            size: {width: 30, height: 55},
            coordinates: {x: 400, y: 321}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snowflake},
            size: {width: 30, height: 105},
            coordinates: {x: 456, y: 85}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snowflake},
            size: {width: 40, height: 190},
            coordinates: {x: 627, y: 5}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.ChristmasTree},
            size: {width: 357, height: 335},
            coordinates: {x: 449, y: 272}
        }],
        focusItems: []
    }
}, {
    title: "Хэллоуин",
    path: "Хэллоуин",
    card: {
        multipleChoice: false,
        background: "#9462a6",
        filter: "transparent",
        size: {width: 800, height: 600},
        items: [{
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.NightCat},
            size: {width: 775, height: 688},
            coordinates: {x: 20, y: -20}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Bat},
            size: {width: 221.61600000000004, height: 211.41},
            coordinates: {x: 20, y: 20}
        }, {
            id: id(),
            data: {
                fontSize: 40,
                type: TypeDate.TextCard,
                body: "BOO",
                color: "#e3ec9c",
                fontFamily: Fonts.Montserrat,
                fontStyle: {
                    fontStyle: FontStyle.normal,
                    fontWeight: FontWeight.normal,
                    textDecoration: TextDecoration.normal
                }
            },
            size: {width: 150, height: 50},
            coordinates: {x: 40, y: 427}
        }],
        focusItems: []
    }
}, {
    title: "С Днём Рождения!",
    path: "сдр",
    card: {
        multipleChoice: false,
        background: "#bcf5ec",
        filter: "transparent",
        size: {width: 800, height: 600},
        items: [{
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Stars},
            size: {width: 986.2710000000002, height: 671.8030000000002},
            coordinates: {x: -20, y: 30}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Cake},
            size: {width: 468, height: 366},
            coordinates: {x: 22, y: 205}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Present},
            size: {width: 252, height: 347},
            coordinates: {x: 511, y: 297}
        }, {
            id: id(),
            data: {
                fontSize: 66,
                type: TypeDate.TextCard,
                body: "С Днём Рождения!",
                color: "#ff943d",
                fontFamily: Fonts.Montserrat,
                fontStyle: {
                    fontStyle: FontStyle.normal,
                    fontWeight: FontWeight.bolt,
                    textDecoration: TextDecoration.normal
                }
            },
            size: {width: 675, height: 108},
            coordinates: {x: 69, y: 41}
        }],
        focusItems: []
    }
}, {
    title: "Космос",
    path: "Космос",
    card: {
        multipleChoice: false,
        background: "#7f5b95",
        filter: "transparent",
        size: {width: 800, height: 600},
        items: [{
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snow},
            size: {width: 789, height: 373},
            coordinates: {x: 5, y: -1}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Snow},
            size: {width: 796, height: 351},
            coordinates: {x: -13, y: 272}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.World},
            size: {width: 354.20000000000005, height: 364.1},
            coordinates: {x: 172, y: 213}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Moon},
            size: {width: 187, height: 186},
            coordinates: {x: 2, y: 102}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Astronaut},
            size: {width: 116, height: 170},
            coordinates: {x: 422, y: 60}
        }, {
            id: id(),
            data: {type: TypeDate.Art, typeArt: TypeArt.Rocket},
            size: {width: 274.67, height: 356.95000000000005},
            coordinates: {x: 546, y: 31}
        }],
        focusItems: []
    }
}]
export type IMG = Readonly<{
    type: TypeDate.IMG,
    url: string
}>

export type TextCard = Readonly<{
    type: TypeDate.TextCard
    body: string,
    fontFamily: Fonts,
    color: string,
    fontStyle: FontStyleText,
    fontSize: number,
}>

export type Art = Readonly<{
    type: TypeDate.Art
    typeArt: TypeArt,
}>

export type Item = Readonly<{
    id: ID,
    coordinates: Coordinates,
    size: Size,
    data: IMG | TextCard | Art
}>

export type Card = Readonly<{
    filter: string,
    multipleChoice: boolean,
    background: string,
    items: Item[],
    focusItems: ID[],
    size: Size,
}>

export const emptyMultipleChoice: boolean = false
export type CardMaker = Readonly<{
    templates: Template[],
    history: History,
    card: Card
}>

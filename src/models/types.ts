import {ID} from "./id";

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
    ChristmasTree = "Новогодняя ёлка"
}
export const allTypeArtList = [TypeArt.Fox, TypeArt.Bat, TypeArt.World, TypeArt.Butterfly, TypeArt.Moon, TypeArt.Rocket, TypeArt.Sun, TypeArt.NewYear, TypeArt.ChristmasTree]

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
    card: string
}>

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

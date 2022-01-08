import {ID} from "./id";

export enum TypeArt {
    Circle = 'Circle',
    Square = 'Square',
    Triangle = 'Triangle',
    // Star = 'Star',
    // Heart = 'Heart'
}

export enum TypeDate {
    TextCard = 'TextCard',
    IMG = 'IMG',
    Art = 'Art'
}

export enum Colors {
    White = 'rgb(255, 255, 255)',
    Red = 'rgb(255, 77, 24)', //#f24d18
    Blue = 'rgb(105, 156, 247)', //#699cf7
    Green = 'rgb(6, 171, 87)', //#06ab57
    Yellow = 'rgb(255, 200, 0)', //#ffc800
    Purple = 'rgb(152, 69, 255)', //#9845ff
    Grey = 'rgb(128, 128, 128)', //#808080
    None = 'transparent',
}

export const allColorsList: Colors[] = [Colors.White, Colors.Red, Colors.Blue, Colors.Green, Colors.Yellow, Colors.Purple, Colors.Grey]

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

export type Zone = Readonly<{
    coordinates: Coordinates,
    size: Size,
}>

export const emptyZone: Zone = {
    size: {
        width: 0,
        height: 0,
    },
    coordinates: {
        x: 0,
        y: 0
    }
}


export const emptyFocusItem: ID[] = []

export type IMG = Readonly<{
    type: TypeDate.IMG,
    url: string
}>

export type TextCard = Readonly<{
    type: TypeDate.TextCard
    body: string,
    fontFamily: Fonts,
    color: Colors,
    fontStyle: FontStyleText,
    fontSize: number,
}>

export type Art = Readonly<{
    type: TypeDate.Art
    typeArt: TypeArt,
    color: Colors
}>

export type Item = Readonly<{
    id: ID,
    coordinates: Coordinates,
    size: Size,
    data: IMG | TextCard | Art
}>

export type Card = Readonly<{
    zone: Zone, // {size: {0, 0}, coordinates: {0, 0}} - нулевое значение
    filter: Colors, // Colors.None -  - нулевое значение
    background: Colors, // Colors.None  - нулевое значение
    items: Item[],
    focusItems: ID[],
    size: Size,
}>

export type CardMaker = Readonly<{
    templates: Card[],
    history: History,
    card: Card
}>

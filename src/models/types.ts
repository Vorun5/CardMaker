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


export type Template = Readonly<{
    title: string,
    card: string
}>

const allTemplates: Template[] = []

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
}>

export type Item = Readonly<{
    id: ID,
    coordinates: Coordinates,
    size: Size,
    data: IMG | TextCard | Art
}>

export type Card = Readonly<{
    filter: Colors, // Colors.None -  - нулевое значение
    background: Colors, // Colors.None  - нулевое значение
    items: Item[],
    focusItems: ID[],
    size: Size,
}>

export type CardMaker = Readonly<{
    templates: Template[],
    history: History,
    card: Card
}>

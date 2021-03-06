import React, {useEffect, useState} from 'react';
import {Card, CardMaker, Coordinates, History, Size} from "../../models/types";
import {connect} from "react-redux";
import c from './CardView.module.scss'
import {ID} from "../../models/id";
import {
    addFocusItem,
    movingItem,
    movingItemsByDiff,
    removeFocusItems,
    resizeItem, resizeItemsByDiff, scaleItems
} from "../../store/actions/actionsCreaters";
import {
    AddFocusItemActionsType, MovingItemActionsType,
    RemoveFocusItemsActionsType, ResizeItemActionsType,
} from "../../store/actions/actions";
import ItemView from "./ItemView/ItemView";
import {store} from "../../store/reduser/redusers";


type editSizeMode = {
    widthRight: boolean,
    widthLeft: boolean,
    heightTop: boolean,
    heightButton: boolean,
    cornerTopLeft: boolean,
    cornerTopRight: boolean,
    cornerButtonLeft: boolean,
    cornerButtonRight: boolean,
}
let isPressed = false
const step: number = 10

function kyeUpHandler(event: KeyboardEvent) {
    if (isPressed) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            isPressed = false
        }
    }
}

function kyeDownHandler(event: KeyboardEvent) {

    if (!isPressed) {
        if (event.ctrlKey) {
            if (event.code === 'ArrowUp') {
                isPressed = true
                store.dispatch(scaleItems(1.1))
            }
            if (event.code === 'ArrowDown') {
                isPressed = true
                store.dispatch(scaleItems(0.9))
            }
            return
        }

        if (event.shiftKey) {
            if (event.code === 'ArrowUp') {
                isPressed = true
                store.dispatch(resizeItemsByDiff({width: 0, height: -step}))
            }
            if (event.code === 'ArrowDown') {
                isPressed = true
                store.dispatch(resizeItemsByDiff({width: 0, height: step}))
            }
            if (event.code === 'ArrowLeft') {
                isPressed = true
                store.dispatch(resizeItemsByDiff({width: -step, height: 0}))
            }
            if (event.code === 'ArrowRight') {
                isPressed = true
                store.dispatch(resizeItemsByDiff({width: step, height: 0}))
            }
            return
        }
        if (event.code === 'ArrowUp') {
            store.dispatch(movingItemsByDiff({x: 0, y: -step}))
            isPressed = true
        }
        if (event.code === 'ArrowDown') {
            store.dispatch(movingItemsByDiff({x: 0, y: step}))
            isPressed = true
        }
        if (event.code === 'ArrowLeft') {
            store.dispatch(movingItemsByDiff({x: -step, y: 0}))
            isPressed = true
        }
        if (event.code === 'ArrowRight') {
            store.dispatch(movingItemsByDiff({x: step, y: 0}))
            isPressed = true
        }
    }

}

function itsFocus(el: ID, listID: ID[]): boolean {
    for (let i = 0; i < listID.length; i++) {
        if (el === listID[i]) {
            return true;
        }
    }
    return false
}

const sizeBorder = 20
const minSize = 60


interface CardViewProps {
    card: Card,
    history: History,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    movingItem: (id: ID, coordinate: Coordinates) => MovingItemActionsType,
    resizeItem: (id: ID, size: Size, coordinate: Coordinates) => ResizeItemActionsType,
    multipleChoice: boolean,
    refSave: React.RefObject<HTMLDivElement>,
}

const CardView: React.FC<CardViewProps> = ({
                                               multipleChoice,
                                               movingItem,
                                               resizeItem,
                                               card,
                                               addFocusItem,
                                               removeFocusItems,
                                               refSave
                                           }) => {


    useEffect(() => {
        document.addEventListener("keydown", kyeDownHandler)
        document.addEventListener("keyup", kyeUpHandler)
        return () => {
            document.removeEventListener("keydown", kyeDownHandler)
            document.removeEventListener("keyup", kyeUpHandler)
        }
    }, [])
    const [editCoordinatesMode, setEditCoordinatesMode] = useState<boolean>(false)
    const [editSizeMode, setEditSizeMode] = useState<editSizeMode>({
        widthRight: false,
        widthLeft: false,
        heightTop: false,
        heightButton: false,
        cornerButtonLeft: false,
        cornerButtonRight: false,
        cornerTopLeft: false,
        cornerTopRight: false
    })
    const [startCoordinates, setStartCoordinates] = useState<Coordinates>({x: 0, y: 0})
    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0})
    const [size, setSize] = useState<Size>({width: 0, height: 0})
    const [itemId, setItemID] = useState<ID>("")


    function editCoordinatesItem(event: React.MouseEvent, id: ID, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setCoordinates(coordinates)
        setItemID(id)
        setEditCoordinatesMode(true)
    }

    function editSize(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setSize(size)
        setItemID(id)
        setCoordinates(coordinates)
    }

    function changeCoordinatesItem(event: React.MouseEvent, id: ID, editCoordinatesMode: boolean, startCoordinates: Coordinates, coordinates: Coordinates) {
        if (editCoordinatesMode) {
            movingItem(id, {
                x: event.pageX - startCoordinates.x + coordinates.x,
                y: event.pageY - startCoordinates.y + coordinates.y
            })
            setEditCoordinatesMode(false)
        }
    }

    function changeSizeItem(event: React.MouseEvent, id: ID, editSizeMode: editSizeMode, startCoordinates: Coordinates, coordinates: Coordinates, size: Size) {
        function change(id: ID, coordinates: Coordinates, size: Size, esm: editSizeMode) {
            setStartCoordinates(coordinates)
            setSize(size)
            resizeItem(id, size, coordinates)
            setEditSizeMode(esm)
        }

        if (editSizeMode.cornerTopLeft) {
            let width = size.width - (event.pageX - startCoordinates.x)
            if (width < minSize) {
                width = minSize
            }
            let height = size.height - (event.pageY - startCoordinates.y)
            if (height < minSize) {
                height = minSize
            }
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }
            change(id,
                {x: biasX + coordinates.x, y: biasY + coordinates.y},
                {
                    width: width,
                    height: height
                },
                {...editSizeMode, cornerTopLeft: false})
        }
        if (editSizeMode.cornerTopRight) {
            let width = event.pageX - startCoordinates.x + size.width
            if (width < minSize) {
                width = minSize
            }
            let height = size.height - (event.pageY - startCoordinates.y)
            if (height < minSize) {
                height = minSize
            }
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }

            change(id,
                {x: coordinates.x, y: biasY + coordinates.y,},
                {width: width, height: height},
                {
                    ...editSizeMode,
                    cornerTopRight: false
                })
        }
        if (editSizeMode.cornerButtonRight) {
            let width = event.pageX - startCoordinates.x + size.width
            if (width < minSize) {
                width = minSize
            }
            let height = event.pageY - startCoordinates.y + size.height
            if (height < minSize) {
                height = minSize
            }


            change(id,
                {x: coordinates.x, y: coordinates.y},
                {width: width, height: height},
                {
                    ...editSizeMode,
                    cornerButtonRight: false
                })
        }
        if (editSizeMode.cornerButtonLeft) {
            let width = size.width - (event.pageX - startCoordinates.x)
            if (width < minSize) {
                width = minSize
            }
            let height = event.pageY - startCoordinates.y + size.height
            if (height < minSize) {
                height = minSize
            }
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }

            change(id,
                {
                    x: biasX + coordinates.x,
                    y: coordinates.y,
                },
                {
                    width: width,
                    height: height
                },
                {...editSizeMode, cornerButtonLeft: false})
        }
        if (editSizeMode.widthRight) {
            let width = event.pageX - startCoordinates.x + size.width
            if (width < minSize) {
                width = minSize
            }
            change(id,
                {
                    x: coordinates.x,
                    y: coordinates.y
                },
                {
                    width: width,
                    height: size.height
                },
                {...editSizeMode, widthRight: false})
        }
        if (editSizeMode.widthLeft) {
            let width = size.width - (event.pageX - startCoordinates.x)
            if (width < minSize) {
                width = minSize
            }
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }
            change(id, {
                x: biasX + coordinates.x,
                y: coordinates.y
            }, {
                width: width,
                height: size.height
            }, {...editSizeMode, widthLeft: false})
        }
        if (editSizeMode.heightButton) {
            let height = event.pageY - startCoordinates.y + size.height
            if (height < minSize) {
                height = minSize
            }
            change(id,
                {
                    x: coordinates.x,
                    y: coordinates.y
                },
                {
                    width: size.width,
                    height: height
                },
                {...editSizeMode, heightButton: false})
        }
        if (editSizeMode.heightTop) {
            let height = size.height - (event.pageY - startCoordinates.y)
            if (height < minSize) {
                height = minSize
            }
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }
            change(id,
                {
                    x: coordinates.x,
                    y: biasY + coordinates.y
                },
                {
                    width: size.width,
                    height: height
                },
                {...editSizeMode, heightTop: false})
        }
    }

    return (
        <div className={c.container}>

            <div style={{width: card.size.width, height: card.size.height,}}
                 className={c.card}
                 onMouseOverCapture={(event) => {
                     changeCoordinatesItem(event, itemId, editCoordinatesMode, startCoordinates, coordinates)
                     changeSizeItem(event, itemId, editSizeMode, startCoordinates, coordinates, size)
                 }}>

                <div ref={refSave} className={c.card__background} style={{backgroundColor: card.background}}>
                    <div className={c.card__filter} style={card.filter === 'transparent' ? {opacity: 1} : {
                        backgroundColor: card.filter,
                        opacity: 0.5
                    }}>
                        {card.items.map((item) =>
                            <div key={item.id}>
                                <div className={c.view_container}
                                     style={card.focusItems.length === 1 && itsFocus(item.id, card.focusItems) ? {
                                         margin: '-0.4vh',
                                         border: '0.4vh solid #11a1fb',
                                         cursor: "move",
                                         position: "absolute",
                                         zIndex: 300,
                                         top: item.coordinates.y,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                         height: item.size.height,
                                     } : card.focusItems.length > 1 && itsFocus(item.id, card.focusItems) ? {
                                         cursor: "pointer",
                                         position: "absolute",
                                         top: item.coordinates.y,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                         height: item.size.height,
                                         zIndex: 300,
                                         margin: '-0.4vh',
                                         border: '0.4vh solid #11a1fb',
                                     } : {
                                         cursor: "pointer",
                                         position: "absolute",
                                         top: item.coordinates.y,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                         height: item.size.height
                                     }}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editCoordinatesItem(event, item.id, item.coordinates)
                                     }}
                                     onMouseUp={() => {
                                         setEditCoordinatesMode(false)
                                     }}
                                     onClick={() => {
                                         if (card.focusItems.length === 0 || multipleChoice) {
                                             addFocusItem(item.id)
                                         } else {
                                             if (!multipleChoice && itsFocus(item.id, card.focusItems)) {
                                                 removeFocusItems()
                                             } else {
                                                 removeFocusItems()
                                                 addFocusItem(item.id)
                                             }
                                         }
                                     }}
                                >
                                    <ItemView item={item}/>
                                </div>
                                {itsFocus(item.id, card.focusItems) && card.focusItems.length === 1 ?
                                    <div>
                                        <div className={c.border + " " + c.border_top}
                                             draggable={true}
                                             onMouseDown={(event) => {
                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, heightTop: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, heightTop: false})
                                             }}
                                             style={{
                                                 cursor: "row-resize",
                                                 top: item.coordinates.y - sizeBorder / 2,
                                                 left: item.coordinates.x,
                                                 width: item.size.width
                                             }}/>
                                        <div className={c.border + " " + c.border_right}
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, widthRight: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, widthRight: false})
                                             }}
                                             style={{
                                                 cursor: "col-resize",
                                                 top: item.coordinates.y,
                                                 left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                                 height: item.size.height
                                             }}/>
                                        <div className={c.border + " " + c.border_button}
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, heightButton: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, heightButton: false})
                                             }}
                                             style={{
                                                 cursor: "row-resize",
                                                 top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                                 left: item.coordinates.x,
                                                 width: item.size.width,
                                             }}/>
                                        <div className={c.border + " " + c.border_left}
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, widthLeft: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, widthLeft: false})
                                             }}
                                             style={{
                                                 cursor: "col-resize",
                                                 top: item.coordinates.y,
                                                 left: item.coordinates.x - sizeBorder / 2,
                                                 height: item.size.height
                                             }}/>
                                        <div className={c.corner}
                                            //corner top-left
                                             draggable={true}
                                             onMouseDown={(event) => {
                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, cornerTopLeft: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, cornerTopLeft: false})
                                             }}
                                             style={{
                                                 cursor: "nwse-resize",
                                                 top: item.coordinates.y - sizeBorder / 2,
                                                 left: item.coordinates.x - sizeBorder / 2,
                                             }}
                                        />
                                        <div className={c.corner}
                                            //corner top-right
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, cornerTopRight: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, cornerTopRight: false})
                                             }}
                                             style={{
                                                 cursor: "nesw-resize",
                                                 top: item.coordinates.y - sizeBorder / 2,
                                                 left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                             }}
                                        />
                                        <div className={c.corner}
                                            //corner button-left
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, cornerButtonLeft: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, cornerButtonLeft: false})
                                             }}
                                             style={{
                                                 cursor: "nesw-resize",
                                                 top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                                 left: item.coordinates.x - sizeBorder / 2,
                                             }}
                                        />
                                        <div className={c.corner}
                                            //corner button-right
                                             draggable={true}
                                             onMouseDown={(event) => {

                                                 editSize(event, item.id, item.size, item.coordinates)
                                                 setEditSizeMode({...editSizeMode, cornerButtonRight: true})
                                             }}
                                             onMouseUp={() => {
                                                 setEditSizeMode({...editSizeMode, cornerButtonRight: false})
                                             }}
                                             style={{
                                                 cursor: "nwse-resize",
                                                 top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                                 left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                             }}
                                        />
                                    </div> : null}


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state: CardMaker) {
    return {
        multipleChoice: state.card.multipleChoice,
        focusItems: state.card.focusItems,
    }
}

const mapDispatchToProps = {
    addFocusItem,
    removeFocusItems,
    movingItemsByDiff,
    movingItem,
    resizeItem,
    resizeItemsByDiff,
    scaleItems
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);

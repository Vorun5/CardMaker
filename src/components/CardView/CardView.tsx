import React, {useCallback, useRef, useState} from 'react';
import {Card, CardMaker, Colors, Coordinates, History, Size, TypeDate} from "../../models/types";
import {connect} from "react-redux";
import c from './CardView.module.scss'
import style from './../../style/style.module.scss'
import {id, ID} from "../../models/id";
import {
    addFocusItem,
    movingItem,
    movingItems,
    removeFocusItems,
    resizeItem
} from "../../actions/actionsCreaters";
import {
    AddFocusItemActionsType, MovingItemActionsType,
    MovingItemsActionsType,
    RemoveFocusItemsActionsType, ResizeItemActionsType,
} from "../../actions/actions";
import {toPng} from 'html-to-image';
import ItemView from "./ItemView/ItemView";
import SaveCard from "../SaveCard/SaveCard";
import Modal from "../Style components/Modal/Modal";

interface CardViewProps {
    card: Card,
    history: History,
    focusItems: ID[],
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    movingItems: (coordinate: Coordinates) => MovingItemsActionsType,
    movingItem: (id: ID, coordinate: Coordinates) => MovingItemActionsType,
    resizeItem: (id: ID, size: Size, coordinate: Coordinates) => ResizeItemActionsType,
}

const CardView: React.FC<CardViewProps> = ({
                                               movingItems,
                                               movingItem,
                                               resizeItem,
                                               focusItems,
                                               card,
                                               history,
                                               addFocusItem,
                                               removeFocusItems,
                                           }) => {
    const styleCard = {
        width: card.size.width,
        height: card.size.height,
        transition: "all 0.3s",
    }


    function itsFocus(el: ID, listID: ID[]): boolean {
        for (let i = 0; i < listID.length; i++) {
            if (el == listID[i]) {
                return true;
            }
        }
        return false
    }

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
    const [coordinatesFocus, setCoordinatesFocus] = useState<Coordinates>({x: 0, y: 0})
    const [sizeFocus, setSizeFocus] = useState<Size>({width: 0, height: 0})
    const [itemId, setItemID] = useState<ID>("")
    const sizeBorder = 16

    function addFocusItemView(id: ID, size: Size, coordinates: Coordinates) {
        addFocusItem(id)
        setSizeFocus(size)
        setCoordinatesFocus(coordinates)
    }

    function editCoordinatesItem(event: React.MouseEvent, id: ID, coordinates: Coordinates, focus: boolean) {
        if (focus) {
            setStartCoordinates({
                x: event.pageX,
                y: event.pageY,
            })
            setCoordinates(coordinates)
            setItemID(id)
            setEditCoordinatesMode(true)
        }
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
            setCoordinatesFocus({
                x: event.pageX - startCoordinates.x + coordinates.x,
                y: event.pageY - startCoordinates.y + coordinates.y
            })
            movingItem(id, {
                x: event.pageX - startCoordinates.x + coordinates.x,
                y: event.pageY - startCoordinates.y + coordinates.y
            })
            setEditCoordinatesMode(false)
        }
    }

    function changeSizeItem(event: React.MouseEvent, id: ID, editSizeMode: editSizeMode, startCoordinates: Coordinates, coordinates: Coordinates, size: Size) {
        const minSize = 30
        if (editSizeMode.cornerTopLeft) {
            let width = size.width - (event.pageX - startCoordinates.x)
            if (width < minSize) {
                width = minSize
            }
            let height = size.height - (event.pageY - startCoordinates.y)
            if (height < minSize) {
                height = minSize
            }
            // if (width > height) {
            //     height = width
            // }
            // if (height > width) {
            //     width = height
            // }
            //
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }
            setSizeFocus({
                width: width,
                height: height
            })
            setCoordinatesFocus({
                x: biasX + coordinates.x,
                y: biasY + coordinates.y,
            })
            resizeItem(id, {
                width: width,
                height: height
            }, {
                x: biasX + coordinates.x,
                y: biasY + coordinates.y,
            })
            setEditSizeMode({...editSizeMode, cornerTopLeft: false})
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

            setSizeFocus({
                width: width,
                height: height
            })
            setCoordinatesFocus({
                x: coordinates.x,
                y: biasY + coordinates.y,
            })

            resizeItem(id, {
                width: width,
                height: height
            }, {
                x: coordinates.x,
                y: biasY + coordinates.y,
            })
            setEditSizeMode({...editSizeMode, cornerTopRight: false})
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
            setSizeFocus({
                width: width,
                height: height
            })
            setCoordinatesFocus({
                x: coordinates.x,
                y: coordinates.y
            })
            resizeItem(id, {
                width: width,
                height: height
            }, {
                x: coordinates.x,
                y: coordinates.y
            })
            setEditSizeMode({...editSizeMode, cornerButtonRight: false})
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

            setSizeFocus({
                width: width,
                height: height
            })
            setCoordinatesFocus({
                x: biasX + coordinates.x,
                y: coordinates.y,
            })

            resizeItem(id, {
                width: width,
                height: height
            }, {
                x: biasX + coordinates.x,
                y: coordinates.y,
            })
            setEditSizeMode({...editSizeMode, cornerButtonLeft: false})
        }
        if (editSizeMode.widthRight) {
            let width = event.pageX - startCoordinates.x + size.width
            if (width < minSize) {
                width = minSize
            }


            setSizeFocus({
                width: width,
                height: size.height
            })
            setCoordinatesFocus({
                x: coordinates.x,
                y: coordinates.y
            })

            resizeItem(id, {
                width: width,
                height: size.height
            }, {
                x: coordinates.x,
                y: coordinates.y
            })
            setEditSizeMode({...editSizeMode, widthRight: false})
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


            setSizeFocus({
                width: width,
                height: size.height
            })
            setCoordinatesFocus({
                x: biasX + coordinates.x,
                y: coordinates.y
            })
            resizeItem(id, {
                width: width,
                height: size.height
            }, {
                x: biasX + coordinates.x,
                y: coordinates.y
            })
            setEditSizeMode({...editSizeMode, widthLeft: false})
        }
        if (editSizeMode.heightButton) {
            let height = event.pageY - startCoordinates.y + size.height
            if (height < minSize) {
                height = minSize
            }

            setSizeFocus({
                width: size.width,
                height: height
            })
            setCoordinatesFocus({
                x: coordinates.x,
                y: coordinates.y
            })
            resizeItem(id, {
                width: size.width,
                height: height
            }, {
                x: coordinates.x,
                y: coordinates.y
            })
            setEditSizeMode({...editSizeMode, heightButton: false})
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

            setSizeFocus({
                width: size.width,
                height: height
            })
            setCoordinatesFocus({
                x: coordinates.x,
                y: biasY + coordinates.y
            })
            resizeItem(id, {
                width: size.width,
                height: height
            }, {
                x: coordinates.x,
                y: biasY + coordinates.y
            })
            setEditSizeMode({...editSizeMode, heightTop: false})
        }
    }

    const ref = useRef<HTMLDivElement>(null)
    const savePNG = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'card.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])
    const saveJPEG = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'card.jpeg';
                link.href = dataUrl;
                link.click();
            })
    }, [ref])

    return (
        <div className={c.container} onClick={() => {
        }}>
            <div className={c.save}>
                <SaveCard removeFocusItems={removeFocusItems} saveJPEG={saveJPEG}
                          savePNG={savePNG}/>
            </div>
            <div style={styleCard}
                 className={c.card}
                 onMouseOverCapture={(event) => {
                     changeCoordinatesItem(event, itemId, editCoordinatesMode, startCoordinates, coordinates)
                     changeSizeItem(event, itemId, editSizeMode, startCoordinates, coordinates, size)
                 }}
            >
                <div ref={ref} className={c.card__background} style={{backgroundColor: card.background}}>
                    <div className={c.card__filter} style={card.filter == Colors.None ? {opacity: 1} : {
                        backgroundColor: card.filter,
                        opacity: 0.5
                    }}>
                        {card.items.map((item) =>
                            <div key={item.id}>
                                <div className={style.view_container}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         margin: '-0.4vh',
                                         border: '0.4vh solid #FF6779',
                                         cursor: "move",
                                         position: "absolute",
                                         zIndex: 300,
                                         top: coordinatesFocus.y,
                                         left: coordinatesFocus.x,
                                         width: sizeFocus.width,
                                         height: sizeFocus.height
                                     } : {
                                         cursor: "pointer",
                                         position: "absolute",
                                         top: item.coordinates.y,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                         height: item.size.height
                                     }}
                                     draggable={itsFocus(item.id, card.focusItems)}
                                     onMouseDown={(event) => {
                                         editCoordinatesItem(event, item.id, item.coordinates, itsFocus(item.id, card.focusItems))
                                     }}
                                     onMouseUp={(event) => {
                                         setEditCoordinatesMode(false)
                                     }}
                                     onClick={() => {
                                         if (focusItems.length == 0) {
                                             addFocusItemView(item.id, item.size, item.coordinates)
                                         } else {
                                             removeFocusItems()
                                         }
                                     }}
                                >
                                    <ItemView item={item}/>
                                </div>


                                <div className={c.border + " " + c.border_top}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, heightTop: true})
                                     }}

                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, heightTop: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "row-resize",
                                         top: item.coordinates.y - sizeBorder / 2,
                                         left: item.coordinates.x,
                                         width: item.size.width
                                     } : {display: "none"}}/>

                                <div className={c.border + " " + c.border_right}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, widthRight: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, widthRight: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "col-resize",
                                         top: item.coordinates.y,
                                         left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                         height: item.size.height
                                     } : {display: "none"}}/>

                                <div className={c.border + " " + c.border_button}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, heightButton: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, heightButton: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "row-resize",
                                         top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                     } : {display: "none"}}/>

                                <div className={c.border + " " + c.border_left}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, widthLeft: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, widthLeft: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "col-resize",
                                         top: item.coordinates.y,
                                         left: item.coordinates.x - sizeBorder / 2,
                                         height: item.size.height
                                     } : {display: "none"}}/>


                                <div className={c.corner}
                                    //corner top-left
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, cornerTopLeft: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, cornerTopLeft: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "nwse-resize",
                                         top: item.coordinates.y - sizeBorder / 2,
                                         left: item.coordinates.x - sizeBorder / 2,
                                     } : {display: "none"}}
                                />
                                <div className={c.corner}
                                    //corner top-right
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, cornerTopRight: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, cornerTopRight: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "nesw-resize",
                                         top: item.coordinates.y - sizeBorder / 2,
                                         left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                     } : {display: "none"}}
                                />
                                <div className={c.corner}
                                    //corner button-left
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, cornerButtonLeft: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, cornerButtonLeft: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "nesw-resize",
                                         top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                         left: item.coordinates.x - sizeBorder / 2,
                                     } : {display: "none"}}
                                />
                                <div className={c.corner}
                                    //corner button-right
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editSize(event, item.id, sizeFocus, coordinatesFocus)
                                         setEditSizeMode({...editSizeMode, cornerButtonRight: true})
                                     }}
                                     onMouseUp={(event) => {
                                         setEditSizeMode({...editSizeMode, cornerButtonRight: false})
                                     }}
                                     style={itsFocus(item.id, card.focusItems) ? {
                                         cursor: "nwse-resize",
                                         top: item.coordinates.y + item.size.height - sizeBorder / 2,
                                         left: item.coordinates.x + item.size.width - sizeBorder / 2,
                                     } : {display: "none"}}
                                />
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
        focusItems: state.card.focusItems,
    }
}

const mapDispatchToProps = {
    addFocusItem,
    removeFocusItems,
    movingItems,
    movingItem,
    resizeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);

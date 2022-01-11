import React, {useCallback, useRef, useState} from 'react';
import {Card, CardMaker, Colors, Coordinates, emptyZone, History, Size, TypeDate} from "../../models/types";
import {connect} from "react-redux";
import c from './CardView.module.scss'
import style from './../../style/style.module.scss'
import {id, ID} from "../../models/id";
import {
    addFocusItem,
    movingItem,
    movingItems,
    removeFocusItems,
    removeZone,
    resizeItem
} from "../../actions/actionsCreaters";
import {
    AddFocusItemActionsType, MovingItemActionsType,
    MovingItemsActionsType,
    RemoveFocusItemsActionsType,
    RemoveZoneActionsType, ResizeItemActionsType
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
    removeZone: () => RemoveZoneActionsType,
    movingItems: (focusItems: ID[], coordinate: Coordinates) => MovingItemsActionsType,
    movingItem: (id: ID, coordinate: Coordinates) => MovingItemActionsType,
    resizeItem: (id: ID, size: Size) => ResizeItemActionsType,
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
                                               removeZone
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
    const [editHeightMode, setEditHeightMode] = useState<boolean>(false)
    const [startCoordinates, setStartCoordinates] = useState<Coordinates>({x: 0, y: 0})
    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0})
    const [size, setSize] = useState<Size>({width: 0, height: 0})
    const [itemId, setItemID] = useState<ID>("")
    const sizeBorder = 16

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

    function editWidthRightItem(event: React.MouseEvent, id: ID, size: Size) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, widthRight: true})
    }

    function editHeightButtonItem(event: React.MouseEvent, id: ID, size: Size) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, heightButton: true})
    }

    function editWidthLeftItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setCoordinates(coordinates)
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, widthLeft: true})
    }

    function editHeightTopItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setCoordinates(coordinates)
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, heightTop: true})
    }

    function editCornerTopLeftItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setCoordinates(coordinates)
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, cornerTopLeft: true})
    }

    function editCornerTopRightItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setCoordinates(coordinates)
        setSize(size)
        setItemID(id)
        setEditSizeMode({...editSizeMode, cornerTopRight: true})
    }

    function editCornerButtonRightItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setSize(size)
        setCoordinates(coordinates)
        setItemID(id)
        setEditSizeMode({...editSizeMode, cornerButtonRight: true})
    }

    function editCornerButtonLeftItem(event: React.MouseEvent, id: ID, size: Size, coordinates: Coordinates) {
        setStartCoordinates({
            x: event.pageX,
            y: event.pageY,
        })
        setSize(size)
        setCoordinates(coordinates)
        setItemID(id)
        setEditSizeMode({...editSizeMode, cornerButtonLeft: true})
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
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }

            resizeItem(id, {
                width: width,
                height: height
            })
            movingItem(id, {
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

            resizeItem(id, {
                width: width,
                height: height
            })
            movingItem(id, {
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
            resizeItem(id, {
                width: width,
                height: height
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
            resizeItem(id, {
                width: width,
                height: height
            })
            movingItem(id, {
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
            resizeItem(id, {
                width: width,
                height: size.height
            })
            setEditSizeMode({...editSizeMode, widthRight: false})
        }
        if (editSizeMode.widthLeft) {
            let width = size.width - (event.pageX - startCoordinates.x)
            if (width < minSize) {
                width = minSize
            }
            resizeItem(id, {
                width: width,
                height: size.height
            })
            let biasX = event.pageX - startCoordinates.x
            if (biasX > size.width - minSize) {
                biasX = size.width - minSize
            }
            movingItem(id, {
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
            resizeItem(id, {
                width: size.width,
                height: height
            })
            setEditSizeMode({...editSizeMode, heightButton: false})
        }
        if (editSizeMode.heightTop) {
            let height = size.height - (event.pageY - startCoordinates.y)
            if (height < minSize) {
                height = minSize
            }
            resizeItem(id, {
                width: size.width,
                height: height
            })
            let biasY = event.pageY - startCoordinates.y
            if (biasY > size.height - minSize) {
                biasY = size.height - minSize
            }
            movingItem(id, {
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
            if (card.zone == emptyZone) {
                return;
            }
            removeFocusItems();
            card.items.forEach((el, i) => {
                if (((card.zone.coordinates.x + card.zone.size.width >= el.coordinates.x) && (card.zone.coordinates.y + card.zone.size.height >= el.coordinates.y) && ((card.zone.coordinates.y <= el.coordinates.y) || (card.zone.coordinates.x <= el.coordinates.x)))
                    ||
                    ((el.coordinates.x + el.size.width >= card.zone.coordinates.x) && (el.coordinates.y + el.size.height >= card.zone.coordinates.y) && ((el.coordinates.y <= card.zone.coordinates.y) || (el.coordinates.x <= card.zone.coordinates.x)))) {
                    addFocusItem(el.id)
                }
            })
        }}>
            <div className={c.save}><SaveCard removeFocusItems={removeFocusItems} saveJPEG={saveJPEG} savePNG={savePNG}/></div>

            <div style={styleCard}
                 className={c.card} onMouseOverCapture={(event) => {
                changeCoordinatesItem(event, itemId, editCoordinatesMode, startCoordinates, coordinates)
                changeSizeItem(event, itemId, editSizeMode, startCoordinates, coordinates, size)
            }}>
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
                                         top: item.coordinates.y,
                                         left: item.coordinates.x,
                                         width: item.size.width,
                                         height: item.size.height
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
                                             addFocusItem(item.id)
                                         } else {
                                             removeZone()
                                             removeFocusItems()
                                         }
                                     }}
                                >
                                    <ItemView item={item}/>
                                </div>


                                <div className={c.border + " " + c.border_top}
                                     draggable={true}
                                     onMouseDown={(event) => {
                                         editHeightTopItem(event, item.id, item.size, item.coordinates)
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
                                         editWidthRightItem(event, item.id, item.size)
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
                                         editHeightButtonItem(event, item.id, item.size)
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
                                         editWidthLeftItem(event, item.id, item.size, item.coordinates)
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
                                         editCornerTopLeftItem(event, item.id, item.size, item.coordinates)
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
                                         editCornerTopRightItem(event, item.id, item.size, item.coordinates)
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
                                         editCornerButtonLeftItem(event, item.id, item.size, item.coordinates)
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
                                         editCornerButtonRightItem(event, item.id, item.size, item.coordinates)
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
                        {/*<ZoneCardView zone={card.zone}/>*/}
                        {/*<BorderFocusItems focusItems={card.focusItems}  items={card.items}/>*/}
                        <div>
                            <div
                                className={c.border + " " + c.border_top} style={card.zone != emptyZone ? {
                                top: card.zone.coordinates.y,
                                left: card.zone.coordinates.x,
                                width: card.zone.size.width
                            } : {display: "none"}}/>

                            <div className={c.border + " " + c.border_right} style={card.zone != emptyZone ? {
                                top: card.zone.coordinates.y,
                                left: card.zone.coordinates.x + card.zone.size.width,
                                height: card.zone.size.height
                            } : {display: "none"}}/>

                            <div className={c.border + " " + c.border_button} style={card.zone != emptyZone ? {
                                top: card.zone.coordinates.y + card.zone.size.height,
                                left: card.zone.coordinates.x,
                                width: card.zone.size.width,
                            } : {display: "none"}}/>

                            <div className={c.border + " " + c.border_left} style={card.zone != emptyZone ? {
                                top: card.zone.coordinates.y,
                                left: card.zone.coordinates.x,
                                height: card.zone.size.height
                            } : {display: "none"}}/>
                        </div>


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
    removeZone,
    movingItems,
    movingItem,
    resizeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);

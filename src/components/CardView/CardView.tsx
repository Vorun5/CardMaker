import React, {useState} from 'react';
import {Card, CardMaker, Colors, Coordinates, emptyZone, History, TypeDate} from "../../models/types";
import {connect} from "react-redux";
import c from './CardView.module.scss'
import style from './../../style/style.module.scss'
import {ID} from "../../models/id";
import {addFocusItem, movingItems, removeFocusItems, removeZone} from "../../actions/actionsCreaters";
import {
    AddFocusItemActionsType,
    MovingItemsActionsType,
    RemoveFocusItemsActionsType,
    RemoveZoneActionsType
} from "../../actions/actions";
import TextCardView from "./TextCardView/TextCardView";
import ItemView from "./ItemView/ItemView";

interface CardViewProps {
    card: Card,
    history: History,
    focusItems: ID[],
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    removeZone: () => RemoveZoneActionsType,
    movingItems: (focusItems: ID[], coordinate: Coordinates) => MovingItemsActionsType
}

const CardView: React.FC<CardViewProps> = ({
                                               movingItems,
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
        marginTop: -card.size.height / 2,
        marginLeft: -card.size.width / 2,
    }

    function itsFocus(el: ID, listID: ID[]): boolean {
        for (let i = 0; i < listID.length; i++) {
            if (el == listID[i]) {
                return true;
            }
        }
        return false
    }

    const [editCoordinatesMood, setEditCoordinatesMood] = useState<boolean>(false)
    const [startCoordinates, setStartCoordinates] = useState<Coordinates>({x: 0, y: 0})
    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0})

    function onMouseDownHandler(event: React.MouseEvent, coordinates: Coordinates, focus: boolean) {
        if (focus) {
            setStartCoordinates({
                x: event.pageX,
                y: event.pageY,
            })
            setCoordinates(coordinates)
            setEditCoordinatesMood(true)
        }
    }

    function onMouseOverCaptureHandler(event: React.MouseEvent, editCoordinatesMood: boolean, startCoordinates: Coordinates, coordinates: Coordinates) {
        if (editCoordinatesMood) {
            const buffer = {
                x: event.pageX - startCoordinates.x + coordinates.x,
                y: event.pageY - startCoordinates.y + coordinates.y
            }
            movingItems(focusItems, buffer)
            setEditCoordinatesMood(false)
        }
    }

    return (
        <div
            className={c.container} onClick={() => {
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
            <div style={styleCard} className={c.card} onMouseOverCapture={(event) => {
                onMouseOverCaptureHandler(event, editCoordinatesMood, startCoordinates, coordinates)
            }}>
                <div className={c.card__background} style={{backgroundColor: card.background}}>
                    <div className={c.card__filter} style={card.filter == Colors.None ? {opacity: 1} : {
                        backgroundColor: card.filter,
                        opacity: 0.5
                    }}>
                        {card.items.map((item) =>
                                <div
                                    className={style.view_container}
                                    key={item.id}
                                    style={itsFocus(item.id, card.focusItems) ? {
                                        margin: '-0.4vh',
                                        border: '0.4vh solid #1aa4fb',
                                        cursor: "move",
                                        position: "absolute",
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
                                        onMouseDownHandler(event, item.coordinates, itsFocus(item.id, card.focusItems))
                                    }}
                                    onMouseUp={(event) => {
                                        setEditCoordinatesMood(true)
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
                                    <ItemView
                                        removeFocusItems={removeFocusItems}
                                        item={item}
                                        focus={itsFocus(item.id, card.focusItems)}
                                        focusItems={focusItems}
                                        addFocusItem={addFocusItem}
                                        removeZone={removeZone}
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
        card: state.card,
        history: state.history
    }
}

const mapDispatchToProps = {
    addFocusItem,
    removeFocusItems,
    removeZone,
    movingItems
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);

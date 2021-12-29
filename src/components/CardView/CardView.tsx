import React from 'react';
import {Card, CardMaker, Colors, emptyZone, History, TypeDate} from "../../models/types";
import {connect} from "react-redux";
import c from './CardView.module.scss'
import TextCardView from "./TextCardView/TextCardView";
import {ID} from "../../models/id";
import {addFocusItem, removeFocusItem, removeZone} from "../../actions/actionsCreaters";
import {AddFocusItemActionsType, RemoveFocusItemActionsType, RemoveZoneActionsType} from "../../actions/actions";
import ArtCardView from "./ArtCardView/ArtCardView";
import ImgCardView from "./ImgCardView/ImgCardView";
import ZoneCardView from "./ZoneCardView/ZoneCardView";
import BorderFocusItems from "./BorderFocusItems/BorderFocusItems";
import EditPanel from "../EditPanel/EditPanel";

interface CardViewProps {
    card: Card,
    history: History,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItem: () => RemoveFocusItemActionsType,
    removeZone: () => RemoveZoneActionsType,
}

const CardView: React.FC<CardViewProps> = ({card, history, addFocusItem, removeFocusItem, removeZone}) => {
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

    return (
        <div className={c.container} onClick={() => {
            if (card.zone == emptyZone) {
                return;
            }
            removeFocusItem();
            card.items.forEach((el, i) => {
                if (((card.zone.coordinates.x + card.zone.size.width >= el.coordinates.x) && (card.zone.coordinates.y + card.zone.size.height >= el.coordinates.y) && ((card.zone.coordinates.y <= el.coordinates.y) || (card.zone.coordinates.x <= el.coordinates.x)))
                    ||
                    ((el.coordinates.x + el.size.width >= card.zone.coordinates.x) && (el.coordinates.y + el.size.height >= card.zone.coordinates.y) && ((el.coordinates.y <= card.zone.coordinates.y) || (el.coordinates.x <= card.zone.coordinates.x)))) {
                    addFocusItem(el.id)
                }
            })
        }}>
            <div style={styleCard} className={c.card}>

                <div className={c.card__background} style={{backgroundColor: card.background}}>
                    <div className={c.card__filter} style={card.filter == Colors.None ? {opacity: 1} : {
                        backgroundColor: card.filter,
                        opacity: 0.5
                    }}>
                        {card.items.map((item) => {
                                if (item.data.type == TypeDate.TextCard) {
                                    return <TextCardView removeZone={removeZone} removeFocusItem={removeFocusItem}
                                                         addFocusItem={addFocusItem}
                                                         id={item.id} focus={itsFocus(item.id, card.focusItems)}
                                                         key={item.id}
                                                         size={item.size} coordinates={item.coordinates}
                                                         textCard={item.data}/>
                                } else if (item.data.type == TypeDate.Art) {
                                    return <ArtCardView removeZone={removeZone} id={item.id} size={item.size}
                                                        coordinates={item.coordinates}
                                                        art={item.data} focus={itsFocus(item.id, card.focusItems)}
                                                        addFocusItem={addFocusItem} removeFocusItem={removeFocusItem}
                                                        key={item.id}/>
                                } else if (item.data.type == TypeDate.IMG) {
                                    return <ImgCardView removeZone={removeZone} id={item.id} size={item.size}
                                                        coordinates={item.coordinates}
                                                        img={item.data} focus={itsFocus(item.id, card.focusItems)}
                                                        addFocusItem={addFocusItem} removeFocusItem={removeFocusItem}/>
                                }
                            }
                        )}
                        {/*<ZoneCardView zone={card.zone}/>*/}
                        {/*<BorderFocusItems focusItems={card.focusItems}  items={card.items}/>*/}
                        <div>
                            <div className={c.border + " " + c.border_top} style={card.zone != emptyZone ? {
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
        card: state.card,
        history: state.history
    }
}

const mapDispatchToProps = {
    addFocusItem,
    removeFocusItem,
    removeZone,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView);

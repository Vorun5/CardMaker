import React, {useState} from 'react';
import {
    Card,
    CardMaker,
    Colors,
    emptyZone,
    Fonts,
    FontStyle,
    FontWeight,
    History,
    TextDecoration,
    TypeDate
} from "../../models/types";
import c from "./CardHistory.module.scss"
import style from "./../../style/style.module.scss"
import {store} from "../../reduser/redusers";
import {AddHistoryActionsType, ChangeCardActionType} from "../../actions/actions";
import {addHistory, changeCard} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {id} from "../../models/id";

interface HistoryProps {
    //card: Card,
    //history: History,
    addHistory: (card: Card) => AddHistoryActionsType,
    changeCard: (card: Card) => ChangeCardActionType
}

const CardHistory: React.FC<HistoryProps> = ({addHistory, changeCard}) => {


    const [lastCard, setLastCard] = useState<Card>({
        zone: emptyZone,
        size: {width: 123, height: 123},
        filter: Colors.None,
        background: Colors.None,
        focusItems: [],
        items: [
            {
                size: {width: 321, height: 321},
                coordinates: {x: 21, y: 13},
                id: id(),
                data: {
                    type: TypeDate.TextCard,
                    body: id(),
                    color: Colors.None,
                    fontFamily: Fonts.Montserrat,
                    fontStyle: {
                        fontWeight: FontWeight.normal,
                        textDecoration: TextDecoration.normal,
                        fontStyle: FontStyle.italic,
                    },
                    fontSize: 12,
                }
            }
        ]
    })
    // console.log(
    //     card === lastCard
    // )
    // addHistory(card)
    // console.log(history)
    //
    //
    // if (history.list.length == 0) {
    //     console.log("add hisotry")
    //     addHistory(card)
    // }
    // if (history.list.length != 0 && history.list[history.currentIndex] !== card) {
    //     console.log("need add card")
    //     addHistory(card)
    // }


    // if (history.list.length == 0) {
    //     //console.log("add hisotry")
    //     addHistory(card)
    //
    // } else {
    //     const lastCard: Card = history.list[history.currentIndex]
    //     if (lastCard != card) {
    //         //console.log("need add card")
    //         addHistory(card)
    //     }
    // }

    //
    //
    // store.subscribe(() => {
    //     if (history.list.length == 0) {
    //         //console.log("add hisotry")
    //         addHistory(card)
    //         return
    //     } else {
    //         const lastCard: Card = history.list[history.currentIndex]
    //         if (lastCard != card) {
    //             //console.log("need add card")
    //             addHistory(card)
    //             return
    //         }
    //     }
    // })


    // store.subscribe(() => {
    //     if (store.getState().history.currentIndex == -1) {
    //         addHistory(store.getState().card)
    //         return
    //     } else {
    //         if (store.getState().history.list[store.getState().history.currentIndex] !== store.getState().card) {
    //             addHistory(store.getState().card)
    //             return
    //         } else {
    //             return;
    //         }
    //     }
    // })


    function selectHistory(state: CardMaker): History {
        return state.history
    }

    function selectCard(state: CardMaker): Card {
        return state.card
    }

    function handleChange() {
        const history: History = selectHistory(store.getState())
        const card: Card = selectCard(store.getState())
        console.log("lastCard" ,history.list[history.currentIndex])
        console.log("card ",card)
        if (history.list[history.currentIndex] !== card) {

            addHistory(card)
        }
    }

    const unsubscribe = store.subscribe(handleChange)

    return (
        <div className={c.container}>
            <div className={style.button + " " + c.button}>
                <div className={c.undo_icon + " " + c.icon}/>
            </div>
            <div className={style.button + " " + c.button}>
                <div className={c.redo_icon + " " + c.icon}/>
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
    addHistory,
    changeCard,
}
export default connect(null, mapDispatchToProps)(CardHistory);

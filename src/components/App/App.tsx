import React from 'react';
import './App.module.scss';
import FilterTool from '../FilterTool/FilterTool';
import {allColorsList, Card, CardMaker, Coordinates, History, Size} from "../../models/types";
import c from './App.module.scss'
import CardView from "../CardView/CardView";
import BackgroundTool from "../BackgroundTool/BackgroundTool";
import EditPanel from "../EditPanel/EditPanel";
import {connect} from "react-redux";
import {
    addHistory,
    resizeCard,

} from "../../actions/actionsCreaters";
import {AddHistoryActionsType, ResizeCardActionsType} from "../../actions/actions";
import SizeCardTool from "../SizeCardTool/SizeCardTool";
import AddItems from "../AddItems/AddItems";
import DeleteItems from "../DeleteItems/DeleteItems";
import CardHistory from "../CardHistory/CardHistory";
import CreateNewCard from "../CreateNewCard/CreateNewCard";
import SaveCard from "../SaveCard/SaveCard";

interface AppProps {
    card: Card,
    history: History,
    resizeCard: (size: Size) => ResizeCardActionsType,
    addHistory: (card: string) => AddHistoryActionsType
}

const App: React.FC<AppProps> = ({
                                     card,
                                     history,
                                     resizeCard
                                 }) => {

    return (
        <div className={c.App}>

            <div>

                <div className={c.tools}>
                    <div className={c.header_tools}>
                        <div className={c.header_tools_item}><CreateNewCard/></div>
                        <div className={c.header_tools_item}><SaveCard/></div>

                    </div>
                    <AddItems/>
                    <FilterTool colorList={allColorsList}/>
                    <BackgroundTool colorList={allColorsList}/>
                    <EditPanel/>
                </div>

                <div className={c.header_card}>
                    <div className={c.header_card_item}>
                        <DeleteItems/>
                    </div>
                    <div className={c.header_card_item}>
                        <SizeCardTool resizeCard={resizeCard} size={card.size}/>
                    </div>
                    <div className={c.header_card_item}>
                        <CardHistory/>
                    </div>
                </div>
                <div className={c.card_container}>
                    <CardView card={card} history={history}/>
                </div>


            </div>

        </div>
    );
}

function mapStateToProps(state: CardMaker) {
    return {
        card: state.card,
        history: state.history
    }
}

const mapDispatchToProps = {
    resizeCard,
    addHistory
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

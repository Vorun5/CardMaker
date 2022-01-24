import React, {useCallback, useRef} from 'react';
import './App.module.scss';
import FilterTool from '../FilterTool/FilterTool';
import {Card, CardMaker, History, Size} from "../../models/types";
import c from './App.module.scss'
import CardView from "../CardView/CardView";
import BackgroundTool from "../BackgroundTool/BackgroundTool";
import EditPanel from "../EditPanel/EditPanel";
import {connect} from "react-redux";
import {
    addHistory, removeFocusItems,
    resizeCard,

} from "../../actions/actionsCreaters";
import {AddHistoryActionsType, RemoveFocusItemsActionsType, ResizeCardActionsType} from "../../actions/actions";
import SizeCardTool from "../SizeCardTool/SizeCardTool";
import AddItems from "../AddItems/AddItems";
import DeleteItems from "../DeleteItems/DeleteItems";
import CardHistory from "../CardHistory/CardHistory";
import CreateNewCard from "../CreateNewCard/CreateNewCard";
import '../../static/art/Ворон.svg'
import TemplatesTool from "../TemplatesTool/TemplatesTool";
import ElementLayers from "../ElementLayers/ElementLayers";
import MultipleChoiceTool from "../MultipleChoiceTool/MultipleChoiceTool";
import {toPng} from "html-to-image";
import SaveCard from "../SaveCard/SaveCard";

interface AppProps {
    card: Card,
    history: History,
    resizeCard: (size: Size) => ResizeCardActionsType,
    addHistory: (card: string) => AddHistoryActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType
}

const App: React.FC<AppProps> = ({
                                     card,
                                     history,
                                     resizeCard,
                                     removeFocusItems
                                 }) => {


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
        <div className={c.App}>


            <div className={c.header_card}>
                <div className={c.header_card_element_tool}>
                    <div className={c.header_card_element_tool_item}>
                        <DeleteItems/>
                    </div>
                    <div className={c.header_card_element_tool_item}>
                        <ElementLayers/>
                    </div>

                </div>
                <div className={c.header_card_size_card}>
                    <SizeCardTool resizeCard={resizeCard} size={card.size}/>
                </div>
                <div className={c.header_card_history}>
                    <CardHistory/>
                </div>
            </div>

            <div className={c.card_container}>
                <CardView refSave={ref} card={card} history={history}/>
            </div>

            <div className={c.tools}>
                <div className={c.header_tools}>
                    <div className={c.header_tools_item}><CreateNewCard/></div>
                    <div className={c.header_tools_item}>
                        <SaveCard saveJPEG={saveJPEG} savePNG={savePNG}/>
                    </div>
                </div>
                <AddItems/>
                <TemplatesTool/>
                <MultipleChoiceTool/>
                <FilterTool/>
                <BackgroundTool/>
                <EditPanel/>
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
    addHistory,
    removeFocusItems
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import c from './ElementLayers.module.scss'
import style from '../../style/style.module.scss'
import {CardMaker, Item} from "../../models/types";
import {downLayer, upLayer} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";
import {ID} from "../../models/id";
import {DownLayerActionType, UpLayerActionType} from "../../store/actions/actions";
import {store} from "../../store/reduser/redusers";

interface ElementLayersProps {
    focusItems: ID[],
    items: Item[],
    upLayer: () => UpLayerActionType,
    downLayer: () => DownLayerActionType,
}
function onTopLayer(): boolean {
    const focusItems = store.getState().card.focusItems
    const items = store.getState().card.items
    if (focusItems.length === 0) {
        return true
    }
    if (focusItems.length === 1 && items.length !== 0) {
        if (items[items.length - 1].id === focusItems[0]) {
            return true
        }
    }
    return false
}
function onButtonLayer(): boolean {
    const focusItems = store.getState().card.focusItems
    const items = store.getState().card.items
    if (focusItems.length === 0) {
        return true
    }
    if (focusItems.length === 1 && items.length !== 0) {
        if (items[0].id === focusItems[0]) {
            return true
        }
    }
    return false
}


const ElementLayers: React.FC<ElementLayersProps> = ({
                                                         focusItems,
                                                         items,
                                                         upLayer,
                                                         downLayer
                                                         }) => {

    return (
        <div className={c.container}>
            <div className={onTopLayer() ? c.up_layer + ' ' + style.button + ' ' + style.button_inactive : c.up_layer + ' ' + style.button}
            onClick={() => upLayer()}
            >
                <div className={onTopLayer() ? c.up_layer_icon_inactive :  c.up_layer_icon}/>
            </div>
            <div className={onButtonLayer() ? c.down_layer + ' ' + style.button + ' ' + style.button_inactive : c.down_layer + ' ' + style.button }
            onClick={() => downLayer()}
            >
                <div className={onButtonLayer() ? c.down_layer_icon_inactive : c.down_layer_icon}/>
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        focusItems: state.card.focusItems,
        items: state.card.items
    }
}

const mapDispatchToProps = {
    upLayer,
    downLayer
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementLayers);

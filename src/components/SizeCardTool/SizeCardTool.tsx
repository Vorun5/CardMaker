import React, {useEffect,useState} from 'react';
import c from './SizeCardTool.module.scss'
import {CardMaker, Size} from "../../models/types";
import {ResizeCardActionsType} from "../../store/actions/actions";
import {store} from "../../store/reduser/redusers";
import {resizeCard} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";


interface SizeCardToolProps {
    size: Size,
    resizeCard: (size: Size) => ResizeCardActionsType;
}

const SizeCardTool: React.FC<SizeCardToolProps> = ({
                                                       size,
                                                       resizeCard
                                                   }) => {

    const [width, setWidth] = useState<number>(size.width)
    const [height, setHeight] = useState<number>(size.height)

    const max = 9999
    const min = 100

    function onKeyDownHandle(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            let w = width
            let h = height
            if (width > max) {
                w = max
                setWidth(max)
            }
            if (height > max) {
                h = max
                setHeight(max)
            }
            if (width < min) {
                w = min
                setWidth(min)
            }
            if (height < min) {
                h = min
                setHeight(min)
            }
            resizeCard({
                width: w,
                height: h
            })
        }
    }

    useEffect(() => {
        store.subscribe(() => {
            setWidth(store.getState().card.size.width)
            setHeight(store.getState().card.size.height)
        })
        return () => {
            store.subscribe(() => {
                setWidth(store.getState().card.size.width)
                setHeight(store.getState().card.size.height)
            })
        }
    })

    return (
        <div className={c.container}>
            <div className={c.input_container}>
                <input className={c.input} type="number"
                       value={width}
                       onChange={(event) => {
                           setWidth(Number(event.target.value))
                       }}
                       onKeyDown={(event) => onKeyDownHandle(event)}
                />
            </div>

            <div className={c.input_x}/>

            <div className={c.input_container}>
                <input className={c.input} type="number"
                       value={height}
                       onChange={(event) => {
                           setHeight(Number(event.target.value))
                       }}
                       onKeyDown={(event) => onKeyDownHandle(event)}
                />
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        size: state.card.size,
    }
}

const mapDispatchToProps = {
    resizeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeCardTool);

import React, {useState} from 'react';
import c from './SizeCardTool.module.scss'
import {Colors, Size} from "../../models/types";
import {ChangeFilterActionsType, ResizeCardActionsType} from "../../actions/actions";


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
    const max = 10000
    const min = 100
    function onKeyDownHandle(event:  React.KeyboardEvent<HTMLInputElement>) {
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
    return (
        <div className={c.container}>
            <div className={c.input_container}>
                <input className={c.input} type="number"
                       defaultValue={size.width}
                       onChange={(event) => {
                           setWidth(Number(event.target.value))
                       }}
                       onKeyDown={(event) => onKeyDownHandle(event)}
                />
            </div>
            <div className={c.input_x}></div>
            <div className={c.input_container}>
                <input className={c.input} type="number"
                       defaultValue={size.height}
                       onChange={(event) => {
                           setHeight(Number(event.target.value))
                       }}
                       onKeyDown={(event) => onKeyDownHandle(event)}
                />
            </div>
        </div>
    );
};

export default SizeCardTool;

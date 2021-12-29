import React from 'react';
import c from './ColorSelect.module.scss'
import {ID, id} from "../../models/id";
import {Colors} from "../../models/types";
import {ActionsType} from "../../actions/actions";

interface ColorSelectProps {
    colorList: Colors[],
    changeColor: (color: Colors) => ActionsType,
}

const ColorSelect: React.FC<ColorSelectProps>  = ({changeColor, colorList}) => {
    return (
        <div className={c.container} onClick={() => {}}>
            {colorList.map((color => <div key={id()} className={c.color} style={{backgroundColor: color}} onClick={() => changeColor(color)
            }>
            </div>)) }
        </div>
    );
};

export default ColorSelect;

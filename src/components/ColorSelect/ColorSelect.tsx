import React from 'react';
import c from './ColorSelect.module.scss'
import {ID, id} from "../../models/id";
import {ActionsType} from "../../actions/actions";

interface ColorSelectProps {
    changeColor: (color: string) => ActionsType,
}

const ColorSelect: React.FC<ColorSelectProps>  = ({changeColor}) => {
    return (
        <div className={c.container} onClick={() => {}}>
        </div>
    );
};

export default ColorSelect;

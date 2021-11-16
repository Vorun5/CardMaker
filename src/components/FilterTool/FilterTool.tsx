import React, {useState} from 'react';
import c from './FilterTool.module.scss'
import {Colors} from "../App/App";
import ColorSelect from "../ColorSelect/ColorSelect";

interface FilterToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    color: Colors,
    setColor:  React.Dispatch<React.SetStateAction<Colors>>,
    colorList: Colors[],
}

const FilterTool: React.FC<FilterToolProps> = ({active, setActive, color, setColor, colorList}) => {
    return (
        <div className="tools__filter tools__item">

            <div className={c.container}>

                <div className={active ? c.face + ' ' + c.face_active : c.face} onClick={() => setActive(!active)}>
                    <div className={c.face__color}>
                        <div className={c.face__color_view} style={{backgroundColor: color}}/>
                    </div>
                    <div className={c.face__icon}/>
                </div>

                <div className={active ? c.select + ' ' + c.select_active : c.select}>
                    <ColorSelect color={color} setColor={setColor} colorList={colorList}/>
                </div>
            </div>

        </div>
    );
};

export default FilterTool;

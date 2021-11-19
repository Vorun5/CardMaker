import React from 'react';
import c from './FilterTool.module.scss'
import {Colors} from "../App/App";
import ColorSelect from "../ColorSelect/ColorSelect";

interface FilterToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    color: Colors,
    setColor: React.Dispatch<React.SetStateAction<Colors>>,
    colorList: Colors[],
}

const FilterTool: React.FC<FilterToolProps> = ({active, setActive, color, setColor, colorList}) => {
    const positionSelectBlock = colorList.length * 30 + 20;
    return (

        <div className={c.container}>

            <div className={active ? c.body + ' ' + c.body_active : c.body}>
                <div className={c.body__icon}/>
                <div className={c.body__text}>
                    Filter
                </div>
                <div className={c.body__remove_color}>
                    <div className={c.body__remove_color_button} onClick={() => setColor(Colors.None)}/>
                </div>
                <div className={c.body__color} >
                    <div onClick={() => setActive(!active)} className={c.body__color_view} style={{backgroundColor: color}}/>
                </div>
            </div>

            <div style={active ? {right: -positionSelectBlock + 'px'} : {right: "0"}}
                 className={c.select}>
                <ColorSelect color={color} setColor={setColor} colorList={colorList}/>
            </div>
        </div>
    );
};

export default FilterTool;

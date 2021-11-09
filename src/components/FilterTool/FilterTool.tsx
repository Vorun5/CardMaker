import React, {useState} from 'react';
import c from './FilterTool.module.scss'
import {Colors} from "../App/App";

interface FilterToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterTool: React.FC<FilterToolProps> = ({active, setActive}) => {
    const [s, setS] = useState(Colors.Pink);
    const colorView = {
        backgroundColor: s,
    }
    const allColors = [1, 2, 3, 4];
    return (
        <div className="tools__filter tools__item">

            <div className={c.body}>

                <div className={active ? c.face + ' ' + c.face_active : c.face} onClick={() => setActive(!active)}>

                    <div className={c.face__color}>
                        <div className={c.face__color_view} style={colorView}/>
                    </div>
                    <div className={c.face__icon}/>
                </div>

                <div className={active ? c.select + ' ' + c.select_active : c.select}>

                </div>
            </div>

        </div>
    );
};

export default FilterTool;

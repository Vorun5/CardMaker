import React, {useEffect, useRef, useState} from 'react';
import c from './FilterTool.module.scss'
import style from '../../style/style.module.scss'
import ColorSelect from "../ColorSelect/ColorSelect";
import {CardMaker} from "../../models/types";
import {connect} from "react-redux";
import {changeFilter} from "../../actions/actionsCreaters";
import {ChangeFilterActionsType} from "../../actions/actions";

interface FilterToolProps {
    filter: string,
    changeFilter: (filter: string) => ChangeFilterActionsType,
}

const FilterTool: React.FC<FilterToolProps> = ({filter, changeFilter}) => {

    const [colorPreview, setColorPreview] = useState<string>(filter)
    return (

        <div className={c.container}>

            <div className={c.body}>
                <div className={c.body__icon}/>
                <div className={c.body__text}>
                    Filter
                </div>
                <div className={c.body__remove_color}>
                    <div className={c.body__remove_color_button} onClick={() => {
                        setColorPreview('#FFFFFF')
                        changeFilter('transparent');
                    }}/>
                </div>
                <div className={c.body__color}>

                    <label className={style.input_color_label}>
                        <input type="color" value={colorPreview} onChange={(event) => {
                            setColorPreview(event.target.value)
                        }}
                               onBlur={() => changeFilter(colorPreview)}
                        />
                    </label>

                </div>
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {filter: state.card.filter}
}


const mapDispatchToProps = {
    changeFilter
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterTool)

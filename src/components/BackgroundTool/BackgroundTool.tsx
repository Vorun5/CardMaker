import React, {useEffect, useRef, useState} from 'react';
import c from './BackgroundTool.module.scss'
import style from '../../style/style.module.scss'
import {CardMaker} from "../../models/types";
import {connect} from "react-redux";
import {changeBackground, changeFilter} from "../../actions/actionsCreaters";
import {ChangeBackgroundActionsType} from "../../actions/actions";

interface BackgroundTolProps {
    background: string,
    changeBackground: (background: string) => ChangeBackgroundActionsType,
}

const BackgroundTool: React.FC<BackgroundTolProps> = ({background, changeBackground}) => {

    const [colorPreview, setColorPreview] = useState<string>(background)
    return (

        <div className={c.container}>

            <div className={c.body}>
                <div className={c.body__icon}/>
                <div className={c.body__text}>
                    Background
                </div>
                <div className={c.body__remove_color}>
                    <div className={c.body__remove_color_button} onClick={() => {
                        changeBackground('transparent');
                        setColorPreview('#FFFFFF')
                    }}/>
                </div>
                <div className={c.body__color}>
                    <label className={style.input_color_label}>
                        <input type="color" value={colorPreview} onChange={(event) => {
                            setColorPreview(event.target.value)
                        }}
                               onBlur={() => changeBackground(colorPreview)}
                        />
                    </label>
                </div>
            </div>

        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {background: state.card.background}
}


const mapDispatchToProps = {
    changeBackground
}
export default connect(mapStateToProps, mapDispatchToProps)(BackgroundTool)

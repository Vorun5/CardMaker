import React, {useEffect, useRef, useState} from 'react';
import c from './BackgroundTool.module.scss'

import ColorSelect from "../ColorSelect/ColorSelect";
import {CardMaker, Colors} from "../../models/types";
import {connect} from "react-redux";
import {changeBackground} from "../../actions/actionsCreaters";
import {ChangeBackgroundActionsType} from "../../actions/actions";

interface BackgroundTolProps {
    colorList: Colors[],
    background: Colors,
    changeBackground: (background: Colors) => ChangeBackgroundActionsType,
}

const BackgroundTool: React.FC<BackgroundTolProps> = ({background, colorList, changeBackground}) => {
    const positionSelectBlock = colorList.length * 30 + 20;
    const [active, setActive] = useState(false);

    function useOutsideClick(ref: React.MutableRefObject<any>) {
        useEffect(() => {
            function handleClickOutside(event: Event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setActive(false);
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);
    return (

        <div className={c.container} ref={wrapperRef}>

            <div className={active ? c.body + ' ' + c.body_active : c.body}>
                <div className={c.body__icon}/>
                <div className={c.body__text}>
                    Background
                </div>
                <div className={c.body__remove_color}>
                    <div className={c.body__remove_color_button} onClick={() => {
                        changeBackground(Colors.None);
                        setActive(false);
                    }}/>
                </div>
                <div className={c.body__color}>
                    <div onClick={() => setActive(!active)} className={c.body__color_view}
                         style={{backgroundColor: background}}/>
                </div>
            </div>

            <div style={active ? {right: -positionSelectBlock + 'px'} : {right: "0"}}
                 className={c.select}>
                <ColorSelect changeColor={changeBackground} colorList={colorList}/>
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

import React, {useEffect, useRef, useState} from 'react';
import c from './FilterTool.module.scss'

import ColorSelect from "../ColorSelect/ColorSelect";
import {CardMaker, Colors} from "../../models/types";
import {connect} from "react-redux";
import {changeFilter} from "../../actions/actionsCreaters";
import {ChangeFilterActionsType} from "../../actions/actions";

interface FilterToolProps {
    colorList: Colors[],
    filter: Colors,
    changeFilter: (filter: Colors) => ChangeFilterActionsType,
}

const FilterTool: React.FC<FilterToolProps> = ({filter, colorList, changeFilter}) => {
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
                    Filter
                </div>
                <div className={c.body__remove_color}>
                    <div className={c.body__remove_color_button} onClick={() => {
                        changeFilter(Colors.None);
                        setActive(false);
                    }}/>
                </div>
                <div className={c.body__color}>
                    <div onClick={() => setActive(!active)} className={c.body__color_view}
                         style={{backgroundColor: filter}}/>
                </div>
            </div>

            <div style={active ? {right: -positionSelectBlock + 'px'} : {right: "0"}}
                 className={c.select}>

                <ColorSelect changeColor={changeFilter} colorList={colorList}/>
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

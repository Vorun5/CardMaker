import React, {useEffect, useRef, useState} from 'react';
import c from './FilterTool.module.scss'

import ColorSelect from "../ColorSelect/ColorSelect";
import {CardMaker, Colors} from "../../models/types";
import {connect} from "react-redux";
import {addFilter, removeFilter} from "../../actions/actionsCreaters";
import {AddFilterActionsType, RemoveFilterActionsType} from "../../actions/actions";

interface FilterToolProps {
    colorList: Colors[],
    filter: Colors,
    addFilter: (filter: Colors) => AddFilterActionsType,
    removeFilter: () => RemoveFilterActionsType,
}

const FilterTool: React.FC<FilterToolProps> = ({filter, colorList, addFilter, removeFilter}) => {
    const positionSelectBlock = colorList.length * 30 + 20;
    const [active, setActive] = useState(false);
    const [color, setColor] = useState(Colors.Purple);

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
                         //setColor(Colors.None);
                        removeFilter();
                        setColor(Colors.None);
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
                <ColorSelect addFilter={addFilter} color={color} setColor={setColor} colorList={colorList}/>
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {filter: state.card.filter}
}


const mapDispatchToProps = {
    addFilter,
    removeFilter,
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterTool);

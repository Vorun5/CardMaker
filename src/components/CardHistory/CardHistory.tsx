import React from 'react';
import {History} from "../../models/types";
import c from "./CardHistory.module.scss"
import style from "./../../style/style.module.scss"

interface HistoryProps {
}

const CardHistory: React.FC<HistoryProps> = ({}) => {
    return (
        <div className={c.container}>
            <div className={style.button + " " + c.button}>
                <div className={c.undo_icon + " " + c.icon}></div>
            </div>
            <div className={style.button + " " + c.button}>
                <div className={c.redo_icon + " " + c.icon}></div>
            </div>
        </div>
    );
};

export default CardHistory;

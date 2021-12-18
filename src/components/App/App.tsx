import React, {useState} from 'react';
import './App.module.scss';
import FilterTool from '../FilterTool/FilterTool';
import {CardMaker, Colors, TypeDate} from "../../models/types";
import {id} from "../../models/id";
import {addItem, movingItem, removeFilter, resizeCard} from "../../models/functions";
import c from './App.module.scss'
import CardView from "../CardView/CardView";

function App() {
    const allColors = [Colors.Red, Colors.Blue, Colors.Green, Colors.Yellow, Colors.Purple, Colors.Grey];
    return (
        <div className={c.App}>
            <div className={c.container}>
                <div className={c.header}></div>
                <div className={c.workspace}>
                    <div className={c.tools}>
                        <div>
                            <FilterTool
                                colorList={allColors}
                                />
                        </div>
                    </div>
                    <CardView />
                </div>
            </div>
        </div>
    );
}

export default App;

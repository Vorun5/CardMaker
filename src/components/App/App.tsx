import React, {useState} from 'react';
import './App.scss';
import AppBackground from "../AppBackground/AppBackground";
import FilterTool from '../FilterTool/FilterTool';
import ArtTool from "../ArtTool/ArtTool";
import TextTool from "../TextTool/TextTool";
import IMGTool from "../IMGTool/IMGTool";
import TemplateTool from "../TemplateTool/TemplateTool";
import HistoryTool from "../HistoryTool/HistoryTool";
import SaveTool from "../SaveTool/SaveTool";

export enum Figures {
    Circle = 'url("../../static/icon/figures/circle.svg")',
}

export enum Colors {
    Red = 'rgb(255, 77, 24)', //#f24d18
    Blue = 'rgb(105, 156, 247)', //#699cf7
    Green = 'rgb(6, 171, 87)', //#06ab57
    Yellow = 'rgb(255, 200, 0)', //#ffc800
    Purple = 'rgb(152, 69, 255)', //#9845ff
    Grey = 'rgb(128, 128, 128)', //#808080
    None = 'rgb(255, 255, 255)',
}

function App() {
    const allColors = [Colors.None, Colors.Red, Colors.Blue, Colors.Green, Colors.Yellow, Colors.Purple, Colors.Grey];
    const [filterToolActive, setFilterToolActive] = useState(false);
    const [artToolActive, setArtToolActive] = useState(false);
    const [filter, setFilter] = useState(Colors.None);

    const [w, setW] = useState(800);
    const [h, setH] = useState(600);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const styleCard = {
        width: w,
        height: h,
        top: x,
        left: y,
    }
    const onClick = (e: any) => {
        const parent = e.target.parentNode.getBoundingClientRect();
        const element = e.target.getBoundingClientRect();

        const x = element.top - parent.top;
        const y = element.left - parent.left;

        console.log(x, y);
    };
    return (
        <div className="App" onClick={() => {
            setFilterToolActive(false);
            setArtToolActive(false);
        }}>
            <div className="container">
            <div className="header"></div>
            <div className="work-space">

                <div id="card" style={styleCard} onClick={onClick} className="card"></div>

            </div>
            <div className="tools">
                <div onClick={e => {
                    e.stopPropagation();
                    setArtToolActive(false);
                }}>
                    <FilterTool
                        color={filter}
                        setColor={setFilter}
                        colorList={allColors}
                        active={filterToolActive} setActive={setFilterToolActive}/>
                </div>
                <div onClick={e => {
                    e.stopPropagation();
                    setFilterToolActive(false);
                }}>
                    <ArtTool active={artToolActive} setActive={setArtToolActive}/>
                </div>
                <TextTool/>
                <IMGTool/>
                <TemplateTool/>
                <div className="tools__container">
                    <HistoryTool/>
                    <SaveTool/>
                </div>
            </div>
            </div>
        </div>
    );
}

export default App;

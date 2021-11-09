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
    Red = 'rgb(255, 0, 0)', //#FF0000
    Blue = 'rgb(0, 0, 255)', //#0000FF
    Green = 'rgb(0, 255, 0)', //#00FF00
    Yellow = 'rgb(255, 255, 0)', //#FFFF00
    Purple = 'rgb(128, 0, 128)', //#800080
    Aqua = 'rgb(0, 255, 255)', //#00FFFF
    Fuchsia = 'rgb(255, 0, 255)', //#FF00FF
    Pink = 'rgb(255, 192, 203)', //#FFC0CB
    Grey = 'rgb(128, 128, 128)' //#808080
}
function App() {
    const [filterToolActive, setFilterToolActive] = useState(false);
    const [artToolActive, setArtToolActive] = useState(false);
    return (
        <div className="App" onClick={() => {
            setFilterToolActive(false);
            setArtToolActive(false);
        }}>
            <AppBackground>
                <div className="tools">
                    <div onClick={e => {
                        e.stopPropagation();
                        setArtToolActive(false);
                    }}>
                        <FilterTool active={filterToolActive} setActive={setFilterToolActive}/>
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
                    <div className="tools__container" >
                        <HistoryTool/>
                        <SaveTool/>
                    </div>
                </div>
            </AppBackground>
        </div>
);
}

export default App;

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

import React, {useState} from 'react';
import './App.scss';
import AppBackground from "../AppBackground/AppBackground";
import FilterTool from '../Tools/FilterTool';
import ArtTool from "../Tools/ArtTool";
import TextTool from "../Tools/TextTool";
import IMGTool from "../Tools/IMGTool";
import TemplateTool from "../Tools/TemplateTool";
import HistoryTool from "../Tools/HistoryTool";
import SaveTool from "../Tools/SaveTool";


function App() {
    const [filterToolActive, setFilterToolActive] = useState(false);
    const [artToolActive, setArtToolActive] = useState(false);
    return (
        <div className="App">
            <AppBackground>


                <div className="tools">


                    <FilterTool active={filterToolActive} setActive={setFilterToolActive}/>
                    <ArtTool active={artToolActive} setActive={setArtToolActive}/>
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

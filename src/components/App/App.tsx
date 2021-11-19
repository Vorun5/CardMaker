import React, {useState} from 'react';
import './App.scss';
import FilterTool from '../FilterTool/FilterTool';

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
    None = 'transparent'//'rgb(255, 255, 255)',
}

function App() {
    const allColors = [Colors.Red, Colors.Blue, Colors.Green, Colors.Yellow, Colors.Purple, Colors.Grey];
    const [filterToolActive, setFilterToolActive] = useState(false);
    const [artToolActive, setArtToolActive] = useState(false);
    const [filter, setFilter] = useState(Colors.None);

    const [w, setW] = useState(800);
    const [h, setH] = useState(600);
    const [x, setX] = useState(20);
    const [y, setY] = useState(50);
    const styleCard = {
        width: w,
        height: h,
        top: x,
        left: y,
        backgroundColor: Colors.Red,
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
                    </div>
                    <div id="card" style={styleCard} onClick={onClick} className="card">
                        <div className="card__filter" style={{backgroundColor: filter}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

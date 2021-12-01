import React, {useState} from 'react';
import './App.scss';
import FilterTool from '../FilterTool/FilterTool';
import {CardMaker, Colors, TypeDate} from "../../models/types";
import {id} from "../../models/id";
import {addItem, movingItem} from "../../models/functions";


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
    let testId = id();
    let test: CardMaker = {
        templates: [],
        history: {
            list: [],
            currentIndex: 0
        },
        card: {
            coordinates: {
                x: 100,
                y: 100,
            },
            zone: {
                location: {
                    x: 0,
                    y: 0,
                },
                size: {
                    width: 0,
                    height: 0,
                }
            },
            background: Colors.Purple,
            filter: Colors.Yellow,
            size: {
                width: 600,
                height: 800
            },
            items: [
                {
                    id: testId,
                    type: TypeDate.TextCard,
                    data: {
                        body: "Hi world!",
                        color: Colors.Blue,
                        fontFamily: 'Areal',
                        fontStyle: {
                            italic: false,
                            bolt: true,
                            strikethrough: false,
                        }
                    },
                    size: {
                        width: 50,
                        height: 100,
                    },
                    coordinates: {
                        x: 100,
                        y: 200,
                    }
                }
            ],
            focusItems: [testId]
        }
    }
    console.log(test)
    test = addItem(test,
        {
            id: id(),
            type: TypeDate.TextCard,

            data: {
                body: "Hi world!",
                color: Colors.Blue,
                fontFamily: 'Areal',
                fontStyle: {
                    italic: false,
                    bolt: true,
                    strikethrough: false,
                }
            },
            size: {
                width: 50,
                height: 100,
            },
            coordinates: {
                x: 100,
                y: 200,
            }
        })
    console.log(test)
    test = movingItem(test, {x: 102, y: 201})
    console.log('после измененния координат', testId)
    console.log(test)
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

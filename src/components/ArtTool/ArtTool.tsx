import React, {useState} from 'react';
import c from "./ArtTool.module.scss";
import {Figures} from "../App/App";


interface ArtToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArtTool: React.FC<ArtToolProps> = ({active, setActive}) => {
    const [s, setS] = useState(Figures.Circle);
    const artView = {
        background: s + "center no-repeat",
    }
    console.log("../../static/icon/figures/" + s)
    return (
        <div className="tools__art tools__item">

            <div className={c.body}>

                <div className={active ? c.face + ' ' + c.face_active : c.face}>

                    <div className={c.face__art}>
                        <div style={artView} className={c.face__art_icon}/>
                    </div>
                    <div className={c.face__button} onClick={() => setActive(!active)}>
                        <div className={c.face__button_icon}/>
                    </div>
                </div>

                <div className={active ? c.select + ' ' + c.select_active : c.select}>

                </div>
            </div>

        </div>
    );
};

export default ArtTool;

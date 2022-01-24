import React, {useState} from 'react';
import c from "./SaveCard.module.scss"
import style from "./../../style/style.module.scss"
import Modal from "../Style components/Modal/Modal";
import {RemoveFocusItemsActionsType} from "../../actions/actions";
import {removeFocusItems} from "../../actions/actionsCreaters";
import {connect} from "react-redux";

interface SaveCardProps {
    savePNG: () => void,
    saveJPEG: () => void,
    removeFocusItems: () => RemoveFocusItemsActionsType,
}

const SaveCard: React.FC<SaveCardProps> = ({
                                               savePNG,
                                               saveJPEG,
                                               removeFocusItems
                                           }) => {


    const [saveModal, setSaveModal] = useState<boolean>(false)
    return (
        <div>


            <div onClick={() => setSaveModal(true)} className={style.button + " " + c.save}>
                <div className={c.save_icon}/>
            </div>
            {saveModal ?
                <Modal>
                    <div className={c.save_title}>
                        Скачать.
                    </div>
                    <div className={c.save_container}>
                        <div className={c.save_description}>Скачать открытку как</div>
                        <div className={c.save_buttons}>
                            <div
                                onClick={() => {
                                    removeFocusItems()
                                    savePNG()
                                    setSaveModal(false)
                                }}
                                className={c.save_png + " " + style.button}>PNG
                            </div>
                            <div className={c.save_or}>или</div>
                            <div
                                onClick={() => {
                                    removeFocusItems()
                                    saveJPEG()
                                    setSaveModal(false)
                                }}
                                className={c.save_jpeg + " " + style.button}>JPEG
                            </div>
                        </div>
                    </div>
                    <div className={c.save_bottom}>
                        <div
                            onClick={() => setSaveModal(false)}
                            className={c.save_close + " " + style.button}>Close
                        </div>
                    </div>
                </Modal>
                : null}
        </div>
    );
};



const mapDispatchToProps = {
    removeFocusItems,
}

export default connect(null, mapDispatchToProps)(SaveCard);

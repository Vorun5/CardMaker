import React from 'react';
import c from "./SaveCard.module.scss"
import style from "./../../style/style.module.scss"

interface SaveCardProps {

}

const SaveCard: React.FC<SaveCardProps> = ({

                                           }) => {
    return (
        <div className={style.button + " " + c.save}>
            <div className={c.save_icon}></div>
        </div>
    );
};

export default SaveCard;

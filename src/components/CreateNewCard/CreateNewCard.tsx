import React from 'react';
import c from "./CreateNewCard.module.scss"
import style from "./../../style/style.module.scss"

interface CreateNewCardProps {

}

const CreateNewCard: React.FC<CreateNewCardProps> = ({}) => {
    return (
        <div className={style.button + " " + c.create}>
            <div className={c.create_icon}></div>
        </div>
    );
};

export default CreateNewCard;

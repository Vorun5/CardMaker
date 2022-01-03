import React from 'react';
import c from './TextCardView.module.scss'
import {TextCard} from "../../../models/types";

interface TextCardViewProps {
    textCard: TextCard,
}

const TextCardView: React.FC<TextCardViewProps> = ({textCard}) => {
    const styleText = {
        color: textCard.color,
        fontFamily: textCard.fontFamily,
        fontSize: textCard.fontSize,
        fontWeight: textCard.fontStyle.fontWeight,
        textDecoration: textCard.fontStyle.textDecoration,
        fontStyle: textCard.fontStyle.fontStyle,
    }

    return (
        <div style={styleText} className={c.text}>{textCard.body}</div>
    );
};

export default TextCardView;

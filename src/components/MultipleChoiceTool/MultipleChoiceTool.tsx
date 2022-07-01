import React from 'react';
import c from './MultipleChoiceTool.module.scss'
import {CardMaker} from "../../models/types";
import {changeMultipleChoice} from "../../store/actions/actionsCreaters";
import {connect} from "react-redux";
import {ChangeMultipleChoiceActionType} from "../../store/actions/actions";

interface MultipleChoiceToolProps {
    multipleChoice: boolean,
    changeMultipleChoice: (multipleChoice: boolean) => ChangeMultipleChoiceActionType
}

const MultipleChoiceTool: React.FC<MultipleChoiceToolProps> = ({multipleChoice, changeMultipleChoice}) => {
    return (
        <div className={c.container}>
            <div className={c.icon}/>
            <div className={c.title}>Multiple choice</div>
            <div className={c.button} onClick={() => {
                changeMultipleChoice(!multipleChoice)
            }}>
                <div className={multipleChoice ? c.button_done : ""}/>
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        multipleChoice: state.card.multipleChoice,
    }
}

const mapDispatchToProps = {
    changeMultipleChoice
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceTool);

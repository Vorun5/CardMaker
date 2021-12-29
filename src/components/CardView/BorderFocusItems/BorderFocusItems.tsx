import React from 'react';
import {ID} from "../../../models/id";
import {Item} from "../../../models/types";

interface BorderFocusItemsProps {
    focusItems: ID[];
    items: Item[];
}


const BorderFocusItems: React.FC<BorderFocusItemsProps> = ({focusItems, items}) => {
    return (
        <div>
        </div>
    );
};

export default BorderFocusItems;

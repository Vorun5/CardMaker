import React from 'react';
import {Item, TypeDate} from "../../../models/types";
import TextCardView from "../TextCardView/TextCardView";
import ImgCardView from "../ImgCardView/ImgCardView";
import ArtCardView from "../ArtCardView/ArtCardView";

interface ItemViewProps {
    item: Item,
}

const ItemView: React.FC<ItemViewProps> = ({item,}) => {
    const data = item.data

    switch (data.type) {
        case TypeDate.TextCard:
            return <TextCardView textCard={data}/>
        case TypeDate.IMG:
            return <ImgCardView imgCard={data}/>
        case TypeDate.Art:
            return <ArtCardView art={data}/>
    }
};

export default ItemView;

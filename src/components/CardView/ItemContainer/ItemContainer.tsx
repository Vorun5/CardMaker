import React from 'react';
import style from "../../../style/style.module.scss";
import ItemView from "../ItemView/ItemView";
import {Item} from "../../../models/types";
import {ID} from "../../../models/id";
import c from "./ItemContainer.module.scss"
interface ItemContainerProps {
    item: Item,
    focusItems: ID[]
}

const ItemContainer: React.FC<ItemContainerProps> = ({item, focusItems}) => {

    function itsFocus(el: ID, listID: ID[]): boolean {
        for (let i = 0; i < listID.length; i++) {
            if (el == listID[i]) {
                return true;
            }
        }
        return false
    }
    return (
        <div>

                {/*<div className={style.view_container}*/}

                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         margin: '-0.4vh',*/}
                {/*         border: '0.4vh solid #FF6779',*/}
                {/*         cursor: "move",*/}
                {/*         position: "absolute",*/}
                {/*         zIndex: 300,*/}
                {/*         top: item.coordinates.y,*/}
                {/*         left: item.coordinates.x,*/}
                {/*         width: item.size.width,*/}
                {/*         height: item.size.height*/}
                {/*     } : {*/}
                {/*         cursor: "pointer",*/}
                {/*         position: "absolute",*/}
                {/*         top: item.coordinates.y,*/}
                {/*         left: item.coordinates.x,*/}
                {/*         width: item.size.width,*/}
                {/*         height: item.size.height*/}
                {/*     }}*/}
                {/*     draggable={itsFocus(item.id, focusItems)}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editCoordinatesItem(event, item.id, item.coordinates, itsFocus(item.id, focusItems))*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditCoordinatesMode(false)*/}
                {/*     }}*/}
                {/*     onClick={() => {*/}
                {/*         if (focusItems.length == 0) {*/}
                {/*             addFocusItem(item.id)*/}
                {/*         } else {*/}
                {/*             removeZone()*/}
                {/*             removeFocusItems()*/}
                {/*         }*/}
                {/*     }}*/}
                {/*>*/}
                {/*    <ItemView item={item}/>*/}
                {/*</div>*/}


                {/*<div className={c.border + " " + c.border_top}*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editHeightTopItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, heightTop: false})*/}
                {/*     }}*/}
                {/*     onMouseEnter={(event) => {*/}
                {/*         console.log(event.pageY, event.pageX)*/}
                {/*     }}*/}
                {/*     onDragLeave={(event) => {*/}
                {/*         console.log(event.pageX, event.pageY)*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "row-resize",*/}
                {/*         top: item.coordinates.y - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x,*/}
                {/*         width: item.size.width*/}
                {/*     } : {display: "none"}}/>*/}

                {/*<div className={c.border + " " + c.border_right}*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editWidthRightItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, widthRight: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "col-resize",*/}
                {/*         top: item.coordinates.y,*/}
                {/*         left: item.coordinates.x + item.size.width - sizeBorder / 2,*/}
                {/*         height: item.size.height*/}
                {/*     } : {display: "none"}}/>*/}

                {/*<div className={c.border + " " + c.border_button}*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editHeightButtonItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, heightButton: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "row-resize",*/}
                {/*         top: item.coordinates.y + item.size.height - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x,*/}
                {/*         width: item.size.width,*/}
                {/*     } : {display: "none"}}/>*/}

                {/*<div className={c.border + " " + c.border_left}*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editWidthLeftItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, widthLeft: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "col-resize",*/}
                {/*         top: item.coordinates.y,*/}
                {/*         left: item.coordinates.x - sizeBorder / 2,*/}
                {/*         height: item.size.height*/}
                {/*     } : {display: "none"}}/>*/}


                {/*<div className={c.corner}*/}
                {/*    //corner top-left*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editCornerTopLeftItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, cornerTopLeft: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "nwse-resize",*/}
                {/*         top: item.coordinates.y - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x - sizeBorder / 2,*/}
                {/*     } : {display: "none"}}*/}
                {/*/>*/}
                {/*<div className={c.corner}*/}
                {/*    //corner top-right*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editCornerTopRightItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, cornerTopRight: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "nesw-resize",*/}
                {/*         top: item.coordinates.y - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x + item.size.width - sizeBorder / 2,*/}
                {/*     } : {display: "none"}}*/}
                {/*/>*/}
                {/*<div className={c.corner}*/}
                {/*    //corner button-left*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editCornerButtonLeftItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, cornerButtonLeft: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "nesw-resize",*/}
                {/*         top: item.coordinates.y + item.size.height - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x - sizeBorder / 2,*/}
                {/*     } : {display: "none"}}*/}
                {/*/>*/}
                {/*<div className={c.corner}*/}
                {/*    //corner button-right*/}
                {/*     draggable={true}*/}
                {/*     onMouseDown={(event) => {*/}
                {/*         editCornerButtonRightItem(event, item.id, item.size, item.coordinates)*/}
                {/*     }}*/}
                {/*     onMouseUp={(event) => {*/}
                {/*         setEditSizeMode({...editSizeMode, cornerButtonRight: false})*/}
                {/*     }}*/}
                {/*     style={itsFocus(item.id, focusItems) ? {*/}
                {/*         cursor: "nwse-resize",*/}
                {/*         top: item.coordinates.y + item.size.height - sizeBorder / 2,*/}
                {/*         left: item.coordinates.x + item.size.width - sizeBorder / 2,*/}
                {/*     } : {display: "none"}}*/}
                {/*/>*/}
        </div>
    );
};

export default ItemContainer;

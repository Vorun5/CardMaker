import React, {useState} from 'react';
import c from './AddItems.module.scss'
import style from "../../style/style.module.scss"
import {
    CardMaker,
    Colors,
    Fonts,
    FontStyle,
    FontWeight,
    Item,
    Size,
    TextDecoration,
    TypeArt,
    TypeDate
} from "../../models/types";
import {ID, id} from "../../models/id";
import {
    addFocusItem,
    addHistory,
    addItem,
    removeFocusItems,
    removeZone,
    resizeCard
} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {
    AddFocusItemActionsType,
    AddItemActionsType,
    RemoveFocusItemsActionsType,
    RemoveZoneActionsType, ResizeCardActionsType
} from "../../actions/actions";
import {isBoolean} from "util";

interface AddItemsProps {
    sizeCard: Size,
    removeZone: () => RemoveZoneActionsType,
    addItem: (item: Item) => AddItemActionsType,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    resizeCard: (size: Size) => ResizeCardActionsType;
}

const AddItems: React.FC<AddItemsProps> = ({
                                               removeZone,
                                               addItem,
                                               addFocusItem,
                                               removeFocusItems,
                                               sizeCard,
                                               resizeCard
                                           }) => {


    const padding = 10
    const textItem: Item = {
        id: id(),
        data: {
            fontSize: 16,
            type: TypeDate.TextCard,
            body: "Example text",
            color: Colors.Grey,
            fontFamily: Fonts.Montserrat,
            fontStyle: {
                fontStyle: FontStyle.normal,
                fontWeight: FontWeight.bolt,
                textDecoration: TextDecoration.normal,
            }
        },
        size: {
            width: 120,
            height: 50,
        },
        coordinates: {
            x: padding,
            y: padding,
        }
    }
    const artItem: Item = {
        id: id(),
        data: {
            type: TypeDate.Art,
            color: Colors.Yellow,
            typeArt: TypeArt.Square
        },
        size: {
            width: 100,
            height: 100,
        },
        coordinates: {
            x: padding,
            y: padding,
        }
    }

    function add(item: Item) {
        const idItem = id()
        removeZone()
        removeFocusItems()
        addItem(
            {
                ...item,
                id: idItem
            }
        )
        addFocusItem(idItem)
    }

    const [imgSelected, setImgSelected] = useState<boolean>(false)
    const [drag, setDrag] = useState<boolean>(false)
    const [modalImg, setModalImg] = useState<boolean>(false)
    const [warningOneImg, setWarningOneImg] = useState<boolean>(false)
    const [warningFormatFile, setWarningFormatFile] = useState<boolean>(false)
    const [bigImg, setBigImg] = useState<boolean>(false)

    function deleteImg() {
        setBigImg(false)
        setImages([])
        setImgSelected(false)
        setDrag(false)
    }

    function closeModalImg() {
        deleteImg()
        setModalImg(false)
    }


    function saveImg() {
        for (let i = 0; i < images.length; i++) {
            if (images[i].width + padding * 2 > sizeCard.width || images[i].height + padding * 2 > sizeCard.height) {
                setBigImg(true)
                return
            } else {
                const idItem = id()
                add({
                    id: id(),
                    data: {
                        type: TypeDate.IMG,
                        url: images[i].src,
                    },
                    size: {
                        width: images[i].width,
                        height: images[i].height,
                    },
                    coordinates: {
                        x: padding,
                        y: padding,
                    }
                })
                setImages([])
            }
        }
        closeModalImg()
    }

    function addPartImg() {
        let added: boolean = false
        for (let i = 0; i < images.length; i++) {
            if (!added) {
                const idItem = id()
                add({
                    id: idItem,
                    data: {
                        type: TypeDate.IMG,
                        url: images[i].src,
                    },
                    size: {
                        width: images[i].width,
                        height: images[i].height,
                    },
                    coordinates: {
                        x: padding,
                        y: padding,
                    }
                })
                added = true
            } else {
                return
            }
        }
        closeModalImg()
    }

    function addImgAndEnlargeCard() {
        let added: boolean = false
        for (let i = 0; i < images.length; i++) {
            if (!added) {
                resizeCard({
                    width: images[i].width + 2 * padding,
                    height: images[i].height + 2 * padding,
                })
                const idItem = id()
                add({
                    id: idItem,
                    data: {
                        type: TypeDate.IMG,
                        url: images[i].src,
                    },
                    size: {
                        width: images[i].width,
                        height: images[i].height,
                    },
                    coordinates: {
                        x: padding,
                        y: padding,
                    }
                })
                added = true
            } else {
                return
            }
        }
        closeModalImg()
    }

    function dragStartHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e: React.DragEvent) {
        e.preventDefault()
        setDrag(false)
    }

    type img = {
        name: string,
        src: string,
        width: number,
        height: number
    }
    const [images, setImages] = useState<img[]>([])

    function dragOnDropHandler(e: React.DragEvent) {
        e.preventDefault()
        if (e.dataTransfer.files != null) {
            if (e.dataTransfer.files.length != 1) {
                setWarningOneImg(true)
            } else {
                let file = e.dataTransfer.files[0]
                if (file.type == "image/png" || file.type == "image/jpeg") {
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => {
                        let src = String(reader.result)
                        let img = document.createElement('img')
                        img.src = src
                        img.onload = () => {
                            setImages([...images, {
                                name: file.name,
                                src: src,
                                width: img.width,
                                height: img.height
                            }])
                        }
                    }
                    setImgSelected(true)
                } else {
                    setWarningFormatFile(true)
                }
            }

            if (!imgSelected) {
                setDrag(false)
            }
        }
    }


    return (
        <div>
            <div className={c.container}>
                <div className={c.info}>
                    <div className={c.info_icon}/>
                    <div className={c.info_title}>Add Items</div>
                </div>
                <div className={c.buttons}>
                    <div className={c.button}
                         onClick={() => add(textItem)}
                    >
                        <div className={c.button_text}/>
                    </div>
                    <div className={c.button}
                         onClick={() => add(artItem)}
                    >
                        <div className={c.button_art}/>
                    </div>
                    <div className={c.button}
                         onClick={() => {
                             setModalImg(true)
                         }}
                    >
                        <div className={c.button_img}/>
                    </div>
                </div>
            </div>
            <div className={modalImg ? c.modal : c.modal_inactive}>
                <div className={c.modal_content + " " + c.img_modal}>
                    <div className={c.img_modal_title}>
                        {bigImg ? <p>Very big image 😱</p> : <p>Select image</p>}
                    </div>
                    <div className={c.img_modal_content}>

                        {imgSelected ?
                            <div className={c.container_preview_img}>
                                {images.map((item) => <img
                                    style={
                                        {
                                            width: 400,
                                            height: item.height / item.width * 400
                                        }
                                    }
                                    key={id()} src={item.src} alt={item.name}
                                />)}
                            </div> :
                            drag
                                ?
                                <div className={c.drag_areal}
                                     onDragStart={e => dragStartHandler(e)}
                                     onDragLeave={e => dragLeaveHandler(e)}
                                     onDragOver={e => dragStartHandler(e)}
                                     onDrop={e => dragOnDropHandler(e)}>
                                    Release the file to download</div>
                                : <div
                                    className={c.drag_areal}
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}>
                                    <p> Drag <b style={warningOneImg ? {
                                        color: '#E76363',
                                        fontWeight: 500
                                    } : {fontWeight: "normal"}}> one image</b> to this upload area.
                                        <br/>
                                        Available formats <b style={warningFormatFile ? {
                                            color: '#E76363',
                                            fontWeight: 500
                                        } : {fontWeight: "normal"}}>PNG and JPEG</b>.</p>

                                </div>
                        }
                    </div>

                    {
                        bigImg
                            ?
                            <div className={c.choice}>
                                <div className={c.choice_button + " " + style.button}
                                     onClick={() => addImgAndEnlargeCard()}
                                >
                                    Enlarge the canvas to fit the
                                    image.
                                </div>
                                <div className={c.choice_button + " " + style.button}
                                     onClick={() => addPartImg()}
                                >Add part of the image.
                                </div>

                                <div className={c.choice_button + " " + style.button}
                                     onClick={() => deleteImg()}
                                >Undo pasting this image
                                </div>
                            </div>
                            :
                            <div className={c.img_modal_bottom}>
                                <div
                                    className={imgSelected ? c.img_modal_buttons_active : c.img_modal_buttons_inactive}>
                                    <div className={c.img_modal_save + " " + style.button}
                                         onClick={() => saveImg()}
                                    >Save
                                    </div>
                                    <div className={c.img_modal_delete + " " + style.button}
                                         onClick={() => deleteImg()
                                         }
                                    >Delete
                                    </div>
                                </div>
                                <div className={c.modal_close}>
                                    <div className={style.button}
                                         onClick={() => closeModalImg()}
                                    >Close
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};


function mapStateToProps(state: CardMaker) {
    return {
        sizeCard: state.card.size,
    }
}


const mapDispatchToProps = {
    removeZone,
    addItem,
    addFocusItem,
    removeFocusItems,
    resizeCard
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItems)

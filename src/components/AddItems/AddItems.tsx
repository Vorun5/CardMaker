import React, {useState} from 'react';
import c from './AddItems.module.scss'
import style from "../../style/style.module.scss"
import {
    allTypeArtList,
    CardMaker,
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
import {addFocusItem, addItem, removeFocusItems, resizeCard} from "../../actions/actionsCreaters";
import {connect} from "react-redux";
import {
    AddFocusItemActionsType,
    AddItemActionsType,
    RemoveFocusItemsActionsType,
    ResizeCardActionsType
} from "../../actions/actions";

interface AddItemsProps {
    sizeCard: Size,
    addItem: (item: Item) => AddItemActionsType,
    addFocusItem: (id: ID) => AddFocusItemActionsType,
    removeFocusItems: () => RemoveFocusItemsActionsType,
    resizeCard: (size: Size) => ResizeCardActionsType;
}

const AddItems: React.FC<AddItemsProps> = ({
                                               addItem,
                                               addFocusItem,
                                               removeFocusItems,
                                               sizeCard,
                                               resizeCard
                                           }) => {


    const padding = 20
    const textItem: Item = {
        id: id(),
        data: {
            fontSize: 16,
            type: TypeDate.TextCard,
            body: "Example text",
            color:  '#11a1fb',
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
            typeArt: TypeArt.Bat
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
        removeFocusItems()
        addItem(
            {
                ...item,
                id: idItem
            }
        )
        //addFocusItem(idItem)
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


    const [modalArt, setModalArt] = useState<boolean>(false)

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
                         onClick={() => setModalArt(true)}
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
                <div className={c.modal_content}>
                    <div className={c.modal_title}>
                        {bigImg ? <p>Большое изображение 😱</p> : <p>Выберете изображение</p>}
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
                                    Отпустите изображение, чтобы загрузить</div>
                                : <div
                                    className={c.drag_areal}
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}>
                                    <p> Перенести <b style={warningOneImg ? {
                                        color: '#E76363',
                                        fontWeight: 500
                                    } : {fontWeight: "normal"}}> одно изображение </b> в зону для загрузки.
                                        <br/>
                                        Поддерживаемые форматы <b style={warningFormatFile ? {
                                            color: '#E76363',
                                            fontWeight: 500
                                        } : {fontWeight: "normal"}}>PNG и JPEG</b>.</p>

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
                                    Увеличить размер полотна до размеров картинки
                                </div>
                                <div className={c.choice_button + " " + style.button}
                                     onClick={() => addPartImg()}
                                >Добавить часть фотографии
                                </div>

                                <div className={c.choice_button + " " + style.button}
                                     onClick={() => deleteImg()}
                                >Отменить вставку изображения
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
                                    <div className={style.button}
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
            <div className={modalArt ? c.modal : c.modal_inactive}>
                <div className={c.modal_content}>
                    <div className={c.modal_title}>
                        Выберете art объект
                    </div>
                    <div className={c.art_modal_content}>
                        {allTypeArtList.map((art) =>
                            <div className={c.art_modal_item}
                                onClick={() => {
                                    add({
                                        ...artItem,
                                        data: {
                                            type: TypeDate.Art,
                                            typeArt: art,
                                        }
                                    })
                                    setModalArt(false)
                                }}>

                                <img className={c.art_modal_item_icon} width={50} src={require(`../../static/art/${String(art)}.svg`).default}
                                     alt={String(art)}/></div>
                        )}
                    </div>
                    <div className={c.modal_close}>
                        <div className={style.button}
                             onClick={() => setModalArt(false)}
                        >Close
                        </div>
                    </div>

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
    addItem,
    addFocusItem,
    removeFocusItems,
    resizeCard
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItems)

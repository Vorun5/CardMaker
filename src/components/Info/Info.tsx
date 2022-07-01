import React, {useState} from 'react';
import c from './Info.module.scss'

const Info: React.FC = () => {
    const [info, setInfo] = useState<boolean>(false)

    return (
        <div className={c.container}>
            <div
                onClick={() => {
                    setInfo(!info)
                }}
                className={info ? c.icon + " " + c.icon_active : c.icon}/>
            {info ?
                <div className={c.info}>
                    <div className={c.info_item}> <span className={c.info_item_kye}>delete</span>  удалить элементы</div>
                    <div className={c.info_item}> <span className={c.info_item_kye}>-</span>  убрать фокус с элементов</div>
                    <div className={c.info_item}> <span className={c.info_item_kye}>ctrl + z, x</span>  вперёд и назад по истории</div>
                    <div className={c.info_item}> <span className={c.info_item_kye}>←, →, ↑, ↓</span>  перемещать элементы</div>
                    <div className={c.info_item}> <span className={c.info_item_kye}>shift + ←, →, ↑, ↓</span> изменять размеры элементов</div>
                    <div className={c.info_item}> <span className={c.info_item_kye}>ctrl + ↑, ↓</span>  увеличивать и уменьшать размеры элементов</div>
                </div>

                : null}
        </div>
    );
};

export default Info;

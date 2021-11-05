import React, {useState} from 'react';

interface FilterToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterTool: React.FC<FilterToolProps> = ({active, setActive}) => {
    const [s, setS] = useState('none');
    const colorView = {
        backgroundColor: s,
    }
    return (
        <div className="tools__filter tools__item filter-tool">
            <div  className={active ? 'filter-tool__body filter-tool__body_active' : 'filter-tool__body'}  onClick={ () => setActive(!active)}>

                <div className="body-filter__color">
                    <div className="body-filter__color_view" style={colorView}></div>
                </div>
                <div className="body-filter__icon"/>

            </div>
            <div className={active ? 'filter-tool__select filter-tool__select_active' : 'filter-tool__select'}>

            </div>
        </div>
    );
};

export default FilterTool;

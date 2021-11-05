import React from 'react';

interface FilterToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterTool: React.FC<FilterToolProps> = ({active, setActive}) => {
    return (
        <div className="tools__filter tools__item filter-tool">
            <div className={active ? 'filter-tool__body filter-tool__body_active' : 'filter-tool__body'}  onClick={ () => setActive(!active)}>

                <div className=""></div>
                <div></div>

            </div>
            <div className={active ? 'filter-tool__select filter-tool__select_active' : 'filter-tool__select'}>

            </div>
        </div>
    );
};

export default FilterTool;

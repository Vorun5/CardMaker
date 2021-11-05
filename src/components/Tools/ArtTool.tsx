import React from 'react';


interface ArtToolProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArtTool: React.FC<ArtToolProps> = ({active, setActive}) => {
    return (
        <div className="tools__art art-tool tools__item">
            <div
                className={active ? 'art-tool__body art-tool__body_active' : 'art-tool__body'}
                onClick={ () => setActive(!active)}
            >
                <div></div>
            </div>
            <div className={active ? 'art-tool__select art-tool__select_active' : 'art-tool__select'}>

            </div>
        </div>
    );
};

export default ArtTool;

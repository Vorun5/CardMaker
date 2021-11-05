import React from 'react';
import style from './AppBackground.module.scss';

const AppBackground: React.FC = (props) => {
    return (
        <div className={style.myBc}>
            {props.children}
        </div>
    );
};

export default AppBackground;

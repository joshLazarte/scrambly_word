import React from 'react';
import './Button.scss';

const Button = ({ icon, onClick, backgroundColor }) => {
    return (
        <button style={{backgroundColor}}className="Button" onClick={onClick}>
            <i className={icon} />
        </button>
    )
};

export default Button;

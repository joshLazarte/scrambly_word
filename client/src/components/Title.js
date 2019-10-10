import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';
import './Title.scss';


const Title = () => {
    const title = 'scrambly word!';

    const blankStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        display: 'inline-block',
        margin: '5px'
    };

    const titleArr = title.split('').map(char => {
        if (char === ' ') {
            return <div key={uuidv4()} style={blankStyle}></div>;
        }
        else if (char === '!') {
            return <Letter key={uuidv4()} letter={'bang'}/>;
        }

        return <Letter key={uuidv4()} letter={char}/>;
    });

    return (
        <div className="Title">
        <div>
        {titleArr.map(char => (char))}
        </div>
    </div>
    );
};

export default Title;

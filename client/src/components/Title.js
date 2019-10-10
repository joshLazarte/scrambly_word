import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';
import './Title.scss';
import Blank from './Blank';


const Title = () => {
    const title = 'scrambly word!';
    const titleArr = title.split('').map(char => {
        if (char === ' ') {
            return <Blank key={uuidv4()} />;
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

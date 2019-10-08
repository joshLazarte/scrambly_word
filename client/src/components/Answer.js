import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';

const Answer = ({ answer, isSolved }) => {
    const chars = answer.split('');
    const blankStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: 'gray',
        display: 'inline-block',
        margin: '5px'
    };
    return (
        <div className="Answer">
        {chars.map(char => (
        isSolved ? 
        <Letter key={uuidv4()} letter={char}/>
        : <div key={uuidv4()} style={blankStyle}></div>
        ))}
      </div>
    );
};

export default Answer;

import React from 'react';
import Letter from './Letter';

const Answer = ({ answer, isSolved }) => {
    const chars = answer.split('');
    const blankStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: 'gray',
        display: 'inline-block',
        margin: '5px'
    }

    return (
        <div className="Answer">
        {chars.map(char => (
        isSolved ? 
        <Letter letter={char}/>
        : <div style={blankStyle}></div>
        ))}
      </div>
    );
};

export default Answer;

import React from 'react';
import Letter from './Letter';


const Guess = ({ guess, wordLength }) => {
    const blankStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        border: '1px solid black',
        display: 'inline-block',
        margin: '5px'
    }

    const getGuess = () => {
        const guessArr = guess.split('');
        const numBlanks = wordLength - guess.length;
        const currentGuess = [];

        for (let i = 0; i < wordLength; i++) {
            if (guessArr[i]) {
                currentGuess.push(guessArr[i]);
            }
            else {
                currentGuess.push(null);
            }
        }
        return currentGuess;
    }

    const currentGuess = getGuess();

    return (
        <div className="Guess">
        {currentGuess.map(char => (
        char ? <Letter letter={char}/>
        : <div style={blankStyle}></div>
        ))}
      </div>
    );
};

export default Guess;

import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';
import Button from './Button';
import Blank from './Blank';

import './Guess.scss';

const Guess = ({ guess, wordLength, verifyGuess, removeLetterFromGuess }) => {
  const getGuess = () => {
    const currentGuess = [];

    for (let i = 0; i < wordLength; i++) {
      if (guess[i]) {
        currentGuess.push(guess[i]);
      }
      else {
        currentGuess.push(null);
      }
    }
    return currentGuess;
  };

  const currentGuess = getGuess();

  const handleClick = () => {
    const guessStr = guess.map(letter => letter.letter).join('');
    verifyGuess(guessStr);
  };

  const handleUndoClick = () => {
    removeLetterFromGuess();
  };

  return (
    <div className='Guess'>
      <div>
        {currentGuess.map(letter =>
          letter ? (
            <Letter key={letter.id} letter={letter.letter} id={letter.id} />
          ) : (
            <Blank key={uuidv4()} border={'1px solid black'}/>
          )
        )}
        <Button icon={'fas fa-undo'} onClick={handleUndoClick} backgroundColor={'#d57500'}/>
        <Button icon={'fas fa-check'} onClick={handleClick} backgroundColor={'#668d3c'}/>
      </div>
    </div>
  );
};

export default Guess;

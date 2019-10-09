import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';

const Guess = ({ guess, wordLength, verifyGuess, removeLetterFromGuess }) => {
  const blankStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    border: '1px solid black',
    display: 'inline-block',
    margin: '5px'
  };

  const getGuess = () => {
    const currentGuess = [];

    for (let i = 0; i < wordLength; i++) {
      if (guess[i]) {
        currentGuess.push(guess[i]);
      } else {
        currentGuess.push(null);
      }
    }
    return currentGuess;
  };

  const currentGuess = getGuess();

  const handleClick = () => {
    verifyGuess(guess);
  };

  const handleUndoClick = () => {
    removeLetterFromGuess();
  };

  return (
    <div className='Guess'>
      {currentGuess.map(letter =>
        letter ? (
          <Letter key={letter.id} letter={letter.letter} id={letter.id} />
        ) : (
          <div key={uuidv4()} style={blankStyle}></div>
        )
      )}
      <button onClick={handleUndoClick}>undo</button>
      <button onClick={handleClick}>submit</button>
    </div>
  );
};

export default Guess;

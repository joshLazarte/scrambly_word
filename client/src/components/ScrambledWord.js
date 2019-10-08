import React from 'react';
import Letter from './Letter';
import uuidv4 from 'uuid/v4';

const ScrambledWord = ({ word, guessLetter, currentGuess, scrambleWord }) => {
  const isDisabled = (letter) => {
    return currentGuess.indexOf(letter) > -1;
  };

  const handleClick = () => {
    scrambleWord(word.join(''));
  }

  return (
    <div className='ScrambledWord'>
      {word.map(letter => (
        <Letter key={uuidv4()} letter={letter} onClick={isDisabled(letter) ? null : guessLetter}/>
      ))}
      <button onClick={handleClick} >re-scramble</button>
    </div>
  );
};

export default ScrambledWord;

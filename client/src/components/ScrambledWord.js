import React from 'react';
import Letter from './Letter';

const ScrambledWord = ({ word, guessLetter, currentGuess, scrambleWord }) => {
  const isDisabled = letter => {
    let disabled = false;
    currentGuess.forEach(l => {
      if (l.id === letter.id) {
        disabled = true;
      }
    });

    return disabled;
  };

  const handleClick = () => {
    scrambleWord(word);
  };

  return (
    <div className='ScrambledWord'>
      {word.map(letter => (
        <Letter
          key={letter.id}
          id={letter.id}
          letter={letter.letter}
          onClick={isDisabled(letter) ? null : guessLetter}
        />
      ))}
      <button onClick={handleClick}>re-scramble</button>
    </div>
  );
};

export default ScrambledWord;

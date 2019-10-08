import React from 'react';
import Letter from './Letter';

const ScrambledWord = ({ word, guessLetter }) => {

  return (
    <div className='ScrambledWord'>
      {word.map(letter => (
        <Letter letter={letter} guessLetter={guessLetter}/>
      ))}
    </div>
  );
};

export default ScrambledWord;

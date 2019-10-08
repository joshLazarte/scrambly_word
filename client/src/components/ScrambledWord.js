import React from 'react';
import Letter from './Letter';

const ScrambledWord = ({ word }) => {
  return (
    <div className='ScrambledWord'>
      {word.map(letter => (
        <Letter letter={letter} />
      ))}
    </div>
  );
};

export default ScrambledWord;

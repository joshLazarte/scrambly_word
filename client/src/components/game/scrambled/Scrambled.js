import React from 'react';
import Letter from '../../display/letter/Letter';
import Button from '../../display/button/Button';
import './Scrambled.scss';

const Scrambled = ({ word, guessLetter, currentGuess, scrambleWord }) => {
  const isDisabled = letter => {
    let disabled = false;
    currentGuess.forEach(l => {
      if (l.id === letter.id) {
        disabled = true;
        return;
      }
    });

    return disabled;
  };

  const handleClick = () => {
    scrambleWord(word);
  };

  return (
    <div className='ScrambledWord'>
      <div className=''>
        {word.map(letter => (
          <Letter
            key={letter.id}
            id={letter.id}
            letter={letter.letter}
            disabled={isDisabled(letter)}
            onClick={guessLetter}
          />
        ))}
        <Button
          onClick={handleClick}
          icon={'fas fa-sync'}
          backgroundColor={'#855723'}
        />
      </div>
    </div>
  );
};
export default Scrambled;

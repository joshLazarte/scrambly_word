import React from 'react';
import Letter from '../../display/letter/Letter';
import Button from '../../display/button/Button';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Scrambled: {
    position: 'relative',
    width: props => props.circleSize,
    height: props => props.circleSize,
    padding: '0',
    margin: '5rem auto'
  }
});

const getLetterStyles = () => {
  const letterStyles = {};
  let angle = 360 / 4;
  let rot = 0;
  let offset = 5;

  for (let i = 0; i < 4; i++) {
    const currentRotation = rot * 1;
    const currentOffset = currentRotation + offset;

    letterStyles[`letter${i}`] = {
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: '-2.5rem',
      transform: `rotate(-${currentRotation}deg) translate(8rem) rotate(${currentOffset}deg)`
    };

    offset = -offset;
    rot = rot + angle;
  }

  return letterStyles;
};

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

  const classes = useStyles({ circleSize: '16rem' });
  const letterStyles = getLetterStyles();
  return (
    <div >
      <div className={classes.Scrambled}>
        {word.map((letter, i) => (
        <span style={letterStyles[`letter${i}`]}>
          <Letter
            key={letter.id}
            id={letter.id}
            letter={letter.letter}
            disabled={isDisabled(letter)}
            onClick={guessLetter}
          />
          </span>
        ))}
      </div>
      <Button
          onClick={handleClick}
          icon={'fas fa-sync'}
          backgroundColor={'#855723'}
        />
    </div>
  );
};
export default Scrambled;

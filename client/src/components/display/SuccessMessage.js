import React from 'react';
import Portal from './Portal';
import { createUseStyles } from 'react-jss';
import Letter from './letter/Letter';
import uuidv4 from 'uuid/v4';

const message = ['level', 'completed'];

const useStyles = createUseStyles({
  SuccessMessage: {
    zIndex: '999',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#8f3b1b',
    textAlign: 'center',
    padding: '3rem',
    borderRadius: '2rem'
  }
});

const SuccessMessage = () => {
  const classes = useStyles();
  return (
    <Portal id='success-message'>
      <div className={classes.SuccessMessage}>
        <h2>
          {message[0].split('').map(char => (
            <Letter key={uuidv4()} letter={char} />
          ))}
        </h2>
        <h2>
          {message[1].split('').map(char => (
            <Letter key={uuidv4()} letter={char} />
          ))}
          <Letter key={uuidv4()} letter={'bang'} />
        </h2>
      </div>
    </Portal>
  );
};

export default SuccessMessage;

import React from 'react';
import Letter from './Letter';
import Blank from './Blank';
import uuidv4 from 'uuid/v4';

import './Answer.scss';

const Answer = ({ answer, isSolved }) => {
  const chars = answer.split('');

  return (
    <div className='Answer'>
      {chars.map(char =>
        isSolved ? (
          <Letter key={uuidv4()} letter={char} />
        ) : (
          <Blank key={uuidv4()} backgroundColor={'#8f3b1b'}/>
        )
      )}
    </div>
  );
};

export default Answer;

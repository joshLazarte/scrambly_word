import React from 'react';
import Answer from '../answer/Answer';
import uuidv4 from 'uuid/v4';

import './Answers.scss';

const Answers = ({ answers }) => {
  const chunkAnswers = () => {
    const third = Math.ceil(answers.size / 3);
    const arr = [...answers.keys()];
    const chunks = [];
    let i = 0;
    while (i < 2) {
      chunks.push(arr.splice(0, third));
      i++;
    }
    chunks.push(arr);

    return chunks;
  };

  return (
    <div className='Answers'>
      {chunkAnswers().map(chunk => (
        <div key={uuidv4()}>
          {chunk.map(answer => (
            <Answer
              key={uuidv4()}
              answer={answer}
              isSolved={answers.get(answer)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Answers;

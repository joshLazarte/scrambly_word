import React from 'react';
import Answer from './Answer';
import uuidv4 from 'uuid/v4';

import './Answers.scss';

const Answers = ({ answers }) => {
  const chunkAnswers = () => {
    const third = Math.ceil(answers.length / 3);
    const arr = [...answers];
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
              answer={answer.answer}
              isSolved={answer.isSolved}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Answers;

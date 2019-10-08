import React from 'react';
import Answer from './Answer';
import uuidv4 from 'uuid/v4';

const Answers = ({ answers }) => {
    return (
        <div className="Answer">
        {answers.map(answer => (
            <Answer key={uuidv4()} answer={answer.answer} isSolved={answer.isSolved}/>
        ))}
      </div>
    );
};

export default Answers;

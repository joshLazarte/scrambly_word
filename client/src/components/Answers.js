import React from 'react';
import Answer from './Answer';


const Answers = ({ answers }) => {
    return (
        <div className="Answer">
        {answers.map(answer => (
            <Answer answer={answer.answer} isSolved={answer.isSolved}/>
        ))}
      </div>
    );
};

export default Answers;

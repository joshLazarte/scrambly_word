import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Answers from './Answers';
import Guess from './Guess';
import ScrambledWord from './ScrambledWord';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [wordOptions, setWordOptions] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentOptions, setcurrentOptions] = useState({});
  const [guess, setGuess] = useState('');

  useEffect(() => {
    (async() => {
      const res = await axios.get('/options/5/15');
      const words = res.data;
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      const res2 = await axios.get(`/options/${randomWord}`);
      setCurrentWord(randomWord);
      setWordOptions(words.filter(word => word !== randomWord));
      await setcurrentOptions({ ...res2.data });
      setLoading(false);
    })();
  }, []);

  const scrambleWord = word => {
    const arr = word.split('');
    const length = arr.length;
    const scrambled = [];

    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * arr.length);
      scrambled.push(arr.splice(random, 1));
    }
    return scrambled;
  };

  const getAnswers = () => {
    let length = currentWord.length;

    let answers = [...currentOptions[length]];
    length -= 1;
    while (length > 1) {
      if (currentOptions[length]) {
        answers = [...answers, ...currentOptions[length]];
      }
      length--;
    }

    return answers.map(answer => ({ answer, isSolved: false }));
  };

  const guessLetter = (letter) => {
    const newGuess = guess + letter;
    setGuess(newGuess);
  };



  return (
    <div className='Game'>
      {loading ? 'loading' : (
      <div>
      {Object.entries(currentOptions).length !== 0 && (
      <div>
      <Answers answers={getAnswers()}/>
      <Guess guess={guess} wordLength={currentWord.length}/>
      </div>
      )}
      
      <ScrambledWord word={scrambleWord(currentWord)} guessLetter={guessLetter}/>
      </div>
      
      )}
    </div>
  );
};

export default Game;

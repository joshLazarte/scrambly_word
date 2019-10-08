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
  const [scrambledWord, setScrambledWord] = useState([]);

  useEffect(() => {
    (async() => {
      const res = await axios.get('/options/5/15');
      const words = res.data;
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      const res2 = await axios.get(`/options/${randomWord}`);
      setCurrentWord(randomWord);
      setWordOptions(words.filter(word => word !== randomWord));
      setcurrentOptions(getAnswers(res2.data));
      scrambleWord(randomWord);
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


    setScrambledWord(scrambled);
  };

  const getAnswers = (optionsObj) => {
    return [].concat
      .apply([], Object.values(optionsObj))
      .map(answer => ({ answer, isSolved: false }));
  };

  const guessLetter = (letter) => {
    const newGuess = guess + letter;
    setGuess(newGuess);
  };


  const verifyGuess = currentGuess => {
    const updated = currentOptions.map(option =>
      option.answer === currentGuess ? { answer: option.answer, isSolved: true } : option
    );

    const solved = updated.filter(answer => answer.isSolved);
    setcurrentOptions(updated);
    setGuess('');
    if (solved.length === updated.length) goToNextLevel();
  };

  const removeLetterFromGuess = letter => {
    const str = guess.substring(0, guess.length - 1);
    setGuess(str);
  };

  const goToNextLevel = async() => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * wordOptions.length);
    const randomWord = wordOptions[randomIndex];
    const newoptions = await axios.get(`/options/${randomWord}`);
    setCurrentWord(randomWord);
    setWordOptions(wordOptions.filter(word => word !== randomWord));
    setcurrentOptions(getAnswers(newoptions.data));
    scrambleWord(randomWord);
    setLoading(false);
  };


  return (
    <div className='Game'>
      {loading ? 'loading' : (
      <div>
      {currentOptions.length !== 0 && (
      <div>
      <Answers answers={currentOptions}/>
      <Guess guess={guess} wordLength={currentWord.length} verifyGuess={verifyGuess} removeLetterFromGuess={removeLetterFromGuess}/>
      </div>
      )}
      
      <ScrambledWord currentGuess={guess} word={scrambledWord} guessLetter={guessLetter} scrambleWord={scrambleWord}/>
      </div>
      
      )}
    </div>
  );
};

export default Game;

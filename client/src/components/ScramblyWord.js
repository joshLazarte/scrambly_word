import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Title from './display/title/Title';
import Answers from './game/answers/Answers';
import Guess from './game/guess/Guess';
import Scrambled from './game/scrambled/Scrambled';
import uuidv4 from 'uuid/v4';

const ScramblyWord = () => {
  const [loading, setLoading] = useState(true);
  const [wordOptions, setWordOptions] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentOptions, setcurrentOptions] = useState({});
  const [guess, setGuess] = useState([]);
  const [scrambledWord, setScrambledWord] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/options/5/8');
      const words = res.data;
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      const res2 = await axios.get(`/options/${randomWord}`);
      setCurrentWord(randomWord);
      setWordOptions(words.filter(word => word !== randomWord));
      setcurrentOptions(getAnswers(res2.data, randomWord.length));

      const wordArr = randomWord.split('').map(letter => {
        return { letter };
      });

      scrambleWord(wordArr);
      setLoading(false);
    })();
  }, []);

  const scrambleWord = wordArr => {
    const scrambled = [];

    while (wordArr.length) {
      const random = getRandomIndex(wordArr.length);
      const oldLetter = wordArr.splice(random, 1)[0];

      const letter = {
        letter: oldLetter.letter,
        id: oldLetter.id ? oldLetter.id : uuidv4()
      };
      scrambled.push(letter);
    }

    setScrambledWord(scrambled);
  };

  const getRandomIndex = arrLength => {
    return Math.floor(Math.random() * arrLength);
  };

  const getNumAnswers = length => {
    const numAnswerOptions = [
      null,
      null,
      null,
      [4, 5, 6, 7, 8],
      [4, 5, 6, 7, 8, 9, 10, 11, 12],
      [5, 6, 7, 8, 9, 10, 11, 12],
      [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [8, 9, 10, 11, 12, 13, 14, 15, 16]
    ];

    if (length > 7)
      return numAnswerOptions[7][getRandomIndex(numAnswerOptions[7])];

    const optionsRange = numAnswerOptions[length];
    const idx = getRandomIndex(optionsRange.length);
    return optionsRange[idx];
  };

  const getAnswers = (optionsObj, length) => {
    let options = Object.values(optionsObj);
    let numAnswers = getNumAnswers(length);
    let answers = [...options.pop()];
    if (length > 4) options.shift();
    if (length > 7) options.shift();
    let i = 0;
    while (numAnswers > 0 && options.length) {
      if (i === options.length) i = 0;
      if (!options[i].length) {
        options.splice(i, 1);
      } else {
        answers.push(options[i].pop());
        i++;
        numAnswers--;
      }
    }

    return answers
      .sort()
      .sort((a, b) => (a.length < b.length ? -1 : 1))
      .map(answer => ({ answer, isSolved: false }));
  };

  const guessLetter = letter => {
    setGuess([...guess, letter]);
  };

  const verifyGuess = currentGuess => {
    const updated = currentOptions.map(option =>
      option.answer === currentGuess
        ? { answer: option.answer, isSolved: true }
        : option
    );

    const solved = updated.filter(answer => answer.isSolved);
    setcurrentOptions(updated);
    setGuess([]);
    if (solved.length === updated.length) goToNextLevel();
  };

  const removeLetterFromGuess = () => {
    const newGuess = guess.splice(0, guess.length - 1);
    setGuess(newGuess);
  };

  const goToNextLevel = async () => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * wordOptions.length);
    const randomWord = wordOptions[randomIndex];
    const newoptions = await axios.get(`/options/${randomWord}`);
    setCurrentWord(randomWord);
    setWordOptions(wordOptions.filter(word => word !== randomWord));
    setcurrentOptions(getAnswers(newoptions.data, randomWord.length));
    const wordArr = randomWord.split('').map(letter => {
      return { letter };
    });

    scrambleWord(wordArr);
    setLoading(false);
  };

  return (
    <div className='ScramblyWord'>
      <Title />
      {loading ? (
        'loading'
      ) : (
        <Fragment>
          <Answers answers={currentOptions} />
          <Guess
            guess={guess}
            wordLength={currentWord.length}
            verifyGuess={verifyGuess}
            removeLetterFromGuess={removeLetterFromGuess}
          />
          <Scrambled
            currentGuess={guess}
            word={scrambledWord}
            guessLetter={guessLetter}
            scrambleWord={scrambleWord}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ScramblyWord;

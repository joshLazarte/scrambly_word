import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Title from './display/title/Title';
import Answers from './game/answers/Answers';
import Guess from './game/guess/Guess';
import Scrambled from './game/scrambled/Scrambled';
import ProgressTracker from './display/ProgressTracker';
import MessageModal from './display/MessageModal';
import uuidv4 from 'uuid/v4';

const ScramblyWord = () => {
  const [loading, setLoading] = useState({
    isLoading: true,
    msg: 'welcome to scramblyword'
  });
  const [wordOptions, setWordOptions] = useState([]);
  const [answers, setAnswers] = useState(new Map());
  const [guess, setGuess] = useState([]);
  const [scrambledWord, setScrambledWord] = useState([]);
  const [progress, setProgress] = useState({ rank: 'Beginner', level: 0 });

  useEffect(() => {
    (async () => {
      const res = await axios.get('/options/4/7');
      const words = res.data;
      await initNewLevel(words);
    })();
  }, []);

  const initNewLevel = async words => {
    const randomWord = words.splice(getRandomIndex(words.length), 1)[0];
    const res2 = await axios.get(`/options/${randomWord}`);
    const wordArr = randomWord.split('').map(letter => {
      return { letter, id: uuidv4() };
    });
    setWordOptions(words);
    setAnswers(getAnswers(res2.data, randomWord.length));
    scrambleWord(wordArr);
    setProgress(st => {
      return { rank: st.rank, level: st.level + 1 };
    });
    setTimeout(() => setLoading({ isLoading: false }), 1500);
  };

  const getRandomIndex = arrLength => Math.floor(Math.random() * arrLength);

  const scrambleWord = wordArr => {
    const scrambled = [];

    while (wordArr.length) {
      const random = getRandomIndex(wordArr.length);
      const letter = wordArr.splice(random, 1)[0];
      scrambled.push(letter);
    }
    setScrambledWord(scrambled);
  };

  const getNumAnswers = length => {
    const numAnswerOptions = new Map([
      [3, [4, 5, 6, 7, 8]],
      [4, [4, 5, 6, 7, 8, 9, 10, 11, 12]],
      [5, [4, 5, 6, 7, 8, 9, 10, 11, 12]],
      [6, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
      [7, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
    ]);

    if (length > 6) length = 7;
    const optionsRange = numAnswerOptions.get(length);
    const idx = getRandomIndex(optionsRange.length);
    return optionsRange[idx];
  };

  const getAnswers = (optionsObj, length) => {
    let options = Object.values(optionsObj);
    let numAnswers = getNumAnswers(length);
    let answersArr = [...options.pop()];
    if (length > 4) options.shift();
    if (length > 7) options.shift();
    let i = 0;
    while (numAnswers > 0 && options.length) {
      if (i === options.length) i = 0;
      if (!options[i].length) {
        options.splice(i, 1);
      } else {
        answersArr.push(options[i].pop());
        i++;
        numAnswers--;
      }
    }

    const answers = new Map();

    answersArr
      .sort()
      .sort((a, b) => (a.length < b.length ? -1 : 1))
      .forEach(a => answers.set(a, false));

    return answers;
  };

  const guessLetter = letter => {
    setGuess([...guess, letter]);
  };

  const verifyGuess = currentGuess => {
    const updated = new Map(answers);
    updated.has(currentGuess) && updated.set(currentGuess, true);
    setAnswers(updated);
    setGuess([]);
    [...updated.values()].every(val => val === true) && goToNextLevel();
  };

  const removeLetterFromGuess = () => {
    const newGuess = guess.splice(0, guess.length - 1);
    setGuess(newGuess);
  };

  const goToNextLevel = async () => {
    setLoading({ isLoading: true, msg: 'level completed' });
    initNewLevel(wordOptions);
  };

  return (
    <div className='ScramblyWord'>
      <Title />
      <ProgressTracker rank={progress.rank} level={progress.level} />
      {loading.isLoading ? (
        <MessageModal message={loading.msg} />
      ) : (
        <Fragment>
          <Answers answers={answers} />
          <Guess
            guess={guess}
            wordLength={scrambledWord.length}
            verifyGuess={verifyGuess}
            removeLetterFromGuess={removeLetterFromGuess}
          />
          <Scrambled
            word={scrambledWord}
            currentGuess={guess}
            guessLetter={guessLetter}
            scrambleWord={scrambleWord}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ScramblyWord;

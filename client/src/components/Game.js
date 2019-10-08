import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrambledWord from './ScrambledWord';

const Game = () => {
  const [loading, setLoading] = useState(true);
  const [wordOptions, setWordOptions] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentOptions, setcurrentOptions] = useState('');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/options/5/15');
      const words = res.data;
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      const res2 = await axios.get(`/options/${randomWord}`);
      setCurrentWord(randomWord);
      setWordOptions(words.filter(word => word !== randomWord));
      setcurrentOptions({ ...res2.data });
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

  return (
    <div className='Game'>
      {loading ? 'loading' : <ScrambledWord word={scrambleWord(currentWord)} />}
    </div>
  );
};

export default Game;

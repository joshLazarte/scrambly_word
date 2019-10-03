const initialWordsArr = require('./wordArr.json');
const TooManyWords = require('an-array-of-english-words');
const Trie = require('./classes/Trie');
const Level = require('./classes/Level');
const Word = require('./classes/Word');
const fs = require('fs');


const dictionary = new Trie();
dictionary.build(initialWordsArr);


//Get all options for a level
const newLevel = new Level({ dictionary, letterCount: 8, numWordsToSolve: 15 });
console.time('getOptions');
const gameOptions = newLevel.getGameOptions();
console.timeEnd('getOptions');

fs.writeFile('options.json', JSON.stringify(gameOptions, null, 2), err => {
    if (err) throw err;
    console.log('done');
});


//find all the possible words for a given group of letters
// const word = new Word('gandinl');
// const allWords = word.getJSONSubwords(dictionary);

// fs.writeFile('subWords.json', JSON.stringify(allWords, null, 2), err => {
//     if (err) throw err;
//     console.log('done');
// });

const used = process.memoryUsage();
console.log(used);

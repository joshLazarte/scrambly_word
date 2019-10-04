const initialWordsArr = require('./wordArr.json');
const TooManyWords = require('an-array-of-english-words');
const Trie = require('./classes/Trie');
const Level = require('./classes/Level');
const Word = require('./classes/Word');
const fs = require('fs');

console.time('buildDictionary');
const dictionary = new Trie();
dictionary.build(initialWordsArr);
console.timeEnd('buildDictionary');

//Get all options for a level
// const newLevel = new Level({ dictionary, letterCount: 7, numWordsToSolve: 15 });
// console.time('getOptions');
// const gameOptions = newLevel.getGameOptions();
// console.timeEnd('getOptions');

// fs.writeFile('options.json', JSON.stringify(gameOptions, null, 2), err => {
//     if (err) throw err;
//     console.log('done');
// });


//find all the possible words for a given group of letters
// console.time('unscrambleWord');
// const word = new Word('landing');
// const allWords = word.getJSONSubwords(dictionary);
// console.timeEnd('unscrambleWord');
// fs.writeFile('subWords.json', JSON.stringify(allWords, null, 2), err => {
//     if (err) throw err;
//     console.log('done');
// });

// const used = process.memoryUsage();
// console.log(used);


const word = new Word('landing');
console.time('getAllSubwords');
word.getJSONSubwords(dictionary);
console.timeEnd('getAllSubwords');

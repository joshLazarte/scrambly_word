const initialWordsArr = require('./wordArr.json');
const Trie = require('./helpers/Trie');
const getAnagrams = require('./helpers/getAnagrams');
const fs = require('fs');

//set number of letters to scramble
//*****************************
const targetWordLength = 7;
//*****************************

//initialize the game options object
// the keys will be all the largest words
//the values will be the list of subwords made from 
//the largest word, seperated by word length
//*****************************
const gameOptions = {};
//*****************************

//create two arrays, one of words with the target number of letters
//one of all the words less
const testWords = [];
const potentialSubWords = [];

console.time('divideArrays');
initialWordsArr.forEach(word => {
    const length = word.length;
    length === targetWordLength && testWords.push(word);
    length < targetWordLength && potentialSubWords.push(word);
});
console.timeEnd('divideArrays');
console.time('buildTrie');


//put all subwords into the Trie
const trie = new Trie();
initialWordsArr.forEach(word => trie.add(word));
console.timeEnd('buildTrie');


//this is the bulk of the logic, and the most expensive
//also the area with the most opportunity for improvement
//for each test word
//create a list of all the possible combinations of letters
//check each of those combinations against the words in the trie
//if you can make the desired number of sub words out of
//the test word, add the test word and all of it's subwords to the
//game options object
console.time('buildGameOptions');
let subWords, subWordKey;
testWords.forEach(word => {
    subWords = {};
    subWordKey = 2;

    while (subWordKey <= targetWordLength) {
        subWords[subWordKey] = new Set();
        subWordKey++;
    }

    const anagrams = getAnagrams(word);
    anagrams.forEach(anagram => {
        const foundWords = trie.findSubWords(anagram);

        for (let key of Object.keys(subWords)) {
            if (foundWords[key]) {
                subWords[key].add(foundWords[key]);
            }
        }
    });

    let numWordsToSolve = 15;
    if (subWords[6].size > 0 &&
        subWords[5].size > 0 &&
        subWords[3].size + subWords[4].size >=
        (numWordsToSolve - (subWords[6].size + subWords[5].size))) {
        for (let key of Object.keys(subWords)) {
            if (subWords[key].size) {
                subWords[key] = [...subWords[key]];
            }
        }
        gameOptions[word] = subWords;
    }
});
console.timeEnd('buildGameOptions');


//write resulting game object to disk
console.time('writeFile');
fs.writeFile('temp.json', JSON.stringify(gameOptions, null, 2), err => {
    if (err) throw err;
    console.log('done');
});
console.timeEnd('writeFile');

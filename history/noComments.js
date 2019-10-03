const initialWordsArr = require('./wordArr.json');
const Trie = require('./helpers/Trie');
const getAnagrams = require('./helpers/getAnagrams');
const fs = require('fs');

const targetWordLength = 7;
const gameOptions = {};
const testWords = [];
const potentialSubWords = [];

initialWordsArr.forEach(word => {
    const length = word.length;
    length === targetWordLength && testWords.push(word);
    length < targetWordLength && potentialSubWords.push(word);
});


const trie = new Trie();
potentialSubWords.forEach(word => trie.add(word));


let subWords, subWordKey;
testWords.forEach(word => {
    subWords = {};
    subWordKey = 2;

    while (subWordKey < targetWordLength) {
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

    let numWordsToSolve = 14;
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


fs.writeFile('temp.json', JSON.stringify(gameOptions, null, 2), err => {
    if (err) throw err;
    console.log('done');
});

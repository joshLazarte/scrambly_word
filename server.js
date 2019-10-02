const initialWordsArr = require('./wordArr.json');
const Trie = require('./helpers/Trie');
const getAnagrams = require('./helpers/getAnagrams');
const fs = require('fs');

//set number of letters tp scramble
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

initialWordsArr.forEach(word => {
    const length = word.length;
    length === targetWordLength && testWords.push(word);
    length < targetWordLength && potentialSubWords.push(word);
});

//put all subwords into the Trie
const trie = new Trie();
potentialSubWords.forEach(word => trie.add(word));

//this is the bulk of the logic, and the most expensive
//also the area with the most opportunity for improvement

//for each test word
//create a list of all the possible combinations of letters
//check each those combinations against the words in the trie
//if you can make the desired number of sub words out of
//the test word, add the test word and all of it's subwords to the
//game options object




// fs.writeFile('useableSevens.json', JSON.stringify(keys, null, 2), err => {
//     if (err) throw err;
//     console.log('done');
// });

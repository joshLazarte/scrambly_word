const sevenLetterWords = require('./words/sevenLetterWords.json');
const sixOrLess = require('./words/sixOrLess.json');
const Trie = require('./helpers/Trie');
const getAnagrams = require('./helpers/getAnagrams');
const fs = require('fs');



//build trie from six letter or less words
console.time('buildTrie');
const trie = new Trie();
sixOrLess.forEach(word => {
    trie.add(word);
});
console.timeEnd('buildTrie');


//find all the usable seven letter words and words that can be made from them
console.time('getUsables');
const usables = {};
sevenLetterWords.forEach(word => {
    const subWords = {
        3: [],
        4: [],
        5: [],
        6: []
    };

    const anagrams = getAnagrams(word);
    anagrams.forEach(anagram => {
        const foundWords = trie.findSubWords(anagram);
        for (let key of Object.keys(subWords)) {
            if (foundWords[key].length && subWords[key].indexOf(foundWords[key][0]) < 0) {
                subWords[key] = [...subWords[key], ...foundWords[key]];
            }
        }
    });

    let target = 14;
    if (subWords[6].length > 0 &&
        subWords[5].length > 0 &&
        subWords[3].length + subWords[4].length >= (target - (subWords[6].length + subWords[5].length))) {
        usables[word] = subWords;
    }
});
console.timeEnd('getUsables');


//write the data to a json file
console.time('writeData');
const jsonData = JSON.stringify(usables, null, 2);

fs.writeFile('temp.json', jsonData, err => {
    if (err) throw err;
    console.log('it actually worked');
});
console.timeEnd('writeData');

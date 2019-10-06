const allWords = require('../../word_DB/allWords.json');
const commonWords = require('../../word_DB/commonWords.json');
const Trie = require('../../classes/Trie');
const fs = require('fs');

const dictionary = new Trie();
dictionary.build(allWords);

console.time('unscramble');
const subWords = dictionary.allSubWordsToJSON('landing');
console.timeEnd('unscramble');

fs.writeFile('subwords.json', JSON.stringify(subWords, null, 2), err => {
  if (err) throw err;
  console.log('Wrote to subwords.json');
});

const commonWords = require('../../word_DB/commonWords.json');
const Trie = require('../../classes/Trie');
const Level = require('../../classes/Level');
const fs = require('fs');

const dictionary = new Trie();
dictionary.build(commonWords);

const levelParams = {
  dictionary,
  letterCount: 7,
  numWordsToSolve: 15
};

const newLevel = new Level(levelParams);
console.time('getGameOptions');
const gameOptions = newLevel.getWordOptions();
console.timeEnd('getGameOptions');

fs.writeFile('gameOptions.json', JSON.stringify(gameOptions, null, 2), err => {
  if (err) throw err;
  console.log('Wrote to gameOptions.json');
});

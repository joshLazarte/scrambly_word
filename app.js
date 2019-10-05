const allWords = require('./word_DB/allWords.json');
const commonWords = require('./word_DB/commonWords.json');
const fs = require('fs');

fs.writeFile('temp.json', JSON.stringify(commonWords), err => {
  if (err) throw err;
  console.log('Wrote to temp.json');
});

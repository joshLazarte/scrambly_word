const express = require('express');
const app = express();
const Trie = require('./classes/Trie');
const FullWordList = require('./word_DB/allWords.json');
const commonWordList = require('./word_DB/commonWords.json');

const fullDictionary = new Trie();
fullDictionary.build(FullWordList);

const commonWords = new Trie();
commonWords.build(commonWordList);

app.set('dictionary', fullDictionary);
app.set('commonDictionary', commonWords);

app.use('/descramble', require('./routes/descramble'));
app.use('/options', require('./routes/gameOptions'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server start on port ${port}`));

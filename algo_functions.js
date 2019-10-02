const initialWordsArr = require('./wordArr.json');
const Trie = require('./helpers/Trie');
const getAnagrams = require('./helpers/getAnagrams');
const trie = new Trie();

const divideArrays = (targetWordLength) => {
    const testWords = [];
    const potentialSubWords = [];

    initialWordsArr.forEach(word => {
        const length = word.length;
        length === targetWordLength && testWords.push(word);
        length < targetWordLength && potentialSubWords.push(word);
    });

    return [testWords, potentialSubWords];
};

const findAllSubwords = (word, subWordsObj) => {
    const anagrams = getAnagrams(word);
    anagrams.forEach(anagram => {
        const foundWords = trie.findSubWords(anagram);
        for (let key of Object.keys(subWordsObj)) {
            if (foundWords[key]) {
                subWordsObj[key].add(foundWords[key]);
            }
        }
    });
};

const wordIsUseable = (subWords, numWordsToSolve) => {
    return (subWords[6].size > 0 &&
        subWords[5].size > 0 &&
        subWords[3].size + subWords[4].size >=
        (numWordsToSolve - (subWords[6].size + subWords[5].size)));
};

const buildUseableWords = (targetWordLength, testWords) => {
    const gameOptions = {};
    let subWords, subWordKey;
    testWords.forEach(word => {
        subWords = {};
        subWordKey = 2;

        while (subWordKey < targetWordLength) {
            subWords[subWordKey] = new Set();
            subWordKey++;
        }

        findAllSubwords(word, subWords);

        let numWordsToSolve = 14;

        if (wordIsUseable(subWords, numWordsToSolve)) {
            for (let key of Object.keys(subWords)) {
                if (subWords[key].size) {
                    subWords[key] = [...subWords[key]];
                }
            }
            gameOptions[word] = subWords;
        }
    });

    return gameOptions;
};

const getGameOptions = (targetWordLength) => {

    const [testWords, potentialSubWords] = divideArrays(targetWordLength);

    potentialSubWords.forEach(word => trie.add(word));

    const gameOptions = buildUseableWords(targetWordLength, testWords);

    return gameOptions;
};

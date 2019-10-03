const initialWordsArr = require('./wordArr.json');
const Trie = require('./classes/Trie');
const fs = require('fs');

class Rule {
    constructor(params) {
        Object.assign(this, params);
    }

    wordListIsValid(wordList) {
        const bigWordSize = this.letterCount - 1;
        const mediumWordSize = this.letterCount - 2;
        const numBigWords = wordList[bigWordSize].size;
        const numMediumWords = wordList[mediumWordSize].size;
        let smallWordSize = this.letterCount - 3;
        let numSmallWords = 0;

        while (smallWordSize > 1 && smallWordSize >= mediumWordSize - 2) {
            numSmallWords += wordList[smallWordSize].size;
            smallWordSize--;
        }

        return (numBigWords > 0 &&
            numMediumWords > 0 &&
            numSmallWords >= this.numWordsToSolve - (numBigWords + numMediumWords));
    }
}


class Level extends Rule {

    divideWords() {
        const testWords = [];
        const potentialSubWords = [];

        this.words.forEach(word => {
            const length = word.length;
            length === this.letterCount && testWords.push(word);
            length <= this.letterCount && potentialSubWords.push(word);
        });

        return [testWords, potentialSubWords];
    }

    getGameOptions() {
        const [testWords, potentialSubWords] = this.divideWords();
        const gameOptions = {};

        const trie = new Trie();
        potentialSubWords.forEach(word => trie.add(word));


        testWords.forEach(testWord => {
            const word = new Word(testWord);
            let subWords = word.getAllSubwords(trie);

            if (this.wordListIsValid(subWords)) {
                for (let key of Object.keys(subWords)) {
                    if (subWords[key].size) {
                        subWords[key] = [...subWords[key]];
                    }
                }
                gameOptions[testWord] = subWords;
            }
        });

        return gameOptions;
    }
}

class Word {
    constructor(word) {
        this.word = word;
    }

    getAnagrams() {
        const anagrams = [],
            chars = this.word.split(''),
            length = chars.length,
            counter = Array.from({ length }, () => 0),
            swap = (chars, i, j) => {
                [chars[i], chars[j]] = [chars[j], chars[i]];
            };

        anagrams.push(this.word);
        let i = 0;
        while (i < length) {
            if (counter[i] < i) {
                swap(chars, i % 2 === 1 ? counter[i] : 0, i);
                counter[i]++;
                i = 0;
                anagrams.push(chars.join(''));
            }
            else {
                counter[i] = 0;
                i++;
            }
        }
        return anagrams;
    }

    getAllSubwords(trie) {
        const subWords = {};
        let subWordLength = 2;
        while (subWordLength <= this.word.length) {
            subWords[subWordLength] = new Set();
            subWordLength++;
        }

        const anagrams = this.getAnagrams();

        anagrams.forEach(anagram => {
            const foundWords = trie.findSubWords(anagram);
            for (let key of Object.keys(subWords)) {
                if (foundWords[key]) {
                    subWords[key].add(foundWords[key]);
                }
            }
        });

        return subWords;
    }
}




console.time('initLevel');
const nextLevel = new Level({ words: initialWordsArr, letterCount: 7, numWordsToSolve: 15 });
console.timeEnd('initLevel');


console.time('getGameOptions');
const gameOptions = nextLevel.getGameOptions();
console.timeEnd('getGameOptions');
// //const useableWords = nextLevel.getUseableWords();

// const trie = new Trie();
// initialWordsArr.forEach(word => trie.add(word));
// const word = new Word('hyout');
// const subWords = word.getAllSubwords(trie);
// for (let key of Object.keys(subWords)) {
//     subWords[key] = [...subWords[key]];
// }

fs.writeFile('temp.json', JSON.stringify(gameOptions, null, 2), err => {
    if (err) throw err;
    console.log('done');
});

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

const Rule = require('./Rule');
const Word = require('./Word');

class Level extends Rule {
    getGameOptions() {
        const testWords = this.dictionary.getSameLengthWords(this.letterCount);
        const gameOptions = {};

        testWords.forEach(testWord => {
            const word = new Word(testWord);
            let subWords = word.getAllSubwords(this.dictionary);

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

module.exports = Level;

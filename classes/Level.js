const Rule = require('./Rule');
const Word = require('./Word');

class Level extends Rule {
    getGameOptions() {
        const testWords = this.dictionary.getSameLengthWords(this.letterCount);
        const gameOptions = {};

        testWords.forEach(testWord => {
            const word = new Word(testWord);
            const subWords = word.getAllSubwords(this.dictionary);
            const options = {};

            if (this.wordListIsValid(subWords)) {
                for (let [key, val] of subWords) {
                    if (val.size) {
                        options[key] = [...val];
                    }
                }
                gameOptions[testWord] = options;
            }
        });

        return gameOptions;
    }
}

module.exports = Level;

const Rule = require('./Rule');
const Word = require('./Word');

class Level extends Rule {
  getGameOptions() {
    const testWords = this.dictionary.getSameLengthWords(this.letterCount);
    const len = testWords.length;
    const gameOptions = {};

    for (let i = 0; i < len; i++) {
      const word = new Word(testWords[i]);
      const subWords = word.getAllSubwords(this.dictionary);
      const options = {};

      if (this.wordListIsValid(subWords)) {
        for (let [key, val] of subWords) {
          if (val.size) {
            options[key] = [...val];
          }
        }
        gameOptions[testWords[i]] = options;
      }
    }

    return gameOptions;
  }

  newGameOptions() {
    const testWords = this.dictionary.getSameLengthWords(this.letterCount);
    const len = testWords.length;
    const gameOptions = {};

    for (let i = 0; i < len; i++) {
      const word = new Word(testWords[i]);
      const subWords = word.newSubwordsAlgo(this.dictionary);
      const options = {};

      if (this.wordListIsValid(subWords)) {
        for (let [key, val] of subWords) {
          if (val.size) {
            options[key] = [...val];
          }
        }
        gameOptions[testWords[i]] = options;
      }
    }

    return gameOptions;
  }
}

module.exports = Level;

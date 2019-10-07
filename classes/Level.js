const Rule = require('./Rule');

class Level extends Rule {
  getWordOptions() {
    const testWords = this.dictionary.getSameLengthWords(this.letterCount);
    const gameOptions = [];

    for (let word of testWords) {
      const subWords = this.dictionary.findAllSubwords(word);
      if (this.wordListIsValid(subWords)) gameOptions.push(word);
    }

    return gameOptions;
  }
}

module.exports = Level;

const Rule = require('./Rule');

class Level extends Rule {
  getWordOptions() {
    const testWords = this.dictionary.getSameLengthWords(this.letterCount);
    const gameOptions = {};

    testWords.forEach(word => {
      const subWords = this.dictionary.findAllSubwords(word);
      const options = {};

      if (this.wordListIsValid(subWords)) {
        for (let [key, val] of subWords) {
          if (val.size) {
            options[key] = [...val];
          }
        }
        gameOptions[word] = options;
      }
    });

    return gameOptions;
  }
}

module.exports = Level;

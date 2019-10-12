class Rule {
  constructor(params) {
    Object.assign(this, params);
  }

  isInRange(val, range) {
    return (val - range.min) * (val - range.max) <= 0;
  }

  wordListIsValid(wordList) {
    const bigWordSize = this.letterCount - 1;
    const mediumWordSize = this.letterCount - 2;
    const numBigWords = wordList.get(bigWordSize).size;
    const numMediumWords = wordList.get(mediumWordSize).size;
    let smallWordSize = this.letterCount - 3;
    let numSmallWords = 0;

    while (smallWordSize >= Math.min(...wordList.keys())) {
      numSmallWords += wordList.get(smallWordSize).size;
      smallWordSize--;
    }

    return (
      numBigWords > 0 &&
      numMediumWords > 0 &&
      numSmallWords >= this.numWordsToSolve - (numBigWords + numMediumWords)
    );
  }

  beginner(wordList) {
    const bigWordSize = this.letterCount - 1;
    const subwordSizeRange = { min: 2, max: this.letterCount };
    const answerRange = { min: 3, max: 6 };

    return wordList.get(bigWordSize).size > 0;
  }
}

module.exports = Rule;

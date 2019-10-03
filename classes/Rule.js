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

module.exports = Rule;

class Rules {
    constructor(wordList) {
        this.wordList = wordList;
    }

    beginner() {
        return;
    }

    intermediate() {
        const numWordsToSolve = 11;
        return (this.wordList[5].size &&
            this.wordList[4].size &&
            this.wordList[3].size + this.wordList[2].size >=
            (numWordsToSolve - (this.wordList[5].size + this.wordList[4].size)));
    }

    advanced() {
        const numWordsToSolve = 14;
        return (this.wordList[6].size > 0 &&
            this.wordList[5].size > 0 &&
            this.wordList[3].size + this.wordList[4].size >=
            (numWordsToSolve - (this.wordList[6].size + this.wordList[5].size)));
    }

    expert() {
        return;
    }
}

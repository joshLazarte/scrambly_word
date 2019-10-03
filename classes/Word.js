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

    getJSONSubwords(trie) {
        const subWords = this.getAllSubwords(trie);
        for (let key of Object.keys(subWords)) {
            if (subWords[key].size) {
                subWords[key] = [...subWords[key]];
            }
        }
        return subWords;
    }
}

module.exports = Word;

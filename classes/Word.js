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
      } else {
        counter[i] = 0;
        i++;
      }
    }
    return anagrams;
  }

  newSubwordsAlgo(trie) {
    return trie.findAllSubwords(this.word);
  }

  getAllSubwords(trie) {
    const subWords = new Map();
    let subWordLength = this.word.length < 6 ? 2 : 3;
    while (subWordLength <= this.word.length) {
      subWords.set(subWordLength, new Set());
      subWordLength++;
    }

    const anagrams = this.getAnagrams();
    const numAnagrams = anagrams.length;

    for (let i = 0; i < numAnagrams; i++) {
      const foundWords = trie.findSubWords(anagrams[i]);
      for (let [key, val] of subWords) {
        if (foundWords.has(key)) {
          subWords.set(key, val.add(foundWords.get(key)));
        }
      }
    }

    return subWords;
  }

  getJSONSubwords(trie) {
    const subWords = this.getAllSubwords(trie);
    const options = {};
    for (let [key, val] of subWords) {
      if (val.size) {
        options[key] = [...val];
      }
    }
    return options;
  }
}

module.exports = Word;

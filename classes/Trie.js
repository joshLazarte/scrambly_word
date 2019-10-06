class Node {
  constructor() {
    this.children = new Map();
    this.end = false;
    this.setEnd = () => (this.end = true);
    this.isEnd = () => this.end;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(input, node = this.root) {
    if (input.length == 0) {
      node.setEnd();
      return;
    } else if (!node.children.has(input[0])) {
      node.children.set(input[0], new Node());
      return this.add(input.substring(1), node.children.get(input[0]));
    } else {
      return this.add(input.substring(1), node.children.get(input[0]));
    }
  }

  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.children.has(word[0])) {
        return false;
      } else {
        node = node.children.get(word[0]);
        word = word.substr(1);
      }
    }
    return node.children.has(word) && node.children.get(word).isEnd();
  }

  findSubWords(word) {
    const foundWords = new Map();
    let node = this.root;
    let subWord = '';

    for (let char of word) {
      subWord += char;
      if (!node.children.has(char)) break;

      if (node.children.get(char).isEnd()) {
        foundWords.set(subWord.length, subWord);
      }
      node = node.children.get(char);
    }
    return foundWords;
  }

  getSameLengthWords(length) {
    let words = [];

    const search = (node, nodeCount = 0, str = '') => {
      if (nodeCount === length) {
        node.isEnd() && words.push(str);
        return;
      }

      for (let char of node.children.keys()) {
        nodeCount++;
        str += char;
        search(node.children.get(char), nodeCount, str);
        nodeCount -= 1;
        str = str.substr(0, str.length - 1);
      }
    };

    search(this.root);
    return words.length > 0 ? words : null;
  }

  findAllSubwords(word) {
    const subWords = new Map();
    let subWordLength = word.length < 6 ? 2 : 3;
    while (subWordLength <= word.length) {
      subWords.set(subWordLength, new Set());
      subWordLength++;
    }

    const chars = word.split('');
    const len = chars.length;

    const moveDown = (strMap, substr = '', node = this.root) => {
      const shouldEnd = [...strMap.values()].every(val => val === 0);

      if (node.isEnd()) {
        const length = substr.length;
        subWords.has(length) &&
          subWords.set(length, subWords.get(length).add(substr));
      }

      if (shouldEnd) return;

      for (let key of node.children.keys()) {
        if (strMap.has(key)) {
          if (strMap.get(key) > 0) {
            strMap.set(key, strMap.get(key) - 1);
            substr += key;
            moveDown(strMap, substr, node.children.get(key));
            strMap.set(key, strMap.get(key) + 1);
            substr = substr.substring(0, substr.length - 1);
          }
        }
      }
    };

    const map = new Map();
    chars.forEach(c => {
      map.has(c) ? map.set(c, map.get(c) + 1) : map.set(c, 1);
    });

    for (let i = 0; i < len; i++) {
      const strMap = new Map(map);
      moveDown(strMap);
      i++;
    }

    return subWords;
  }

  allSubWordsToJSON(word) {
    const subWords = this.findAllSubwords(word);
    const JSONSubwords = {};

    for (let [key, val] of subWords) {
      if (val.size) {
        JSONSubwords[key] = [...val];
      }
    }

    return JSONSubwords;
  }

  build(arr) {
    arr.forEach(item => this.add(item));
  }
}

module.exports = Trie;

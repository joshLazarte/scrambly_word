class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
      this.end = true;
    };
    this.isEnd = function() {
      return this.end;
    };
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
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      return this.add(input.substring(1), node.keys.get(input[0]));
    } else {
      return this.add(input.substring(1), node.keys.get(input[0]));
    }
  }

  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
    return node.keys.has(word) && node.keys.get(word).isEnd();
  }

  findSubWords(word) {
    const foundWords = new Map();
    let node = this.root;
    let subWord = '';

    for (let char of word) {
      subWord += char;
      if (!node.keys.has(char)) break;

      if (node.keys.get(char).isEnd()) {
        foundWords.set(subWord.length, subWord);
      }
      node = node.keys.get(char);
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

      for (let char of node.keys.keys()) {
        nodeCount++;
        str += char;
        search(node.keys.get(char), nodeCount, str);
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

    const moveDown = (
      strObj,
      foundChars = [],
      substr = '',
      node = this.root
    ) => {
      if (Object.values(strObj).every(val => val === 0)) {
        if (node.isEnd()) {
          if (subWords.has(substr.length)) {
            const set = subWords.get(substr.length);
            subWords.set(substr.length, set.add(substr));
          }
        }
        return;
      }

      if (!node.keys.size) {
        if (node.isEnd()) {
          if (subWords.has(substr.length)) {
            const set = subWords.get(substr.length);
            subWords.set(substr.length, set.add(substr));
          }
        }
        return;
      }

      if (node.isEnd()) {
        if (subWords.has(substr.length)) {
          const set = subWords.get(substr.length);
          subWords.set(substr.length, set.add(substr));
        }
      }

      for (let key of node.keys.keys()) {
        if (strObj[key] > 0) {
          foundChars.push(key);
          strObj[key] -= 1;
          substr += key;
          node.keys.get(key);
          moveDown(strObj, foundChars, substr, node.keys.get(key));
          const lastChar = foundChars.pop();
          strObj[lastChar] += 1;
          substr = substr.substring(0, substr.length - 1);
        }
      }
    };

    chars.forEach(char => {
      const strObj = {};
      chars.forEach(c => {
        if (strObj[c]) {
          strObj[c] += 1;
        } else {
          strObj[c] = 1;
        }
      });

      moveDown(strObj);
    });

    return subWords;
  }

  build(arr) {
    arr.forEach(item => this.add(item));
  }
}

module.exports = Trie;

// const myTrie = new Trie();
// myTrie.add('ball');
// myTrie.add('bat');
// myTrie.add('doll');
// myTrie.add('dork');
// myTrie.add('do');
// myTrie.add('dorm');
// myTrie.add('door');
// myTrie.add('dart');
// myTrie.add('dot');
// myTrie.add('da');
// myTrie.add('dumb');
// myTrie.add('send');
// myTrie.add('sense');
// myTrie.add('landing');
// myTrie.add('land');

// console.log(myTrie.isWord('doll'));
// console.log(myTrie.isWord('dorkdsd'));
// console.log(myTrie.getSameLengthWords(5));
// console.log(myTrie.findSubWords('landing'));

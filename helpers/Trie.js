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
        }
        else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
        else {
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
    }

    isWord(word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) {
                return false;
            }
            else {
                node = node.keys.get(word[0]);
                word = word.substr(1);
            }
        }
        return (node.keys.has(word) && node.keys.get(word).isEnd())
    }

    findSubWords(word) {
        const foundWords = {
            3: [],
            4: [],
            5: [],
            6: []
        };
        let node = this.root;
        let subWord = '';

        for (let char of word) {
            subWord += char;
            if (subWord === word) break;
            if (!node.keys.has(char)) break;

            if (subWord.length > 2 && node.keys.get(char).isEnd()) {
                foundWords[subWord.length].push(subWord);
            }
            node = node.keys.get(char);

        }
        return foundWords;
    }

    print() {
        let words = new Array();
        let search = function(node, string) {
            if (node.keys.size != 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                }
                if (node.isEnd()) {
                    words.push(string);
                }
            }
            else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            }
        };
        search(this.root, '');
        return words.length > 0 ? words : null;
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
// myTrie.add('send');
// myTrie.add('sense');
// myTrie.add('landing');
// myTrie.add('land');

// console.log(myTrie.isWord('doll'));
// console.log(myTrie.isWord('dorkdsd'));
// console.log(myTrie.print());
//console.log(myTrie.findSubWords('landing'));

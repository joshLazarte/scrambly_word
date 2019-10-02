const swap = (chars, i, j) => {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
};

const getAnagrams = (input) => {
    const anagrams = [],
        chars = input.split(''),
        length = chars.length,
        counter = Array.from({ length }, () => 0);

    anagrams.push(input);
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
};

module.exports = getAnagrams;

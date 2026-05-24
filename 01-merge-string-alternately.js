/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
const mergeAlternately = function(word1, word2) {
    let result = "";
    const longWord = word1.length > word2.length ? word1 : word2;
    for (let i = 0; i < longWord.length; i++) {
        if (i < word1.length) {
            result += word1[i];
        }

        if (i < word2.length) {
            result += word2[i];
        }
    }

    return result;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
    assert.equal(mergeAlternately("abc", "pqr"), "apbqcr");
});

test("example 2", () => {
    assert.equal(mergeAlternately("ab", "pqrs"), "apbqrs");
});

test("example 3", () => {
    assert.equal(mergeAlternately("abcd", "pq"), "apbqcd");
});
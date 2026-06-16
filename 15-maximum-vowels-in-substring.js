/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const maxVowels = function (s, k) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  let currentCount = 0;
  for (let i = 0; i < k; i++) {
    if (vowels.has(s[i])) {
      currentCount++;
    }
  }
  let maxCount = currentCount;

  for (let i = k; i < s.length && maxCount < k; i++) {
    if (vowels.has(s[i])) {
      currentCount++;
    }
    if (vowels.has(s[i - k])) {
      currentCount--;
    }
    if (currentCount > maxCount) {
      maxCount = currentCount;
    }
  }

  return maxCount;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(maxVowels("abciiidef", 3), 3);
});

test("example 2", () => {
  assert.equal(maxVowels("aeiou", 2), 2);
});

test("example 3", () => {
  assert.equal(maxVowels("leetcode", 3), 2);
});

test("string with no vowels", () => {
  assert.equal(maxVowels("bcdfg", 2), 0);
});

test("k equal to string length", () => {
  assert.equal(maxVowels("tryhard", 7), 1);
});

test("single character window", () => {
  assert.equal(maxVowels("hello", 1), 1);
});

test("single character window with no vowels", () => {
  assert.equal(maxVowels("bcd", 1), 0);
});

test("all vowels", () => {
  assert.equal(maxVowels("aeiouaeiou", 4), 4);
});

test("best window is at the start", () => {
  assert.equal(maxVowels("aebcdfg", 2), 2);
});

test("best window is at the end", () => {
  assert.equal(maxVowels("bcdfgae", 2), 2);
});

test("best window is in the middle", () => {
  assert.equal(maxVowels("bcaebfg", 3), 2);
});

test("single character string that is a vowel", () => {
  assert.equal(maxVowels("o", 1), 1);
});

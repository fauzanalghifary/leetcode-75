/**
 * @param {string} s
 * @return {string}
 */
const reverseVowels = function (s) {
  const vowels = new Set(["a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]);
  const chars = s.split("");

  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    if (!vowels.has(chars[left])) {
      left++;
    } else if (!vowels.has(chars[right])) {
      right--;
    } else {
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }
  }

  return chars.join("");
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(reverseVowels("IceCreAm"), "AceCreIm");
});

test("example 2", () => {
  assert.equal(reverseVowels("leetcode"), "leotcede");
});

test("single vowel", () => {
  assert.equal(reverseVowels("a"), "a");
});

test("single consonant", () => {
  assert.equal(reverseVowels("b"), "b");
});

test("no vowels", () => {
  assert.equal(reverseVowels("bcdfg"), "bcdfg");
});

test("all vowels", () => {
  assert.equal(reverseVowels("aeiou"), "uoiea");
});

test("uppercase vowels", () => {
  assert.equal(reverseVowels("AEIOU"), "UOIEA");
});

test("empty string", () => {
  assert.equal(reverseVowels(""), "");
});

test("vowels at ends", () => {
  assert.equal(reverseVowels("aA"), "Aa");
});

test("preserves consonant positions", () => {
  assert.equal(reverseVowels("hello"), "holle");
});

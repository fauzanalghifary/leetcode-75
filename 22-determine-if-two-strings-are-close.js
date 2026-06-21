/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
const closeStrings = function (word1, word2) {
  const freq1 = {};
  const freq2 = {};
  for (const char of word1) freq1[char] = (freq1[char] || 0) + 1;
  for (const char of word2) freq2[char] = (freq2[char] || 0) + 1;

  const sameChars =
    Object.keys(freq1).sort().join("") === Object.keys(freq2).sort().join("");

  const sameCounts =
    Object.values(freq1)
      .sort((a, b) => a - b)
      .join(",") ===
    Object.values(freq2)
      .sort((a, b) => a - b)
      .join(",");

  return sameChars && sameCounts;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - reorder only", () => {
  assert.equal(closeStrings("abc", "bca"), true);
});

test("example 2 - different lengths", () => {
  assert.equal(closeStrings("a", "aa"), false);
});

test("example 3 - reorder plus character swap", () => {
  assert.equal(closeStrings("cabbba", "abbccc"), true);
});

test("identical strings", () => {
  assert.equal(closeStrings("abcdef", "abcdef"), true);
});

test("swap two characters' frequencies", () => {
  assert.equal(closeStrings("aaab", "bbba"), true);
});

test("same char set but mismatched frequency multiset", () => {
  assert.equal(closeStrings("aaabbb", "aabbbb"), false);
});

test("same frequency multiset but different char sets", () => {
  assert.equal(closeStrings("aabb", "ccdd"), false);
});

test("same length, one shares a character the other lacks", () => {
  assert.equal(closeStrings("abbzzca", "babzzcz"), false);
});

test("both empty", () => {
  assert.equal(closeStrings("", ""), true);
});

test("different lengths with overlapping chars", () => {
  assert.equal(closeStrings("abc", "abcd"), false);
});

test("same char set, same frequency multiset in different order", () => {
  assert.equal(closeStrings("abbzccca", "babzzczc"), true);
});

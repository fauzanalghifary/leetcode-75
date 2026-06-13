/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function (s, t) {
  if (s.length > t.length) {
    return false;
  }

  if (s !== t && s.length === t.length) {
    return false;
  }

  if (s.length === 0) {
    return true;
  }

  let sPointer = 0;
  let tPointer = 0;

  while (tPointer <= t.length) {
    if (t[tPointer] === s[sPointer]) {
      sPointer++;
    }

    tPointer++;

    if (sPointer === s.length) {
      return true;
    }
  }

  return false;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(isSubsequence("abc", "ahbgdc"), true);
});

test("example 2", () => {
  assert.equal(isSubsequence("axc", "ahbgdc"), false);
});

test("empty s is always a subsequence", () => {
  assert.equal(isSubsequence("", "ahbgdc"), true);
});

test("empty s and empty t", () => {
  assert.equal(isSubsequence("", ""), true);
});

test("non-empty s with empty t", () => {
  assert.equal(isSubsequence("a", ""), false);
});

test("s equal to t", () => {
  assert.equal(isSubsequence("abc", "abc"), true);
});

test("s longer than t", () => {
  assert.equal(isSubsequence("abcd", "abc"), false);
});

test("single matching char", () => {
  assert.equal(isSubsequence("a", "ahbgdc"), true);
});

test("single non-matching char", () => {
  assert.equal(isSubsequence("z", "ahbgdc"), false);
});

test("repeated chars present in order", () => {
  assert.equal(isSubsequence("aab", "aXaXb"), true);
});

test("repeated chars not enough occurrences", () => {
  assert.equal(isSubsequence("aaa", "aa"), false);
});

test("characters present but out of order", () => {
  assert.equal(isSubsequence("ba", "abc"), false);
});

test("subsequence at the end of t", () => {
  assert.equal(isSubsequence("dc", "ahbgdc"), true);
});

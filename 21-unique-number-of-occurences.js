/**
 * @param {number[]} arr
 * @return {boolean}
 */
const uniqueOccurrences = function (arr) {
  const counts = {};
  let numberSet = new Set();

  for (const num of arr) {
    counts[num] = (counts[num] || 0) + 1;
  }

  const hashValues = Object.values(counts);
  return new Set(hashValues).size === hashValues.length;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - all occurrence counts unique", () => {
  assert.equal(uniqueOccurrences([1, 2, 2, 1, 1, 3]), true);
});

test("example 2 - two values each occur once", () => {
  assert.equal(uniqueOccurrences([1, 2]), false);
});

test("example 3 - with negative numbers", () => {
  assert.equal(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]), true);
});

test("single element", () => {
  assert.equal(uniqueOccurrences([5]), true);
});

test("all same value - one count, trivially unique", () => {
  assert.equal(uniqueOccurrences([7, 7, 7]), true);
});

test("two distinct values with the same count", () => {
  assert.equal(uniqueOccurrences([1, 1, 2, 2]), false);
});

test("three values all occurring once", () => {
  assert.equal(uniqueOccurrences([1, 2, 3]), false);
});

test("distinct counts 1, 2, and 3", () => {
  assert.equal(uniqueOccurrences([1, 2, 2, 3, 3, 3]), true);
});

test("negatives sharing a count", () => {
  assert.equal(uniqueOccurrences([-1, -1, -2, -2]), false);
});

test("zero handled like any other value", () => {
  assert.equal(uniqueOccurrences([0, 0, 1]), true);
});

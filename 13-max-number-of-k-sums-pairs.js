/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxOperations = function (nums, k) {
  let count = 0;
  const counts = {};

  for (const num of nums) {
    const need = k - num;
    if (counts[need] > 0) {
      count++;
      counts[need]--;
    } else {
      counts[num] = (counts[num] || 0) + 1;
    }
  }

  return count;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(maxOperations([1, 2, 3, 4], 5), 2);
});

test("example 2", () => {
  assert.equal(maxOperations([3, 1, 3, 4, 3], 6), 1);
});

test("no valid pairs", () => {
  assert.equal(maxOperations([1, 2, 3], 100), 0);
});

test("single element cannot form a pair", () => {
  assert.equal(maxOperations([5], 10), 0);
});

test("empty array", () => {
  assert.equal(maxOperations([], 5), 0);
});

test("all elements pair up", () => {
  assert.equal(maxOperations([1, 1, 1, 1], 2), 2);
});

test("duplicates that do not sum to k", () => {
  assert.equal(maxOperations([2, 2, 2, 2], 5), 0);
});

test("number equal to k cannot pair with zero when absent", () => {
  assert.equal(maxOperations([5, 5, 5], 5), 0);
});

test("pairs using a value with itself", () => {
  assert.equal(maxOperations([3, 3, 3, 3], 6), 2);
});

test("odd count of a self-pairing value", () => {
  assert.equal(maxOperations([3, 3, 3], 6), 1);
});

test("zeros pairing together", () => {
  assert.equal(maxOperations([0, 0, 0, 0, 1], 0), 2);
});

test("mixed values with leftovers", () => {
  assert.equal(maxOperations([2, 5, 4, 4, 1, 3, 4, 4, 1, 4, 4, 1, 4], 5), 4);
});

test("larger mixed values", () => {
  assert.equal(
    maxOperations(
      [2, 5, 4, 4, 1, 3, 4, 4, 1, 4, 4, 1, 2, 1, 2, 2, 3, 2, 4, 2],
      5,
    ),
    6,
  );
});

test("repeated values requiring counts", () => {
  assert.equal(
    maxOperations(
      [2, 5, 4, 4, 1, 3, 4, 4, 1, 4, 4, 1, 2, 1, 2, 2, 3, 2, 4, 2],
      3,
    ),
    4,
  );
});

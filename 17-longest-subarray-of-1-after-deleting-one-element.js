/**
 * @param {number[]} nums
 * @return {number}
 */
const longestSubarray = function (nums) {
  let maxLength = 0;
  let left = 0;
  let zeros = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > 1) {
      if (nums[left] == 0) {
        zeros--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left);
  }

  return maxLength;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(longestSubarray([1, 1, 0, 1]), 3);
});

test("example 2", () => {
  assert.equal(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]), 5);
});

test("example 3 - all ones forces a deletion", () => {
  assert.equal(longestSubarray([1, 1, 1]), 2);
});

test("all zeros", () => {
  assert.equal(longestSubarray([0, 0, 0]), 0);
});

test("single one must be deleted", () => {
  assert.equal(longestSubarray([1]), 0);
});

test("single zero", () => {
  assert.equal(longestSubarray([0]), 0);
});

test("two ones", () => {
  assert.equal(longestSubarray([1, 1]), 1);
});

test("one zero between two runs of ones", () => {
  assert.equal(longestSubarray([1, 1, 1, 0, 1, 1]), 5);
});

test("two adjacent zeros split the array", () => {
  assert.equal(longestSubarray([1, 1, 0, 0, 1, 1, 1]), 3);
});

test("best window is at the start", () => {
  assert.equal(longestSubarray([1, 1, 1, 1, 0, 1]), 5);
});

test("best window is at the end", () => {
  assert.equal(longestSubarray([1, 0, 1, 1, 1, 1]), 5);
});

test("leading and trailing zeros", () => {
  assert.equal(longestSubarray([0, 1, 1, 0]), 2);
});

test("alternating values", () => {
  assert.equal(longestSubarray([1, 0, 1, 0, 1]), 2);
});

test("two ones around a single zero", () => {
  assert.equal(longestSubarray([1, 0, 1]), 2);
});

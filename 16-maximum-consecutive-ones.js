/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const longestOnes = function (nums, k) {
  let maxLength = 0;
  let zeros = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2), 6);
});

test("example 2", () => {
  assert.equal(
    longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3),
    10,
  );
});

test("k is 0 with mixed values", () => {
  assert.equal(longestOnes([1, 1, 0, 1, 1, 1, 0, 1], 0), 3);
});

test("k is 0 with all ones", () => {
  assert.equal(longestOnes([1, 1, 1, 1], 0), 4);
});

test("k is 0 with all zeros", () => {
  assert.equal(longestOnes([0, 0, 0], 0), 0);
});

test("all zeros, k can flip every element", () => {
  assert.equal(longestOnes([0, 0, 0], 3), 3);
});

test("all zeros, k larger than length", () => {
  assert.equal(longestOnes([0, 0, 0], 5), 3);
});

test("all ones", () => {
  assert.equal(longestOnes([1, 1, 1, 1, 1], 2), 5);
});

test("k larger than number of zeros flips everything", () => {
  assert.equal(longestOnes([1, 0, 1, 0, 1], 10), 5);
});

test("single zero element with k 1", () => {
  assert.equal(longestOnes([0], 1), 1);
});

test("single zero element with k 0", () => {
  assert.equal(longestOnes([0], 0), 0);
});

test("single one element", () => {
  assert.equal(longestOnes([1], 0), 1);
});

test("best window is at the start", () => {
  assert.equal(longestOnes([1, 1, 0, 1, 0, 0, 0], 1), 4);
});

test("best window is at the end", () => {
  assert.equal(longestOnes([0, 0, 0, 1, 0, 1, 1], 1), 4);
});

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findMaxAverage = function (nums, k) {
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  let currentMax = currentSum;

  for (let i = 0; i < nums.length - k; i++) {
    currentSum = currentSum - nums[i] + nums[i + k];
    if (currentSum > currentMax) {
      currentMax = currentSum;
    }
  }

  return currentMax / k;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

const EPSILON = 1e-5;

const assertClose = (actual, expected) => {
  assert.ok(
    Math.abs(actual - expected) < EPSILON,
    `expected ${actual} to be within ${EPSILON} of ${expected}`,
  );
};

test("example 1", () => {
  assertClose(findMaxAverage([1, 12, -5, -6, 50, 3], 4), 12.75);
});

test("example 2", () => {
  assertClose(findMaxAverage([5], 1), 5);
});

test("k equal to array length uses the whole array", () => {
  assertClose(findMaxAverage([1, 2, 3, 4], 4), 2.5);
});

test("max average is the first window", () => {
  assertClose(findMaxAverage([10, 1, 1, 1], 2), 5.5);
});

test("max average is the last window", () => {
  assertClose(findMaxAverage([1, 1, 1, 10], 2), 5.5);
});

test("all negative numbers", () => {
  assertClose(findMaxAverage([-1, -2, -3, -4], 2), -1.5);
});

test("single element window picks the maximum element", () => {
  assertClose(findMaxAverage([4, 0, 9, -3, 7], 1), 9);
});

test("all identical elements", () => {
  assertClose(findMaxAverage([3, 3, 3, 3], 2), 3);
});

test("includes zeros", () => {
  assertClose(findMaxAverage([0, 0, 0, 0, 5], 2), 2.5);
});

test("mixed positive and negative with k greater than one", () => {
  assertClose(findMaxAverage([-1, 2, -3, 4, -5, 6], 3), 1.6666666666666667);
});

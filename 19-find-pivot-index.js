/**
 * @param {number[]} nums
 * @return {number}
 */
const pivotIndex = function (nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  let rightSum = totalSum - nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === rightSum) {
      return i;
    }

    leftSum += nums[i];
    rightSum -= nums[i + 1];
  }

  return -1;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - pivot in the middle", () => {
  assert.equal(pivotIndex([1, 7, 3, 6, 5, 6]), 3);
});

test("example 2 - no pivot", () => {
  assert.equal(pivotIndex([1, 2, 3]), -1);
});

test("example 3 - pivot at index 0", () => {
  assert.equal(pivotIndex([2, 1, -1]), 0);
});

test("single element is always a pivot", () => {
  assert.equal(pivotIndex([7]), 0);
});

test("pivot at the last index", () => {
  assert.equal(pivotIndex([-1, 1, 2]), 2);
});

test("returns the leftmost pivot", () => {
  assert.equal(pivotIndex([0, 0, 0, 0]), 0);
});

test("all zeros with two elements - leftmost", () => {
  assert.equal(pivotIndex([0, 0]), 0);
});

test("negative numbers with a valid pivot", () => {
  assert.equal(pivotIndex([-1, -1, -1, 0, 1, 1]), 0);
});

test("no pivot exists", () => {
  assert.equal(pivotIndex([1, 2, 3, 4]), -1);
});

test("pivot where both sides sum to zero", () => {
  assert.equal(pivotIndex([1, -1, 9, 2, -2]), 2);
});

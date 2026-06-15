/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
  let max = 0;

  let lPointer = 0;
  let rPointer = height.length - 1;

  while (lPointer < rPointer) {
    const area =
      (rPointer - lPointer) * Math.min(height[lPointer], height[rPointer]);
    if (area > max) {
      max = area;
    }

    if (height[lPointer] < height[rPointer]) {
      lPointer++;
    } else {
      rPointer--;
    }
  }

  return max;
};

const assert = require("node:assert/strict");
const { log } = require("node:console");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
});

test("example 2", () => {
  assert.equal(maxArea([1, 1]), 1);
});

test("two lines of differing height", () => {
  assert.equal(maxArea([4, 3]), 3);
});

test("increasing heights", () => {
  assert.equal(maxArea([1, 2, 3, 4, 5]), 6);
});

test("decreasing heights", () => {
  assert.equal(maxArea([5, 4, 3, 2, 1]), 6);
});

test("all equal heights", () => {
  assert.equal(maxArea([5, 5, 5, 5]), 15);
});

test("tallest lines are adjacent", () => {
  assert.equal(maxArea([2, 3, 10, 5, 7, 8, 9]), 36);
});

test("contains zero-height lines", () => {
  assert.equal(maxArea([0, 2, 0]), 0);
});

test("widest pair wins over tall narrow pair", () => {
  assert.equal(maxArea([1, 3, 2, 5, 25, 24, 5]), 24);
});

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
  let read = 0;
  let write = 0;

  while (read < nums.length) {
    if (nums[read] !== 0) {
      nums[write++] = nums[read];
    }

    read++;
  }

  while (write < nums.length) {
    nums[write++] = 0;
  }

  return nums;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  const nums = [0, 1, 0, 3, 12];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 3, 12, 0, 0]);
});

test("example 2", () => {
  const nums = [0];
  moveZeroes(nums);
  assert.deepEqual(nums, [0]);
});

test("no zeros keeps order", () => {
  const nums = [1, 2, 3];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 2, 3]);
});

test("all zeros", () => {
  const nums = [0, 0, 0];
  moveZeroes(nums);
  assert.deepEqual(nums, [0, 0, 0]);
});

test("empty array", () => {
  const nums = [];
  moveZeroes(nums);
  assert.deepEqual(nums, []);
});

test("leading zeros", () => {
  const nums = [0, 0, 1, 2];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 2, 0, 0]);
});

test("trailing zeros stay put", () => {
  const nums = [1, 2, 0, 0];
  moveZeroes(nums);
  assert.deepEqual(nums, [1, 2, 0, 0]);
});

test("negatives preserved", () => {
  const nums = [0, -1, 0, -3, 5];
  moveZeroes(nums);
  assert.deepEqual(nums, [-1, -3, 5, 0, 0]);
});

test("modifies in-place (same reference)", () => {
  const nums = [0, 1];
  const ref = nums;
  moveZeroes(nums);
  assert.equal(ref === nums, true);
  assert.deepEqual(nums, [1, 0]);
});

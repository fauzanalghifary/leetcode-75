/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
const findDifference = function (nums1, nums2) {
  let nums1Set = new Set(nums1);
  let nums2Set = new Set(nums2);

  nums1Set.forEach((num) => {
    if (nums2Set.has(num)) {
      nums1Set.delete(num);
      nums2Set.delete(num);
    }
  });

  return [[...nums1Set], [...nums2Set]];
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

// The problem does not require any particular order within each list,
// so normalize by sorting each side before comparing.
const sorted = (result) =>
  result.map((part) => [...part].sort((a, b) => a - b));

test("example 1", () => {
  assert.deepEqual(sorted(findDifference([1, 2, 3], [2, 4, 6])), [
    [1, 3],
    [4, 6],
  ]);
});

test("example 2 - with duplicates", () => {
  assert.deepEqual(sorted(findDifference([1, 2, 3, 3], [1, 1, 2, 2])), [
    [3],
    [],
  ]);
});

test("identical arrays - no differences", () => {
  assert.deepEqual(sorted(findDifference([1, 2, 3], [1, 2, 3])), [[], []]);
});

test("completely disjoint", () => {
  assert.deepEqual(sorted(findDifference([1, 2], [3, 4])), [
    [1, 2],
    [3, 4],
  ]);
});

test("duplicates collapse to distinct values", () => {
  assert.deepEqual(sorted(findDifference([1, 1, 1], [1, 1, 1])), [[], []]);
});

test("nums1 empty", () => {
  assert.deepEqual(sorted(findDifference([], [1, 2])), [[], [1, 2]]);
});

test("nums2 empty", () => {
  assert.deepEqual(sorted(findDifference([1, 2], [])), [[1, 2], []]);
});

test("both empty", () => {
  assert.deepEqual(sorted(findDifference([], [])), [[], []]);
});

test("negative numbers", () => {
  assert.deepEqual(sorted(findDifference([-1, -2, 3], [-2, 4])), [
    [-1, 3],
    [4],
  ]);
});

test("one shared value, rest distinct", () => {
  assert.deepEqual(sorted(findDifference([5, 6, 7], [7, 8, 9])), [
    [5, 6],
    [8, 9],
  ]);
});

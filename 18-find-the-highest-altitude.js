/**
 * @param {number[]} gain
 * @return {number}
 */
const largestAltitude = function (gain) {
  let maxAltitude = 0;
  let currentAltitude = 0;

  for (let i = 0; i < gain.length; i++) {
    currentAltitude += gain[i];

    maxAltitude = Math.max(currentAltitude, maxAltitude);
  }

  return maxAltitude;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(largestAltitude([-5, 1, 5, 0, -7]), 1);
});

test("example 2 - peak is the starting point", () => {
  assert.equal(largestAltitude([-4, -3, -2, -1, 4, 3, 2]), 0);
});

test("all negative gains - highest is start at 0", () => {
  assert.equal(largestAltitude([-1, -2, -3]), 0);
});

test("all positive gains - highest is the end", () => {
  assert.equal(largestAltitude([1, 2, 3]), 6);
});

test("single gain going up", () => {
  assert.equal(largestAltitude([5]), 5);
});

test("single gain going down", () => {
  assert.equal(largestAltitude([-5]), 0);
});

test("all zeros stays at 0", () => {
  assert.equal(largestAltitude([0, 0, 0]), 0);
});

test("peak in the middle", () => {
  assert.equal(largestAltitude([3, -1, -2, 5, -4]), 5);
});

test("returns to zero at the end, peak reached mid-trip", () => {
  assert.equal(largestAltitude([2, -2, 3, -3]), 3);
});

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
const canPlaceFlowers = function (flowerbed, n) {
  if (n === 0) return true;

  const bed = [...flowerbed];
  for (let i = 0; i < bed.length; i++) {
    const emptyLeft = i === 0 || bed[i - 1] === 0;
    const emptyRight = i === bed.length - 1 || bed[i + 1] === 0;

    if (bed[i] === 0 && emptyLeft && emptyRight) {
      bed[i] = 1;
      if (--n === 0) return true;
      i++; // next plot is adjacent to the one we just planted
    }
  }

  return false;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1", () => {
  assert.equal(canPlaceFlowers([1, 0, 0, 0, 1], 1), true);
});

test("example 2", () => {
  assert.equal(canPlaceFlowers([1, 0, 0, 0, 1], 2), false);
});

test("empty bed single plot", () => {
  assert.equal(canPlaceFlowers([0], 1), true);
});

test("single plot no plant needed", () => {
  assert.equal(canPlaceFlowers([0], 0), true);
});

test("occupied single plot", () => {
  assert.equal(canPlaceFlowers([1], 1), false);
});

test("all empty", () => {
  assert.equal(canPlaceFlowers([0, 0, 0, 0, 0], 3), true);
});

test("all empty too many", () => {
  assert.equal(canPlaceFlowers([0, 0, 0, 0, 0], 4), false);
});

test("adjacent to existing", () => {
  assert.equal(canPlaceFlowers([1, 0, 1], 1), false);
});

test("zero needed", () => {
  assert.equal(canPlaceFlowers([1, 0, 1, 0, 1], 0), true);
});

test("leading and trailing zeros", () => {
  assert.equal(canPlaceFlowers([0, 0, 1, 0, 0], 2), true);
});

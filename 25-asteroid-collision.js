/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = function (asteroids) {
  const result = [];

  for (const current of asteroids) {
    let alive = true;

    while (
      alive &&
      current < 0 &&
      result.length > 0 &&
      result[result.length - 1] > 0
    ) {
      const prev = result[result.length - 1];
      if (prev === -current) {
        result.pop();
        alive = false;
      } else if (prev < -current) {
        result.pop();
      } else {
        alive = false;
      }
    }

    if (alive) result.push(current);
  }

  return result;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - larger right-mover survives", () => {
  assert.deepEqual(asteroidCollision([5, 10, -5]), [5, 10]);
});

test("example 2 - equal sizes both explode", () => {
  assert.deepEqual(asteroidCollision([8, -8]), []);
});

test("example 3 - left-mover wipes out smaller right-movers", () => {
  assert.deepEqual(asteroidCollision([10, 2, -5]), [10]);
});

test("example 4 - no collisions, all survive", () => {
  assert.deepEqual(asteroidCollision([-2, -1, 1, 2]), [-2, -1, 1, 2]);
});

test("single asteroid", () => {
  assert.deepEqual(asteroidCollision([7]), [7]);
});

test("right then left of equal size", () => {
  assert.deepEqual(asteroidCollision([5, -5]), []);
});

test("left then right move apart - no collision", () => {
  assert.deepEqual(asteroidCollision([-1, 1]), [-1, 1]);
});

test("smaller right-mover destroyed by larger left-mover", () => {
  assert.deepEqual(asteroidCollision([1, -2]), [-2]);
});

test("all moving right - no collisions", () => {
  assert.deepEqual(asteroidCollision([1, 2, 3]), [1, 2, 3]);
});

test("all moving left - no collisions", () => {
  assert.deepEqual(asteroidCollision([-1, -2, -3]), [-1, -2, -3]);
});

test("one left-mover survives a chain of right-movers", () => {
  assert.deepEqual(asteroidCollision([10, 2, -5]), [10]);
});

test("one left-mover cascades through multiple smaller right-movers", () => {
  assert.deepEqual(asteroidCollision([1, 2, -3]), [-3]);
});

test("left-mover cancels only the nearest equal right-mover", () => {
  assert.deepEqual(asteroidCollision([-2, 1, 1, -1]), [-2, 1]);
});

test("survivor lands behind a left-mover after destroying a right-mover", () => {
  assert.deepEqual(asteroidCollision([-2, -2, 1, -2]), [-2, -2, -2]);
});

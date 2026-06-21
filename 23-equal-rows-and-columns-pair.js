/**
 * @param {number[][]} grid
 * @return {number}
 */
const equalPairs = function (grid) {
  const map = {};
  for (const row of grid) {
    const key = row.join(",");
    map[key] = (map[key] || 0) + 1;
  }

  let count = 0;

  for (let j = 0; j < grid.length; j++) {
    const col = [];

    for (let i = 0; i < grid.length; i++) {
      col.push(grid[i][j]);
    }

    const key = col.join(",");
    count += map[key] || 0;
  }

  return count;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - one matching pair", () => {
  assert.equal(
    equalPairs([
      [3, 2, 1],
      [1, 7, 6],
      [2, 7, 7],
    ]),
    1,
  );
});

test("example 2 - three matching pairs", () => {
  assert.equal(
    equalPairs([
      [3, 1, 2, 2],
      [1, 4, 4, 5],
      [2, 4, 2, 2],
      [2, 4, 2, 2],
    ]),
    3,
  );
});

test("single cell grid", () => {
  assert.equal(equalPairs([[5]]), 1);
});

test("single cell grid - value irrelevant", () => {
  assert.equal(equalPairs([[0]]), 1);
});

test("no matching pairs", () => {
  assert.equal(
    equalPairs([
      [1, 2],
      [3, 4],
    ]),
    0,
  );
});

test("symmetric matrix - every row equals its column", () => {
  assert.equal(
    equalPairs([
      [1, 2],
      [2, 1],
    ]),
    2,
  );
});

test("all identical values - every pair matches", () => {
  assert.equal(
    equalPairs([
      [1, 1],
      [1, 1],
    ]),
    4,
  );
});

test("order within line matters - reversed does not match", () => {
  assert.equal(
    equalPairs([
      [1, 2],
      [1, 2],
    ]),
    0,
  );
});

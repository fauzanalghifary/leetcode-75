/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let currentMaxSum = -Infinity;
  let currentMaxSumLevel = 0;
  const queue = [root];
  let currentLevel = 1;

  while (queue.length) {
    const size = queue.length;

    let sum = 0;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (node.val) {
        sum += node.val;
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (sum > currentMaxSum) {
      currentMaxSum = sum;
      currentMaxSumLevel = currentLevel;
    }

    currentLevel++;
  }

  return currentMaxSumLevel;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// Build a tree from a LeetCode-style level-order array (null = missing node).
function arrayToTree(arr) {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();

    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }

    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }

  return root;
}

test("example 1 - level 2 has the maximal sum", () => {
  // L1=1, L2=7+0=7, L3=7+-8=-1 -> level 2
  assert.equal(maxLevelSum(arrayToTree([1, 7, 0, 7, -8, null, null])), 2);
});

test("example 2 - level 2 wins over a larger-count level 3", () => {
  // L1=989, L2=10250, L3=98693+-89388=9305, L4=-32127 -> level 2
  assert.equal(
    maxLevelSum(
      arrayToTree([989, null, 10250, 98693, -89388, null, null, null, -32127]),
    ),
    2,
  );
});

test("single node - only level 1 exists", () => {
  assert.equal(maxLevelSum(arrayToTree([1])), 1);
});

test("root level is the maximum", () => {
  // L1=10, L2=1+2=3 -> level 1
  assert.equal(maxLevelSum(arrayToTree([10, 1, 2])), 1);
});

test("returns the smallest level when sums tie", () => {
  // L1=5, L2=2+3=5 (tie) -> smaller level 1
  assert.equal(maxLevelSum(arrayToTree([5, 2, 3])), 1);
});

test("deepest level has the maximum sum", () => {
  //        1
  //       / \
  //      2   3
  //     / \
  //    9   9
  // L1=1, L2=5, L3=18 -> level 3
  assert.equal(maxLevelSum(arrayToTree([1, 2, 3, 9, 9])), 3);
});

test("all negative values - least negative level wins", () => {
  // L1=-1, L2=-2+-3=-5, L3=-1 ... actually compute below
  // L1=-1, L2=(-2)+(-3)=-5 -> level 1 is the max (-1 > -5)
  assert.equal(maxLevelSum(arrayToTree([-1, -2, -3])), 1);
});

test("left-skewed tree - each level has one node", () => {
  // 5 -> 6 -> 1; L1=5, L2=6, L3=1 -> level 2
  assert.equal(maxLevelSum(arrayToTree([5, 6, null, 1])), 2);
});

test("right-skewed tree - largest single node deepest", () => {
  // 1 -> 2 -> 100; L1=1, L2=2, L3=100 -> level 3
  assert.equal(maxLevelSum(arrayToTree([1, null, 2, null, 100])), 3);
});

test("handles zeros across levels", () => {
  // L1=0, L2=0+0=0 (tie) -> smaller level 1
  assert.equal(maxLevelSum(arrayToTree([0, 0, 0])), 1);
});

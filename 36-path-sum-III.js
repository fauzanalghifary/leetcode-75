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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const prefixCounts = new Map();
  prefixCounts.set(0, 1);
  let count = 0;

  function dfs(node, prefix) {
    if (node === null) return;

    prefix += node.val;
    count += prefixCounts.get(prefix - targetSum) || 0;

    prefixCounts.set(prefix, (prefixCounts.get(prefix) || 0) + 1);

    dfs(node.left, prefix);
    dfs(node.right, prefix);

    prefixCounts.set(prefix, prefixCounts.get(prefix) - 1);
  }

  dfs(root, 0);
  return count;
};
// var pathSum = function (root, targetSum) {
//   let count = 0;

//   function traverse(node, ancestors) {
//     if (node === null) return;

//     let sum = node.val;
//     if (sum === targetSum) count++;
//     for (let i = ancestors.length - 1; i >= 0; i--) {
//       sum += ancestors[i];
//       if (sum === targetSum) {
//         count++;
//       }
//     }
//     ancestors.push(node.val);

//     traverse(node.left, ancestors);
//     traverse(node.right, ancestors);
//     ancestors.pop();
//   }

//   traverse(root, []);

//   return count;
// };

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

test("example 1 - three downward paths summing to 8", () => {
  assert.equal(
    pathSum(arrayToTree([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]), 8),
    3,
  );
});

test("example 2 - three paths summing to 22", () => {
  assert.equal(
    pathSum(
      arrayToTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]),
      22,
    ),
    3,
  );
});

test("empty tree has no paths", () => {
  assert.equal(pathSum(arrayToTree([]), 0), 0);
});

test("single node equal to target", () => {
  assert.equal(pathSum(arrayToTree([5]), 5), 1);
});

test("single node not equal to target", () => {
  assert.equal(pathSum(arrayToTree([5]), 8), 0);
});

test("target of zero counts paths summing to zero", () => {
  // 0 (root), 0 (left), 0 (right), and 0->0 left, 0->0 right => 5 paths
  assert.equal(pathSum(arrayToTree([0, 0, 0]), 0), 5);
});

test("path does not need to start at root", () => {
  // 1 -> 2 -> 3 ; target 5 = 2+3 (mid-path), only one path
  assert.equal(pathSum(arrayToTree([1, 2, null, 3]), 5), 1);
});

test("negative values allow multiple overlapping paths", () => {
  // 1 -> -1 -> 1 ; target 1: root(1), [1,-1,1], and the bottom 1 => 3 paths
  assert.equal(pathSum(arrayToTree([1, -1, null, 1]), 1), 3);
});

test("no path matches the target", () => {
  assert.equal(pathSum(arrayToTree([1, 2, 3]), 100), 0);
});

test("same value repeated counts each starting node", () => {
  // every single node (3 of them) equals target 1 -> but also 1+1 sums... compute below
  assert.equal(pathSum(arrayToTree([1, 1, 1]), 1), 3);
});

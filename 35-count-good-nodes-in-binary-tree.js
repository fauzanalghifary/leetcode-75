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
var goodNodes = function (root) {
  let count = 0;

  function traverseNode(node, currentMaxValue) {
    if (node === null) return;

    if (node.val >= currentMaxValue) count++;
    const newMaxValue = Math.max(node.val, currentMaxValue);

    traverseNode(node.left, newMaxValue);
    traverseNode(node.right, newMaxValue);
  }

  traverseNode(root, root.val);

  return count;
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

test("example 1 - four good nodes", () => {
  assert.equal(goodNodes(arrayToTree([3, 1, 4, 3, null, 1, 5])), 4);
});

test("example 2 - three good nodes (one blocked by equal ancestor)", () => {
  assert.equal(goodNodes(arrayToTree([3, 3, null, 4, 2])), 3);
});

test("example 3 - single node is always good", () => {
  assert.equal(goodNodes(arrayToTree([1])), 1);
});

test("equal ancestor still counts as good", () => {
  // 2 -> 2 -> 2 : each equals the running max, all good
  assert.equal(goodNodes(arrayToTree([2, 2, 2])), 3);
});

test("strictly increasing path - every node is good", () => {
  // 1 -> 2 -> 3 -> 4 (left-skewed, each larger than all ancestors)
  assert.equal(goodNodes(arrayToTree([1, 2, null, 3, null, 4])), 4);
});

test("strictly decreasing path - only the root is good", () => {
  // 4 -> 3 -> 2 -> 1 (each smaller than the root)
  assert.equal(goodNodes(arrayToTree([4, 3, null, 2, null, 1])), 1);
});

test("all equal values - every node is good", () => {
  assert.equal(goodNodes(arrayToTree([5, 5, 5, 5, 5, 5, 5])), 7);
});

test("good nodes split across both subtrees", () => {
  //        3
  //       / \
  //      4   2
  //     /     \
  //    5       6
  // good: 3, 4, 5 (left), and 6 (right, 6 > 3 > 2 path max) -> 2 is not good
  assert.equal(goodNodes(arrayToTree([3, 4, 2, 5, null, null, 6])), 4);
});

test("negative values - root is the max so only root is good", () => {
  // -1 -> -2 -> -3 : decreasing, only root good
  assert.equal(goodNodes(arrayToTree([-1, -2, null, -3])), 1);
});

test("larger mixed tree", () => {
  //            3
  //          /   \
  //         3     4
  //        / \   / \
  //       2   3 4   5
  // good: 3(root), left-3(=3), its right-3(=3), right-4(>3), 4(=4), 5(>4) = 6
  // not good: left-2 (<3)
  assert.equal(goodNodes(arrayToTree([3, 3, 4, 2, 3, 4, 5])), 6);
});

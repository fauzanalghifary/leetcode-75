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
var maxDepth = function (root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

test("example 1 - balanced-ish tree of depth 3", () => {
  assert.equal(maxDepth(arrayToTree([3, 9, 20, null, null, 15, 7])), 3);
});

test("example 2 - right-leaning tree of depth 2", () => {
  assert.equal(maxDepth(arrayToTree([1, null, 2])), 2);
});

test("empty tree has depth 0", () => {
  assert.equal(maxDepth(arrayToTree([])), 0);
});

test("null root has depth 0", () => {
  assert.equal(maxDepth(null), 0);
});

test("single node has depth 1", () => {
  assert.equal(maxDepth(arrayToTree([1])), 1);
});

test("left-only skewed tree", () => {
  // 1 -> 2 -> 3 -> 4
  assert.equal(maxDepth(arrayToTree([1, 2, null, 3, null, 4])), 4);
});

test("right-only skewed tree", () => {
  // 1 -> 2 -> 3 -> 4
  assert.equal(maxDepth(arrayToTree([1, null, 2, null, 3, null, 4])), 4);
});

test("longest path is on the left subtree", () => {
  //        1
  //       / \
  //      2   3
  //     /
  //    4
  //   /
  //  5
  assert.equal(maxDepth(arrayToTree([1, 2, 3, 4, null, null, null, 5])), 4);
});

test("perfect tree of depth 3", () => {
  assert.equal(maxDepth(arrayToTree([1, 2, 3, 4, 5, 6, 7])), 3);
});

test("handles negative node values", () => {
  assert.equal(maxDepth(arrayToTree([-100, -50, -100, null, -1])), 3);
});

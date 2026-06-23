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
 * @return {number[]}
 */
var rightSideView = function (root) {
  const queue = [root];
  const result = [];

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (!node) break;

      if (i === size - 1) {
        result.push(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
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

test("example 1 - rightmost node per level", () => {
  assert.deepEqual(
    rightSideView(arrayToTree([1, 2, 3, null, 5, null, 4])),
    [1, 3, 4],
  );
});

test("example 2 - deepest visible node comes from a left subtree", () => {
  assert.deepEqual(
    rightSideView(arrayToTree([1, 2, 3, 4, null, null, null, 5])),
    [1, 3, 4, 5],
  );
});

test("example 3 - right-leaning tree", () => {
  assert.deepEqual(rightSideView(arrayToTree([1, null, 3])), [1, 3]);
});

test("example 4 - empty tree returns empty array", () => {
  assert.deepEqual(rightSideView(arrayToTree([])), []);
});

test("null root returns empty array", () => {
  assert.deepEqual(rightSideView(null), []);
});

test("single node", () => {
  assert.deepEqual(rightSideView(arrayToTree([1])), [1]);
});

test("left-only skewed tree - every node is visible", () => {
  // 1 -> 2 -> 3 -> 4 (all on the left)
  assert.deepEqual(
    rightSideView(arrayToTree([1, 2, null, 3, null, 4])),
    [1, 2, 3, 4],
  );
});

test("right-only skewed tree", () => {
  // 1 -> 2 -> 3 -> 4 (all on the right)
  assert.deepEqual(
    rightSideView(arrayToTree([1, null, 2, null, 3, null, 4])),
    [1, 2, 3, 4],
  );
});

test("perfect tree of depth 3 - rightmost of each level", () => {
  assert.deepEqual(
    rightSideView(arrayToTree([1, 2, 3, 4, 5, 6, 7])),
    [1, 3, 7],
  );
});

test("right child missing but left child exists at the bottom", () => {
  //        1
  //       / \
  //      2   3
  //     /
  //    4
  assert.deepEqual(rightSideView(arrayToTree([1, 2, 3, 4])), [1, 3, 4]);
});

test("handles negative node values", () => {
  assert.deepEqual(
    rightSideView(arrayToTree([-10, -20, -30, -40])),
    [-10, -30, -40],
  );
});

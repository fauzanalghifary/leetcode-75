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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (root === null) return null;

  if (root.val === val) return root;
  else if (val < root.val) return searchBST(root.left, val);
  else return searchBST(root.right, val);
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

// Serialize a tree back to a LeetCode-style level-order array (trailing nulls trimmed).
function treeToArray(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === null) {
      result.push(null);
    } else {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

test("example 1 - found node returns its subtree", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.deepEqual(treeToArray(searchBST(root, 2)), [2, 1, 3]);
});

test("example 2 - missing value returns null", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.equal(searchBST(root, 5), null);
});

test("value at the root returns the whole tree", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.deepEqual(treeToArray(searchBST(root, 4)), [4, 2, 7, 1, 3]);
});

test("value in the right subtree returns a leaf subtree", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.deepEqual(treeToArray(searchBST(root, 7)), [7]);
});

test("value at a left leaf", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.deepEqual(treeToArray(searchBST(root, 1)), [1]);
});

test("value smaller than every node returns null", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.equal(searchBST(root, 0), null);
});

test("value larger than every node returns null", () => {
  const root = arrayToTree([4, 2, 7, 1, 3]);
  assert.equal(searchBST(root, 100), null);
});

test("empty tree returns null", () => {
  assert.equal(searchBST(arrayToTree([]), 1), null);
});

test("null root returns null", () => {
  assert.equal(searchBST(null, 1), null);
});

test("single node - found", () => {
  assert.deepEqual(treeToArray(searchBST(arrayToTree([8]), 8)), [8]);
});

test("single node - not found", () => {
  assert.equal(searchBST(arrayToTree([8]), 3), null);
});

test("returned subtree keeps both children", () => {
  //        5
  //       / \
  //      3   8
  //     / \ / \
  //    2  4 7  9
  const root = arrayToTree([5, 3, 8, 2, 4, 7, 9]);
  assert.deepEqual(treeToArray(searchBST(root, 8)), [8, 7, 9]);
});

test("handles negative values", () => {
  const root = arrayToTree([0, -3, 2, -5, -1]);
  assert.deepEqual(treeToArray(searchBST(root, -3)), [-3, -5, -1]);
});

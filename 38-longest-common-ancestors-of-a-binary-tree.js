/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root; // p and q split here → this is the LCA
  return left || right; // both on one side (or neither) → bubble up
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

// Find and return the actual node object holding a given value (values are unique).
function findNode(root, val) {
  if (root === null) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

// Resolve p and q by value, run LCA, and return the resulting node's value.
function lcaValue(arr, pVal, qVal) {
  const root = arrayToTree(arr);
  const result = lowestCommonAncestor(
    root,
    findNode(root, pVal),
    findNode(root, qVal),
  );
  return result === null ? null : result.val;
}

test("example 1 - LCA in different subtrees is the root", () => {
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1), 3);
});

test("example 2 - a node is an ancestor of itself", () => {
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4), 5);
});

test("example 3 - two-node tree", () => {
  assert.equal(lcaValue([1, 2], 1, 2), 1);
});

test("both nodes deep in the left subtree", () => {
  // LCA of 7 and 4 (both under 2) is 2
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 4), 2);
});

test("LCA is a deep internal node", () => {
  // LCA of 6 and 4 (both under 5) is 5
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 6, 4), 5);
});

test("nodes in left and right subtrees of an internal node", () => {
  // 6 (left of 5) and 7 (under 2, right of 5) -> LCA is 5
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 6, 7), 5);
});

test("p equals q (same node)", () => {
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 4, 4), 4);
});

test("root is one of the two nodes", () => {
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 3, 8), 3);
});

test("left-skewed tree - LCA is the higher node", () => {
  // 1 -> 2 -> 3 -> 4 (all left); LCA of 3 and 4 is 3
  assert.equal(lcaValue([1, 2, null, 3, null, 4], 3, 4), 3);
});

test("two leaves under the right subtree", () => {
  // 0 and 8 are both children-area of 1; LCA of 0 and 8 is 1
  assert.equal(lcaValue([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 0, 8), 1);
});

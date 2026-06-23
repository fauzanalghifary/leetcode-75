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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root === null) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  }

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  }

  if (!root.left) return root.right;
  if (!root.right) return root.left;

  let succ = root.right;
  while (succ.left) succ = succ.left;
  root.val = succ.val;
  root.right = deleteNode(root.right, succ.val);
  return root;
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

// Inorder traversal returns node values. For a valid BST this is sorted ascending.
function inorder(root) {
  const values = [];
  const visit = (node) => {
    if (node === null) return;
    visit(node.left);
    values.push(node.val);
    visit(node.right);
  };
  visit(root);
  return values;
}

// Deletion can have multiple valid answers, so assert the invariants instead of an
// exact shape: the result is still a BST holding exactly the expected values.
function assertBSTWithValues(root, expectedValuesSorted) {
  const values = inorder(root);

  for (let i = 1; i < values.length; i++) {
    assert.ok(
      values[i - 1] < values[i],
      `inorder not strictly increasing (BST property broken): ${values}`,
    );
  }

  assert.deepEqual(values, expectedValuesSorted);
}

test("example 1 - delete an internal node with two children", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 3), [2, 4, 5, 6, 7]);
});

test("example 2 - key not present leaves the tree unchanged", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 0), [2, 3, 4, 5, 6, 7]);
});

test("example 3 - empty tree returns null", () => {
  assert.equal(deleteNode(arrayToTree([]), 0), null);
});

test("delete a leaf node", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 2), [3, 4, 5, 6, 7]);
});

test("delete a node with only a right child", () => {
  // 6 has only right child 7
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 6), [2, 3, 4, 5, 7]);
});

test("delete a node with only a left child", () => {
  //      5
  //     / \
  //    3   6
  //   /
  //  2
  const root = arrayToTree([5, 3, 6, 2]);
  assertBSTWithValues(deleteNode(root, 3), [2, 5, 6]);
});

test("delete the root when it has two children", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 5), [2, 3, 4, 6, 7]);
});

test("delete the only node makes the tree empty", () => {
  assert.equal(deleteNode(arrayToTree([1]), 1), null);
});

test("delete the root when it has a single child", () => {
  const root = arrayToTree([1, null, 2]);
  assertBSTWithValues(deleteNode(root, 1), [2]);
});

test("key smaller than every node leaves the tree unchanged", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, -100), [2, 3, 4, 5, 6, 7]);
});

test("key larger than every node leaves the tree unchanged", () => {
  const root = arrayToTree([5, 3, 6, 2, 4, null, 7]);
  assertBSTWithValues(deleteNode(root, 100), [2, 3, 4, 5, 6, 7]);
});

test("delete in a left-skewed tree", () => {
  // 5 -> 4 -> 3 -> 2 (all left children)
  const root = arrayToTree([5, 4, null, 3, null, 2]);
  assertBSTWithValues(deleteNode(root, 4), [2, 3, 5]);
});

test("delete a node with two children deep in the tree", () => {
  //        8
  //       / \
  //      3   10
  //     / \    \
  //    1   6    14
  //       / \   /
  //      4   7 13
  const root = arrayToTree([8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13]);
  assertBSTWithValues(deleteNode(root, 3), [1, 4, 6, 7, 8, 10, 13, 14]);
});

test("handles negative values", () => {
  const root = arrayToTree([0, -3, 2, -5, -1]);
  assertBSTWithValues(deleteNode(root, 0), [-5, -3, -1, 2]);
});

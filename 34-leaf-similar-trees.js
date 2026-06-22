/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const root1Leaf = [];
  const root2Leaf = [];

  function traverseNode(node, collector) {
    if (node === null) return;

    if (!node.left && !node.right) {
      collector.push(node.val);
      return;
    }
    traverseNode(node.left, collector);
    traverseNode(node.right, collector);
  }

  traverseNode(root1, root1Leaf);
  traverseNode(root2, root2Leaf);

  return root1Leaf.join(",") === root2Leaf.join(",");
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

test("example 1 - same leaf sequence with different shapes", () => {
  const root1 = arrayToTree([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]);
  const root2 = arrayToTree([
    3,
    5,
    1,
    6,
    7,
    4,
    2,
    null,
    null,
    null,
    null,
    null,
    null,
    9,
    8,
  ]);
  assert.equal(leafSimilar(root1, root2), true);
});

test("example 2 - mirrored trees have reversed leaf sequence", () => {
  assert.equal(
    leafSimilar(arrayToTree([1, 2, 3]), arrayToTree([1, 3, 2])),
    false,
  );
});

test("two single-node trees with the same value", () => {
  assert.equal(leafSimilar(arrayToTree([1]), arrayToTree([1])), true);
});

test("two single-node trees with different values", () => {
  assert.equal(leafSimilar(arrayToTree([1]), arrayToTree([2])), false);
});

test("both trees empty", () => {
  assert.equal(leafSimilar(arrayToTree([]), arrayToTree([])), true);
});

test("one empty, one non-empty", () => {
  assert.equal(leafSimilar(arrayToTree([]), arrayToTree([1])), false);
});

test("same leaves but one tree has an extra leaf", () => {
  // leaves: [1, 2] vs [1, 2, 3]
  assert.equal(
    leafSimilar(
      arrayToTree([5, 1, 2]),
      arrayToTree([5, 1, 6, null, null, 2, 3]),
    ),
    false,
  );
});

test("identical trees are leaf-similar", () => {
  const arr = [3, 5, 1, 6, 2, 9, 8, null, null, 7, 4];
  assert.equal(leafSimilar(arrayToTree(arr), arrayToTree([...arr])), true);
});

test("same leaf values in different left-to-right order", () => {
  // leaves: [1, 2] vs [2, 1]
  assert.equal(
    leafSimilar(arrayToTree([3, 1, 2]), arrayToTree([3, 2, 1])),
    false,
  );
});

test("left-skewed vs right-skewed with single shared leaf", () => {
  // both have the single leaf value 9
  assert.equal(
    leafSimilar(
      arrayToTree([5, 7, null, 9]),
      arrayToTree([5, null, 7, null, 9]),
    ),
    true,
  );
});

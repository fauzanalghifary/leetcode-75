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
var longestZigZag = function (root) {
  let longest = 0;

  function dfs(node, previous, current, currentCount) {
    if (node === null) return;

    if (current === null) {
      // root entry
      currentCount = 0;
    } else if (previous === null) {
      // first edge
      currentCount = 1;
    } else if (previous !== current) {
      // direction changed
      currentCount++;
    } else {
      // same direction
      currentCount = 1;
    }

    longest = Math.max(longest, currentCount);

    dfs(node.left, current, "L", currentCount);
    dfs(node.right, current, "R", currentCount);
  }

  dfs(root, null, null, 0);

  return longest;
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

test("example 1 - zigzag of length 3", () => {
  assert.equal(
    longestZigZag(
      arrayToTree([
        1,
        null,
        1,
        1,
        1,
        null,
        null,
        1,
        1,
        null,
        1,
        null,
        null,
        null,
        1,
      ]),
    ),
    3,
  );
});

test("example 2 - zigzag of length 4", () => {
  assert.equal(
    longestZigZag(arrayToTree([1, 1, 1, null, 1, null, null, 1, 1, null, 1])),
    4,
  );
});

test("example 3 - single node has length 0", () => {
  assert.equal(longestZigZag(arrayToTree([1])), 0);
});

test("empty tree has length 0", () => {
  assert.equal(longestZigZag(arrayToTree([])), 0);
});

test("two nodes (one edge) has length 1", () => {
  assert.equal(longestZigZag(arrayToTree([1, 2])), 1);
});

test("straight left-skewed line never zigzags - length 1", () => {
  // 1 -> 2 -> 3 -> 4 all left children; best zigzag is a single edge
  assert.equal(longestZigZag(arrayToTree([1, 2, null, 3, null, 4])), 1);
});

test("straight right-skewed line never zigzags - length 1", () => {
  assert.equal(longestZigZag(arrayToTree([1, null, 2, null, 3, null, 4])), 1);
});

test("perfect zigzag right-left-right-left", () => {
  //   1
  //    \
  //     2
  //    /
  //   3
  //    \
  //     4
  // right -> left -> right = length 3
  assert.equal(longestZigZag(arrayToTree([1, null, 2, 3, null, null, 4])), 3);
});

test("longest zigzag is a subpath not starting at root", () => {
  //        1
  //       /
  //      2
  //       \
  //        3
  //       /
  //      4
  // from root going left then zigzag: left(2) -> right(3) -> left(4) = length 3
  assert.equal(longestZigZag(arrayToTree([1, 2, null, null, 3, 4])), 3);
});

test("perfect tree - best zigzag uses alternating turns of length 2", () => {
  //        1
  //      /   \
  //     2     3
  //    / \   / \
  //   4   5 6   7
  // any zigzag alternates after one turn: e.g. 1->2(left)->5(right) = length 2
  assert.equal(longestZigZag(arrayToTree([1, 2, 3, 4, 5, 6, 7])), 2);
});

test("break with a repeated direction resets the count (L,R,R,L)", () => {
  //   1
  //  /
  // 2          directions down the single path: L, R, R, L
  //  \
  //   3        the two R's in a row break the zigzag, so the best is
  //    \       either prefix L->R (2) or suffix R->L (2), NOT 3.
  //     4
  //    /
  //   5
  assert.equal(
    longestZigZag(arrayToTree([1, 2, null, null, 3, null, 4, 5])),
    2,
  );
});

test("longer break-then-resume keeps the longest alternating run (R,L,L,R,L)", () => {
  // single path directions: R, L, L, L breaks the run.
  // edges: R,L (run 2) | L,L break | L,R,L (run 3) -> answer is 3, not 4.
  assert.equal(
    longestZigZag(
      arrayToTree([1, null, 2, 3, null, 4, null, null, 5, 6, null]),
    ),
    3,
  );
});

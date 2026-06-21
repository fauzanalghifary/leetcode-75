/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  // 1. find the middle
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. reverse the second half (starting at slow)
  let prev = null;
  let current = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // 3. Sum twin
  let p1 = head;
  let p2 = prev;
  let max = 0;

  while (p2) {
    max = Math.max(max, p1.val + p2.val);
    p1 = p1.next;
    p2 = p2.next;
  }

  return max;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function arrayToList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head);
  }
  return head;
}

test("example 1 - all twin sums equal", () => {
  assert.equal(pairSum(arrayToList([5, 4, 2, 1])), 6);
});

test("example 2 - max of differing twin sums", () => {
  assert.equal(pairSum(arrayToList([4, 2, 2, 3])), 7);
});

test("example 3 - two-node list", () => {
  assert.equal(pairSum(arrayToList([1, 100000])), 100001);
});

test("max twin sum comes from the first pair", () => {
  assert.equal(pairSum(arrayToList([10, 1, 1, 1])), 11);
});

test("max twin sum comes from the last (middle) pair", () => {
  assert.equal(pairSum(arrayToList([1, 10, 10, 1])), 20);
});

test("max twin sum comes from a middle pair", () => {
  assert.equal(pairSum(arrayToList([1, 2, 100, 100, 2, 1])), 200);
});

test("all equal values", () => {
  assert.equal(pairSum(arrayToList([5, 5, 5, 5])), 10);
});

test("longer list - twins are first/last, second/second-last, etc.", () => {
  // pairs: (1+8), (2+7), (3+6), (4+5) -> all 9
  assert.equal(pairSum(arrayToList([1, 2, 3, 4, 5, 6, 7, 8])), 9);
});

test("max is the very last twin pair in a longer list", () => {
  // pairs: (1+1), (2+2), (3+3), (50+50) -> max 100
  assert.equal(pairSum(arrayToList([1, 2, 3, 50, 50, 3, 2, 1])), 100);
});

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  if (!head) return null;
  let odd = head;
  let initialEven = head.next;
  let even = initialEven;

  while (even && even.next) {
    odd.next = odd.next.next;
    odd = odd.next;

    even.next = even.next.next;
    even = even.next;
  }

  odd.next = initialEven;

  return head;
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

function listToArray(head) {
  const arr = [];
  for (let node = head; node !== null; node = node.next) {
    arr.push(node.val);
  }
  return arr;
}

test("example 1 - odd-length list", () => {
  const head = arrayToList([1, 2, 3, 4, 5]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1, 3, 5, 2, 4]);
});

test("example 2 - even count of nodes interleaved", () => {
  const head = arrayToList([2, 1, 3, 5, 6, 4, 7]);
  assert.deepEqual(listToArray(oddEvenList(head)), [2, 3, 6, 7, 1, 5, 4]);
});

test("empty list returns null", () => {
  assert.equal(oddEvenList(null), null);
});

test("single node is unchanged", () => {
  const head = arrayToList([1]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1]);
});

test("two nodes are unchanged (one odd, one even)", () => {
  const head = arrayToList([1, 2]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1, 2]);
});

test("three nodes - even node moves to the end", () => {
  const head = arrayToList([1, 2, 3]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1, 3, 2]);
});

test("four nodes - odd group then even group", () => {
  const head = arrayToList([1, 2, 3, 4]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1, 3, 2, 4]);
});

test("preserves relative order within each group", () => {
  const head = arrayToList([10, 20, 30, 40, 50, 60]);
  assert.deepEqual(listToArray(oddEvenList(head)), [10, 30, 50, 20, 40, 60]);
});

test("handles duplicate values by position, not value", () => {
  const head = arrayToList([1, 1, 2, 2, 3, 3]);
  assert.deepEqual(listToArray(oddEvenList(head)), [1, 2, 3, 1, 2, 3]);
});

test("last node's next is terminated (no cycle)", () => {
  const head = arrayToList([1, 2, 3, 4, 5]);
  const result = oddEvenList(head);
  let count = 0;
  for (let node = result; node !== null; node = node.next) {
    count++;
    assert.ok(count <= 5, "list should not contain a cycle");
  }
  assert.equal(count, 5);
});

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
var reverseList = function (head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
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

test("example 1 - reverses a five-node list", () => {
  const head = arrayToList([1, 2, 3, 4, 5]);
  assert.deepEqual(listToArray(reverseList(head)), [5, 4, 3, 2, 1]);
});

test("example 2 - reverses a two-node list", () => {
  const head = arrayToList([1, 2]);
  assert.deepEqual(listToArray(reverseList(head)), [2, 1]);
});

test("example 3 - empty list returns null", () => {
  assert.equal(reverseList(null), null);
});

test("single node is unchanged", () => {
  const head = arrayToList([1]);
  assert.deepEqual(listToArray(reverseList(head)), [1]);
});

test("preserves duplicate values", () => {
  const head = arrayToList([1, 1, 2, 2]);
  assert.deepEqual(listToArray(reverseList(head)), [2, 2, 1, 1]);
});

test("original head becomes the tail and terminates (no cycle)", () => {
  const head = arrayToList([1, 2, 3, 4, 5]);
  const result = reverseList(head);
  // walk the reversed list, guarding against an accidental cycle
  let count = 0;
  for (let node = result; node !== null; node = node.next) {
    count++;
    assert.ok(count <= 5, "list should not contain a cycle");
  }
  assert.equal(count, 5);
  // the node that was the head (value 1) must now be the tail
  assert.equal(head.next, null);
});

test("handles a longer list", () => {
  const head = arrayToList([10, 20, 30, 40, 50, 60, 70]);
  assert.deepEqual(
    listToArray(reverseList(head)),
    [70, 60, 50, 40, 30, 20, 10],
  );
});

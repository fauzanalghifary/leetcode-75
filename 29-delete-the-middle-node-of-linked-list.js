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
var deleteMiddle = function (head) {
  if (!head || !head.next) return null;

  let prev = null;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = slow.next;
  return head;
};
// var deleteMiddle = function (head) {
//   const result = [];
//   let current = head;

//   while (current && current.val) {
//     result.push(current.val);
//     current = current.next;
//   }

//   if (result.length === 1) return null;
//   if (result.length === 2) {
//     head.next = null;
//     return head;
//   }

//   const middleElement = Math.floor(result.length / 2);

//   let i = 0;
//   current = head;
//   while (current && current.val) {
//     i++;
//     if (i === middleElement) {
//       current.next = current.next.next;
//       current = current.next.next;
//     } else {
//       current = current.next;
//     }
//   }

//   return head;
// };

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

test("example 1 - removes the middle of an odd-length list", () => {
  const head = arrayToList([1, 3, 4, 7, 1, 2, 6]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [1, 3, 4, 1, 2, 6]);
});

test("example 2 - removes the middle of an even-length list", () => {
  const head = arrayToList([1, 2, 3, 4]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [1, 2, 4]);
});

test("example 3 - two nodes removes the second", () => {
  const head = arrayToList([2, 1]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [2]);
});

test("single node becomes empty list", () => {
  const head = arrayToList([1]);
  assert.equal(deleteMiddle(head), null);
});

test("three nodes removes index 1", () => {
  const head = arrayToList([1, 2, 3]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [1, 3]);
});

test("five nodes removes index 2", () => {
  const head = arrayToList([10, 20, 30, 40, 50]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [10, 20, 40, 50]);
});

test("handles duplicate values without removing the wrong node", () => {
  const head = arrayToList([5, 5, 5, 5]);
  assert.deepEqual(listToArray(deleteMiddle(head)), [5, 5, 5]);
});

test("first node is kept when removing the middle (head pointer unchanged for n>1)", () => {
  const head = arrayToList([7, 8, 9, 10, 11, 12]);
  // n = 6, middle index = 3 (value 10)
  assert.deepEqual(listToArray(deleteMiddle(head)), [7, 8, 9, 11, 12]);
});

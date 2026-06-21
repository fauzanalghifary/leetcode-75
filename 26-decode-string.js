/**
 * @param {string} s
 * @return {string}
 */
const decodeString = function (s) {
  let currentStr = "";
  let strStack = [];

  let currentNum = "";
  let numStack = [];

  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];
    if (!isNaN(+currentChar)) {
      currentNum += currentChar;
    } else if (currentChar === "[") {
      numStack.push(+currentNum);
      strStack.push(currentStr);

      currentNum = "";
      currentStr = "";
    } else if (currentChar === "]") {
      const num = numStack.pop();
      const str = strStack.pop();

      currentStr = str + currentStr.repeat(num);
    } else {
      currentStr += currentChar;
    }
  }

  return currentStr;
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - two separate groups", () => {
  assert.equal(decodeString("3[a]2[bc]"), "aaabcbc");
});

test("example 2 - nested groups", () => {
  assert.equal(decodeString("3[a2[c]]"), "accaccacc");
});

test("example 3 - groups followed by plain text", () => {
  assert.equal(decodeString("2[abc]3[cd]ef"), "abcabccdcdcdef");
});

test("no encoding - plain string", () => {
  assert.equal(decodeString("abc"), "abc");
});

test("single repeat", () => {
  assert.equal(decodeString("1[a]"), "a");
});

test("multi-digit repeat count", () => {
  assert.equal(decodeString("10[a]"), "aaaaaaaaaa");
});

test("deeply nested", () => {
  assert.equal(decodeString("2[2[2[a]]]"), "aaaaaaaa");
});

test("leading plain text before a group", () => {
  assert.equal(decodeString("ab2[cd]"), "abcdcd");
});

test("nested with text on both levels", () => {
  assert.equal(decodeString("2[a2[bc]d]"), "abcbcdabcbcd");
});

test("adjacent nested and flat groups", () => {
  assert.equal(decodeString("3[a]2[b3[c]]"), "aaabcccbccc");
});

test("multi-digit nested count", () => {
  assert.equal(decodeString("2[ab12[c]]"), "abccccccccccccabcccccccccccc");
});
3;

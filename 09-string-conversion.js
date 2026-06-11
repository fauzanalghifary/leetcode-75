/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  let write = 0; // where to write the next compressed char
  let read = 0; // start of the current group

  while (read < chars.length) {
    const char = chars[read];
    let count = 0;
    while (read < chars.length && chars[read] === char) {
      read++;
      count++;
    }

    chars[write++] = char;
    if (count > 1) {
      for (const digit of String(count)) {
        chars[write++] = digit;
      }
    }
  }

  return write;
};

// var compress = function (chars) {
//   let currentChar = chars[0];
//   let currentNum = 1;
//   let startIndexCurrentChar = 0;

//   for (let i = 1; i < chars.length; i++) {
//     if (chars[i] === currentChar) {
//       currentNum++;
//     } else if (chars[i] != currentChar && currentNum == 1) {
//       currentChar = chars[i];
//       startIndexCurrentChar = i;
//     } else {
//       currentChar = chars[i];
//       chars.splice(
//         startIndexCurrentChar + 1,
//         currentNum - 1,
//         ...currentNum.toString(),
//       );

//       i = i - (currentNum - currentNum.toString().length) + 1;
//       currentNum = 1;
//       startIndexCurrentChar = i;
//     }

//     if (i == chars.length - 1 && currentNum != 1) {
//       chars.splice(
//         startIndexCurrentChar + 1,
//         currentNum - 1,
//         ...currentNum.toString(),
//       );
//     }
//   }

//   return chars.length;
// };

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - groups of two and three", () => {
  const chars = ["a", "a", "b", "b", "c", "c", "c"];
  const length = compress(chars);
  assert.equal(length, 6);
  assert.deepEqual(chars.slice(0, length), ["a", "2", "b", "2", "c", "3"]);
});

test("example 2 - single character", () => {
  const chars = ["a"];
  const length = compress(chars);
  assert.equal(length, 1);
  assert.deepEqual(chars.slice(0, length), ["a"]);
});

test("example 3 - group length split into digits", () => {
  const chars = [
    "a",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
  ];
  const length = compress(chars);
  assert.equal(length, 4);
  assert.deepEqual(chars.slice(0, length), ["a", "b", "1", "2"]);
});

test("no repeats stay uncompressed", () => {
  const chars = ["a", "b", "c"];
  const length = compress(chars);
  assert.equal(length, 3);
  assert.deepEqual(chars.slice(0, length), ["a", "b", "c"]);
});

test("single group", () => {
  const chars = ["a", "a", "a", "a"];
  const length = compress(chars);
  assert.equal(length, 2);
  assert.deepEqual(chars.slice(0, length), ["a", "4"]);
});

test("group of exactly ten splits into digits", () => {
  const chars = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
  const length = compress(chars);
  assert.equal(length, 3);
  assert.deepEqual(chars.slice(0, length), ["a", "1", "0"]);
});

test("alternating single characters", () => {
  const chars = ["a", "b", "a", "b"];
  const length = compress(chars);
  assert.equal(length, 4);
  assert.deepEqual(chars.slice(0, length), ["a", "b", "a", "b"]);
});

test("mixed group sizes", () => {
  const chars = ["a", "a", "a", "b", "c", "c"];
  const length = compress(chars);
  assert.equal(length, 5);
  assert.deepEqual(chars.slice(0, length), ["a", "3", "b", "c", "2"]);
});

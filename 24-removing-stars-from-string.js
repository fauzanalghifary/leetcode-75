/**
 * @param {string} s
 * @return {string}
 */
const removeStars = function (s) {
  const result = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      result.pop();
    } else {
      result.push(s[i]);
    }
  }

  return result.join("");
};

const assert = require("node:assert/strict");
const { test } = require("node:test");

test("example 1 - stars interspersed", () => {
  assert.equal(removeStars("leet**cod*e"), "lecoe");
});

test("example 2 - everything removed", () => {
  assert.equal(removeStars("erase*****"), "");
});

test("no stars - string unchanged", () => {
  assert.equal(removeStars("abcde"), "abcde");
});

test("single char followed by a star", () => {
  assert.equal(removeStars("a*"), "");
});

test("star removes the immediately preceding character", () => {
  assert.equal(removeStars("ab*c"), "ac");
});

test("consecutive stars remove the two preceding characters", () => {
  assert.equal(removeStars("abc**"), "a");
});

test("trailing characters after all stars resolve", () => {
  assert.equal(removeStars("xy*z*w"), "xw");
});

test("star after each character clears the string", () => {
  assert.equal(removeStars("a*b*c*"), "");
});

test("only the closest left character is removed each time", () => {
  assert.equal(removeStars("abcd*e*"), "abc");
});
